import SugarSurveyViewerElementBase, { BASE_SERVICE_API_URL } from "./sugar-survey-viewer-base";
import starter_container_template from "./templates/static-pages";

export interface asnwerType {
    answers: [{ answer: string, description: string }];
}

export class SurveyStartManager {

    base: SugarSurveyViewerElementBase;
    localstoragename: string = "simurgsurvey";
    starterPages: any = [];
    starterPagesElement: any = [];

    constructor(base: SugarSurveyViewerElementBase) {
        this.base = base;
        this.base.addEventListener("finishsurvey", this.finishSurvey.bind(this), false);
    }

    start() {

        let pages = [];
        this.base.pagesData.forEach(data => {
            if (data.type === "starter") {
                pages.push(data);
            }
        });

        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        const action = urlParams.get('action')
        console.log(action);

        this.starterPages = pages;
        let startSurvey = starter_container_template.content.cloneNode(true) as HTMLTemplateElement;
        this.starterPages.forEach((element, index) => {

            this.base.startPage = startSurvey.querySelector(element.classname);

         

            if (element.img) {

                let startPageData = this.base.pagesData[0];

                let starterContainer = startSurvey.querySelector("." + startPageData.classname) as HTMLImageElement;
                starterContainer.style.display = "flex";

                let startButtons = starterContainer.querySelectorAll(".startbutton");


                startButtons.forEach(startButton => {

                    if (startButton.getAttribute("surveyType") === "consulting") {
                        startButton.addEventListener("click", this.startConsultingSurvey.bind(this))
                    }
                    else {
                        startButton.addEventListener("click", this.startTypeSurvey.bind(this));
                    }
                });

            }
        });

        this.base.shadowRoot.appendChild(startSurvey)

        if (action === "select") {
            // this.startConsultingSurvey(this);
            window.addEventListener("load", this.startTypeSurveyOnLoad.bind(this));
        }

        if (action === "consalt") {
            // this.startConsultingSurvey(this);
            window.addEventListener("load", this.startConsultingSurveyOnLoad.bind(this));
        }

    }

    showFirstPage() {
        let startPageData = this.base.pagesData[0];
        let starterContainer = this.base.querySelector("." + startPageData.classname) as HTMLImageElement;
        starterContainer.style.display = "flex";
    }

    startConsultingSurveyOnLoad(e) {

        var buttons = this.base.querySelectorAll(".startbutton");
        buttons.forEach(button => {
            var b = button as HTMLButtonElement;
            if (b.getAttribute("surveyType") === "consulting") {
                b.click();
            }
        });

    }

    startTypeSurveyOnLoad(e) {

        var buttons = this.base.querySelectorAll(".startbutton");
        buttons.forEach(button => {
            var b = button as HTMLButtonElement;
            if (b.getAttribute("surveyType") !== "consulting") {
                b.click();
            }
        });

    }

    startConsultingSurvey(thizz) {
        this.base.surveyType = "consulting";
        this.base.dispatchEvent(new CustomEvent("type-updated", { detail: "consulting" }))
        this.base.localStorageManager.setKey("surveyType", "consulting");
        this.showNextPage(thizz);
    }


    startTypeSurvey() {
        this.base.surveyType = "survey";
        this.base.dispatchEvent(new CustomEvent("type-updated", { detail: "survey" }))
        this.base.localStorageManager.setKey("surveyType", "survey");
        this.startSurvey();
    }

    hide() {
        this.showSurveyContainer();
        this.hidePages();
    }

    searchPage(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].title === nameKey) {
                return myArray[i];
            }
        }
    }


    showNextPage(event: MouseEvent) {

        let button = event.currentTarget as HTMLElement;
        let nextPageIndex = button.getAttribute("next-page");
        let prevPageIndex = button.getAttribute("data-page-index");

        var element = this.searchPage(nextPageIndex, this.starterPages);
        let nextPage = this.base.shadowRoot.querySelector("." + element.classname) as HTMLElement;
        nextPage.style.display = "flex";

        let startButton = nextPage.querySelector(".startbutton");
        startButton.addEventListener("click", this.startSurvey.bind(this));

        let prevPage = this.starterPages[prevPageIndex];
        this.hidePageData(prevPage);
    }

    startSurvey() {
        this.hidePages();
        this.showSurveyContainer();
        this.base.selectedpage = this.base.pageElements[0];
    }


    finishSurvey() {

        if (this.base.surveyType == "survey") {
            this.redirectPage();
            return;
        }
        else {
            this.hideSurveyContainer();
            this.base.surveyfinished = true;
            this.sendSurveyData();
            this.hidePages();
            this.showLastPage();
        }
    }


    hidePageData(data) {
        let page = this.base.shadowRoot.querySelector("." + data.classname) as HTMLElement;
        page.style.display = "none";
    }

    hidePages() {
        this.starterPages.forEach((element) => {
            this.hidePageData(element);
        });
    }

    hidePage() {
        let secondpage = this.base.shadowRoot.querySelector(".secondpage") as HTMLElement;
        secondpage.style.display = "none";
    }


    showSurveyContainer() {
        let page = this.base.shadowRoot.querySelector(".surveycontainer") as HTMLDivElement;
        page.style.display = "block";
    }

    hideSurveyContainer() {
        let page = this.base.shadowRoot.querySelector(".surveycontainer") as HTMLDivElement;
        page.style.display = "none";
    }

    showLastPage() {

        let page = this.base.querySelector(".lastpage") as HTMLDivElement;
        page.style.display = "flex";

        let redirectButton = page.querySelector(".redirect");
        redirectButton?.addEventListener("click", this.redirectPage.bind(this));

        let submitDataButton = page.querySelector("#try_at_home");
        submitDataButton.addEventListener("click", this.onTheEnd.bind(this));
    }

    onTheEnd() {
        window.open("https://www.youtube.com/watch?v=0qbBPj3AbgA");
    }

    sendSurveyData() {

        console.log("times")
        let answerJSon = this.base.answers;
        answerJSon.delete("filteredpages");
        const answerObject = Object.fromEntries(answerJSon);
        let answers = JSON.stringify(answerObject);
        let fullName = this.base.answers.get("Ad") + " " + this.base.answers.get("Soyad");
        let email = this.base.answers.get("Email");
        let phoneNumber = this.base.answers.get("Telefon");
        let survey = {
            fullName: fullName,
            answer: answers,
            email: email,
            phoneNumber: phoneNumber,
        }

        const xhr = new XMLHttpRequest();
        xhr.open("POST", BASE_SERVICE_API_URL + '/api/survey/save');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(survey));
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if ((this.status == 200) && (this.status < 300)) {
                    console.info("Request completed");
                }
            }
        };
        //after try at home button;
        //this.redirectPage();
    }

    redirectPage() {
        window.open(this.base.filteredPRoductUrl, "_self")
    }

}