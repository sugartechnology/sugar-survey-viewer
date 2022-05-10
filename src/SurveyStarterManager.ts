import { QuestionsData } from "./HtmlPageView";
import SugarSurveyViewerElementBase, { BASE_SERVICE_API_URL } from "./sugar-survey-viewer-base";
import starter_container_template from "./templates/start-container";

export interface asnwerType {
    answers: [{ answer: string, description: string }];
}

export class SurveyStartManager {

    base: SugarSurveyViewerElementBase;
    localstoragename: string = "simurgsurvey";

    constructor(base: SugarSurveyViewerElementBase) {
        this.base = base;
        this.base.addEventListener("finishsurvey", this.finishSurvey.bind(this), false);
    }

    start() {

        let startSurvey = starter_container_template.content.cloneNode(true) as HTMLTemplateElement;
        this.base.startPage = startSurvey.querySelector(".maincontainer");

        let startButton = startSurvey.querySelector(".startbutton");
        startButton.addEventListener("click", this.showSecondPage.bind(this));
        this.base.shadowRoot.appendChild(startSurvey)
    }

    hide() {
        this.showSurveyContainer();
        this.hideStarterPage();
        this.hideWelcomePage();
    }

    showSecondPage() {

        this.showWelcomePage();
        this.hideStarterPage();
    }

    startSurvey() {

        this.hideStarterPage();
        this.hideWelcomePage();

        this.showSurveyContainer();
        this.base.selectedpage = this.base.pageElements[0];
    }


    finishSurvey() {
        this.showLastPage();
        this.hideSurveyContainer();
        this.sendSurveyData();
        this.base.surveyfinished = true;
    }



    showStarterPage() {
        let firstpage = this.base.shadowRoot.querySelector(".firstpage") as HTMLElement;
        firstpage.style.display = "none";
    }

    hideStarterPage() {
        let firstpage = this.base.shadowRoot.querySelector(".firstpage") as HTMLElement;
        firstpage.style.display = "none";
    }

    hideWelcomePage() {
        let secondpage = this.base.shadowRoot.querySelector(".secondpage") as HTMLElement;
        secondpage.style.display = "none";
    }

    showWelcomePage() {
        let secondpage = this.base.shadowRoot.querySelector(".secondpage") as HTMLElement;
        secondpage.style.display = "flex";

        let startButton = secondpage.querySelector(".startbutton");
        startButton.addEventListener("click", this.startSurvey.bind(this));
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
}