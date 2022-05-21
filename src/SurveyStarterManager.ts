import { QuestionsData } from "./HtmlPageView";
import SugarSurveyViewerElementBase, { BASE_SERVICE_API_URL } from "./sugar-survey-viewer-base";
import starter_container_template from "./templates/start-container";

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

        this.starterPages = pages;

        let startSurvey = starter_container_template.content.cloneNode(true) as HTMLTemplateElement;
        this.starterPages.forEach((element, index) => {

            this.base.startPage = startSurvey.querySelector(element.classname);

            if (element.img) {

                let startPageData = this.base.pagesData[0];
                let title = this.base.pagesData[0].title;
                let text = this.base.pagesData[0].titleText;

                let starterContainer = startSurvey.querySelector("." + startPageData.classname) as HTMLImageElement;
                starterContainer.style.backgroundImage = "url(" + startPageData.img + ")";
                starterContainer.style.display = "flex";

                let starterText = starterContainer.querySelector(".titleText");
                starterText.innerHTML = text;

                let starterTitle = starterContainer.querySelector(".title");
                starterTitle.innerHTML = title;

                let startButton = starterContainer.querySelector(".startbutton");
                if (startPageData.skippage) {
                    startButton.setAttribute("next-page", startPageData.skippage);
                    startButton.setAttribute("data-page-index", index);
                    startButton.addEventListener("click", this.showNextPage.bind(this));
                }

                else {
                    startButton.addEventListener("click", this.startSurvey.bind(this));
                }

            }
        });
        this.base.shadowRoot.appendChild(startSurvey)
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
        this.showLastPage();
        this.hideSurveyContainer();

        if (this.base.answers.get("surveytype") === "redirection")
            this.redirectPage();
        else {
            this.sendSurveyData();
            this.base.surveyfinished = true;
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
    }

    sendSurveyData() {

        const answerObject = Object.fromEntries(this.base.answers);
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
    }

    redirectPage() {
        alert("redirect me :d")
    }
}