import { UpdatingElement } from 'lit-element/lit-element'
import { AnswerManager } from './AnswerManager';
import { pages } from './assets/pages/pages';
import { DefaultRoot } from './DefaultRoot';
import { FilterData, FilterManager } from './FilterManager';
import { HTMLQuestionsPageView, QuestionsData } from './HtmlPageView';
import { LocalStorageManager } from './Localstoragemanager';
import { SurveyStartManager } from './SurveyStarterManager';
import { PopupTemplate } from './templates/PopupTemplateManager';
import survey_template from './templates/survey-template';

export const BASE_SERVICE_API_URL = "https://cdn.sugartech.io";
export default class SugarSurveyViewerElementBase extends UpdatingElement {

    private _root: ShadowRoot;
    page: HTMLTemplateElement;
    pagesData: any;
    questionPages: any;
    htmlPagesQuestion: [{ QuestionsData }]
    _selectedpage: any;
    selectedIndex: number = 0;
    pageElements: any = [];
    _selectedEelement: any;
    startPage: HTMLElement;
    surveyfinished: boolean
    startManager: SurveyStartManager;
    localStorageManager: LocalStorageManager;
    answers: Map<string, any> = new Map();
    surveyType: string;
    filters: [FilterData];
    categories: string;
    filteredPRoductUrl: string;

    get shadowRoot(): ShadowRoot {
        return this._root;
    }

    set selectedpage(value) {
        this.selectedIndex = this.pageElements.indexOf(value);
        this._selectedEelement?.deselect();
        this._selectedEelement = value;
        this._selectedEelement.select();
        this.dispatchEvent(new CustomEvent("page-changed", { detail: this.selectedIndex }))
    }


    get selectedpage() {
        return this._selectedpage;
    }

    constructor() {

        super();
        this._root = new DefaultRoot(this);
        let pageTemplate = survey_template.content.cloneNode(true) as HTMLTemplateElement;
        this.page = pageTemplate.querySelector(".main-container");
        this.shadowRoot.appendChild(pageTemplate);
        let answerManager = new AnswerManager(this);
        this.startManager = new SurveyStartManager(this);
        this.localStorageManager = new LocalStorageManager(this);
        let filterManager = new FilterManager(this);
        this.initializePages();
        this.addEventListener("type-updated", this.createLines.bind(this), false);
    }



    initializePages() {

        // let pagedatas = this.getAttribute("pagedata").replace(" ", "");
        //this.pagesData = eval(pagedatas);

        this.pagesData = JSON.parse(pages);
        this.initilizeJson();
        this.initilizeType();
        this.startManager.start();
        this.createPages();
        //this.createLines();
        this.initializeNavigation();
        this.dispatchEvent(new CustomEvent("pageinitilized"));
    }

    initilizeJson() {
        let json = this.localStorageManager.getanswersjson();
        if (!json)
            return;
        this.answers = json;

    }

    initilizeType() {
        let type = this.localStorageManager.getKeyFromLocalStorage("surveyType");
        if (!type)
            return;
        this.dispatchEvent(new CustomEvent("type-updated", { detail: type }));
        this.surveyType = type;
    }

    createLines() {

        let length = this.getSurveyPageLength();
        let container = this.shadowRoot.querySelector(".slider-index-lines");
        container.innerHTML = "";
        for (let l = 0; l < length + 1; l++) {
            let hr = document.createElement("hr");
            if (l == 0)
                hr.className = "filled"
            container.appendChild(hr);
        }
    }

    getSurveyPageLength() {
        let lentgh = 0;
        this.pageElements.forEach((page, index) => {

            let typeOfPage = page.data.surveyType;
            let lastpage = page.data.lastpage === "true";
            if (this.surveyType === typeOfPage && lastpage)
                lentgh = index;
        });
        return lentgh;
    }

    createPages() {

        let base = this;
        this.pagesData.forEach((pagedata: QuestionsData) => {

            let pageView = new HTMLQuestionsPageView(this);
            let pageViewTemplate = pageView.create(pagedata);

            if (!pageViewTemplate)
                return;

            let container = this.querySelector(".templatecontainer");
            container.appendChild(pageViewTemplate);
            base.pageElements.push(pageView);
        });
    }


    initializeNavigation() {

        const prev = this.shadowRoot.querySelector('.prev');
        const next = this.shadowRoot.querySelector('.next');

        prev.addEventListener("click", this.movePageByDirection.bind(this, "prev"));
        next.addEventListener("click", this.movePageByDirection.bind(this, "next"));

        let toEndButton = this.shadowRoot.querySelector(".toend");
        toEndButton.addEventListener("click", this.moveToEndOfPages.bind(this));

        let toStartButton = this.shadowRoot.querySelector(".tostart");
        toStartButton.addEventListener("click", this.moveToStart.bind(this));
    }


    movePageByDirection(direction: string) {

        let checkIsFilled = this.checkIsEnable(direction);

        if (!checkIsFilled)
            return false;

        let index = this.nextIndex(direction);
        index = this.getFilteredPageIndex(index, direction);
        this.movePageToIndex(index);
        window.scrollTo(100, 100)
        return true;
    }


    movePageToIndex(index: number) {

        this.selectedpage = this.pageElements[index];
        this.fillLines();

        let lastpage = this.pageElements[index].data.lastpage === "true";
        let typeOfPage = this.pageElements[index].data.surveyType;

        if (this.surveyType === typeOfPage && lastpage)
            this.replaceNextButton(this.pageElements[index].data.finishText);

        //let filterPage = page.surveyType != "all" && page.surveyType != this.surveyType;
        // if (this.pageElements[index].data.lastpage === "true")
        //   this.replaceNextButton(this.pageElements[index].data.finishText);

    }

    checkIsEnable(direction) {

        let ifFormPage = this.pageElements[this.selectedIndex].data.type == "form";

        if (!ifFormPage || direction === "prev")
            return true;
        return this.checkIsFilled();
    }

    checkIsFilled() {
        let surveyTypeForm = this.surveyType != "survey";

        if (!surveyTypeForm)
            return true;

        let isFilled = this.answers.get("Telefon:") && this.answers.get("E-mail:");
        if (!isFilled)
            this.showPopup("Lütfen E-mail ve Telefon Alanlarını doldurunuz.");
        return isFilled;
    }

    replaceNextButton(text: string) {

        const next = this.shadowRoot.querySelector('.next') as HTMLElement;
        next.style.display = "none";

        const finish = this.shadowRoot.querySelector('.finish') as HTMLElement;
        finish.addEventListener("click", this.onFinish.bind(this), false);
        finish.style.display = "grid";

        const prev = this.shadowRoot.querySelector('.prev');
        prev.addEventListener("click", this.replaceFinishButton.bind(this));

        //let toEndButton = this.shadowRoot.querySelector(".toendtext") as HTMLElement;
        //toEndButton.style.visibility = "hidden";

        const finishText = this.shadowRoot.querySelector('.finishText') as HTMLElement;
        finishText.innerHTML = text;
    }


    replaceFinishButton() {

        const next = this.shadowRoot.querySelector('.next') as HTMLElement;
        next.style.display = "block";

        const finish = this.shadowRoot.querySelector('.finish') as HTMLElement;
        finish.style.display = "none";

        let toEndButton = this.shadowRoot.querySelector(".toendtext") as HTMLElement;
        toEndButton.style.visibility = "visible";
    }


    fillLines() {
        let hrs = this.shadowRoot.querySelectorAll("hr");
        hrs.forEach((hr, i) => {
            if (this.selectedIndex < i)
                hr.classList.remove("filled");
            else hr.classList.add("filled")
        });
    }


    nextIndex(direction: string) {

        if (!direction)
            return 1;

        let totalpages = this.pageElements.length;
        let index = this.selectedIndex;
        index = direction == 'next' ? index + 1 : index - 1;

        if (index == -1) {
            this.moveToStart();
            return 0;
        }
        index = index >= totalpages ? 0 : index;
        index = index < 0 ? totalpages - 1 : index;
        return index;
    }

    getFilteredPageIndex(index: number, direction: string) {

        let page = this.pageElements[index].data;
        let title = page.title;
        let filteredPages = this.answers.get("filteredpages");

        if ((!filteredPages || !filteredPages.includes(title)))
            return index;
        this.selectedIndex = index;
        return this.nextIndex(direction);
    }



    moveToEndOfPages() {
        let lastIndex = 0;
        this.pageElements.forEach((page, index) => {

            let lastpage = page.data.lastpage === "true";
            let typeOfPage = page.data.surveyType;

            if (this.surveyType === typeOfPage && lastpage)
                lastIndex = index;
        });
        this.movePageToIndex(lastIndex);
        window.scrollTo(100, 100);
    }

    moveToStart() {
        //this.selectedIndex = this.pageElements.indexOf(0);
        this._selectedEelement?.deselect();
        this.startManager.showFirstPage();
        this.startManager.hideSurveyContainer();
        this.replaceFinishButton();
        window.scrollTo(100, 100)
        this.dispatchEvent(new CustomEvent("moved-to-start"));

    }

    onFinish(event: MouseEvent) {
        event.preventDefault();
        let check = this.checkIsFilled();
        if (!check)
            return;

        this.dispatchEvent(new CustomEvent("finishsurvey"));
    }

    public showPopup(message) {

        let popup = new PopupTemplate(this);
        popup.create(this);
        popup.fillContent(message);
        popup.show();

        setTimeout(() => {
            popup.hide();
            popup.remove();
        }, 3500);
    }


}

