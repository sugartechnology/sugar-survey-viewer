import { UpdatingElement } from 'lit-element/lit-element'
import { AnswerManager } from './AnswerManager';
import { pages } from './assets/pages/pages';
import { DefaultRoot } from './DefaultRoot';
import { HTMLQuestionsPageView, QuestionsData } from './HtmlPageView';
import { LocalStorageManager } from './Localstoragemanager';
import { SurveyStartManager } from './SurveyStarterManager';
import survey_template from './templates/survey-template';

export default class SugarSurveyViewerElementBase extends UpdatingElement {

    private _root: ShadowRoot;
    page: HTMLTemplateElement;
    pagesData: any;
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
        this.initializePages();
    }



    initializePages() {
        this.pagesData = JSON.parse(pages);
        this.initilizeJson();
        this.startManager.start();
        this.createPages();
        this.createLines();
        this.initializeNavigation();
        this.dispatchEvent(new CustomEvent("pageinitilized"));
    }

    initilizeJson() {
        let json = this.localStorageManager.getanswersjson();
        if (!json)
            return;
        this.answers = json;
    }

    createLines() {
        let container = this.shadowRoot.querySelector(".slider-index-lines");
        let length = this.pagesData.length;

        for (let l = 0; l < length; l++) {
            let hr = document.createElement("hr");
            if (l == 0)
                hr.className = "filled"
            container.appendChild(hr);
        }
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
    }


    movePageByDirection(direction: string) {

        let index = this.nextIndex(direction);
        index = this.getFilteredPageIndex(index, direction);
        this.movePageToIndex(index);
    }


    movePageToIndex(index: number) {

        let lastIndex = this.pagesData.length - 1;
        this.selectedpage = this.pageElements[index];
        this.fillLines();

        if (index == lastIndex)
            this.replaceNextButton();
    }

    replaceNextButton() {

        const next = this.shadowRoot.querySelector('.next') as HTMLElement;
        next.style.display = "none";

        const finish = this.shadowRoot.querySelector('.finish') as HTMLElement;
        finish.addEventListener("click", this.onFinish.bind(this));
        finish.style.display = "block";

        const prev = this.shadowRoot.querySelector('.prev');
        prev.addEventListener("click", this.replaceFinishButton.bind(this));

        let toEndButton = this.shadowRoot.querySelector(".toendtext") as HTMLElement;
        toEndButton.style.visibility = "hidden";
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
        index = index >= totalpages ? 0 : index;
        index = index < 0 ? totalpages - 1 : index;
        return index;
    }

    getFilteredPageIndex(index: number, direction: string) {

        let page = this.pagesData[index];
        let title = page.title;
        let filteredPages = this.answers.get("filteredpages");
        if (!filteredPages || !filteredPages.includes(title))
            return index;

        this.selectedIndex = index;
        return this.nextIndex(direction);
    }

    moveToEndOfPages() {
        let lastIndex = this.pageElements.length;
        this.movePageToIndex(lastIndex - 1);
    }


    onFinish() {
        this.dispatchEvent(new CustomEvent("finishsurvey"));
    }

}

