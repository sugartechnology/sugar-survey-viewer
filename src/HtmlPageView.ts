import checkbox_container_template from "./templates/checkbox-container";
import question_container_template from "./templates/question-container";
import form_container_template from "./templates/form-container";
import SugarSurveyViewerElementBase from "./sugar-survey-viewer-base";

export interface QuestionsData {
    question: string,
    column: number;
    answers: [{ answer: string, description: string }];
    maxanswer: number;
    type: string,
    filteroptions: [{ filter: string }],
    inputs: [{ input: string, classname: string }]
}

export interface PageView {

    select();
    deselect();
    create(data: QuestionsData);
}


export class HTMLQuestionsPageView implements PageView {


    pageTemplate: HTMLElement;
    page: HTMLTemplateElement;
    data: QuestionsData;
    base: SugarSurveyViewerElementBase;

    constructor(base: SugarSurveyViewerElementBase) {
        this.base = base;
    }

    select() {
        this.page.classList.add("enable");
    }

    deselect() {
        this.page.classList.remove("enable");
    }

    create(data: QuestionsData) {

        this.data = data;

        if (data.type == "page")
            this.createPageData();

        if (data.type == "chechboxquestionspage")
            this.createCheckboxPage(data)

        if (data.type == "form" || data.type == "messageform")
            this.createFormPage()

        let question = this.pageTemplate.querySelector(".question");
        question.innerHTML = data.question;
        return this.pageTemplate;
    }

    selectAnswer(element: HTMLElement) {
        let allCheckedAnswer = this.page.querySelectorAll(".answerChecked.selected");
        let length = allCheckedAnswer.length;
        let maxLength = this.data.maxanswer;
        element.classList.add("selected");
    }

    deSelectAnswer(element: HTMLElement) {
        element.classList.remove("selected");
    }


    createFormPage() {

        this.pageTemplate = form_container_template.content.cloneNode(true) as HTMLTemplateElement;
        let answers = this.pageTemplate.querySelector(".answers") as HTMLDivElement;
        let answerContainer = this.createFormInputContainer();
        answers.appendChild(answerContainer);

        this.page = this.pageTemplate.querySelector(".template");
        return this.pageTemplate;
    }


    createFormInputContainer() {

        let container = document.createElement("div") as HTMLDivElement;
        container.className = "answerContainer"
        let column = this.data.column;

        let answerline = this.createAnswerline();
        this.data.inputs.forEach((input, index) => {

            if ((index) % column == 0) {
                answerline = this.createAnswerline();
            }

            let inputelement = document.createElement("textarea") as HTMLTextAreaElement;
            inputelement.addEventListener("input", this.getInputElement.bind(this));
            inputelement.setAttribute("input-index", index + "");
            inputelement.placeholder = input.input;
            inputelement.className = input.classname;

            answerline.appendChild(inputelement);
            container.appendChild(answerline);
        });
        return container;
    }

    getInputElement(event: MouseEvent) {

        let element = event.currentTarget as HTMLInputElement;
        let inputIndex = element.getAttribute("input-index");
        let question = this.data.inputs[inputIndex].input;
        this.base.dispatchEvent(new CustomEvent("setInputAnswer", { detail: [question, element.value] }));
    }

    createPageData() {

        let column = this.data.column;
        let answerline = this.createAnswerline() as HTMLElement;
        this.pageTemplate = question_container_template.content.cloneNode(true) as HTMLTemplateElement;

        this.data.answers.forEach((answer, index) => {
            if ((index) % column == 0) {
                answerline = this.createAnswerline();
            }
            let answers = this.pageTemplate.querySelector(".answers") as HTMLDivElement;
            let answerContainer = this.createAnswerContainer(answer.answer, answer.description, index + "");
            answerContainer.addEventListener("click", this.handleAnswerSelect.bind(this));
            answerline.appendChild(answerContainer);
            answers.appendChild(answerline);
        })
        this.page = this.pageTemplate.querySelector(".template");
        return this.pageTemplate;
    }


    createAnswerline() {
        let container = document.createElement("div") as HTMLDivElement;
        container.className = "answerline"
        return container;
    }


    createAnswerContainer(imageURL: string, text: string, index: string) {

        let container = document.createElement("div") as HTMLDivElement;
        container.className = "answerContainer"
        container.setAttribute("answer-index", index)

        let image = document.createElement("img") as HTMLImageElement;
        image.className = "answerImage"
        image.src = imageURL;

        let span = document.createElement("span") as HTMLDivElement;
        span.className = "answerText"
        span.innerHTML = text;

        let check = document.createElement("div") as HTMLDivElement;
        check.className = "answerChecked"

        container.appendChild(image);
        container.appendChild(span);
        container.appendChild(check);

        return container;
    }

    createCheckboxPage(data: QuestionsData) {

        this.pageTemplate = checkbox_container_template.content.cloneNode(true) as HTMLTemplateElement;
        let checkboxanswercontainer = this.pageTemplate.querySelector(".checkboxanswercontainer") as HTMLDivElement;
        let filterContainer = this.createFilterContainer(data.filteroptions);
        checkboxanswercontainer.appendChild(filterContainer);

        let checkboxOptionCon = this.createCheckboxOptions(data);
        checkboxanswercontainer.appendChild(checkboxOptionCon);

        this.page = this.pageTemplate.querySelector(".template");
        return this.pageTemplate;
    }


    createFilterContainer(filteroptions: any) {
        let container = document.createElement("div") as HTMLDivElement;
        container.className = "filters"

        filteroptions.forEach((filterOption, index) => {

            let input = document.createElement("input") as HTMLInputElement;
            input.className = "filterinput";
            input.placeholder = filterOption.filter;
            container.appendChild(input);
        });
        let filterbutton = document.createElement("button") as HTMLButtonElement;
        filterbutton.className = "button filterbutton";
        filterbutton.innerHTML = "Filtrele";
        container.appendChild(filterbutton)
        return container;
    }


    createCheckboxOptions(data: QuestionsData) {

        let container = document.createElement("div") as HTMLDivElement;
        container.className = "checkboxes"

        data.answers.forEach((answer, index) => {

            let checkContainer = document.createElement("div") as HTMLDivElement;
            let input = document.createElement("input") as HTMLInputElement;

            input.setAttribute("answer-index", index + "")
            input.className = "checkboxinput";
            input.type = "checkbox";
            input.addEventListener("click", this.handlecheckboxinput.bind(this));

            let span = document.createElement("span") as HTMLInputElement;
            span.className = "checkboxtext";
            span.innerHTML = answer.answer;

            checkContainer.appendChild(input);
            checkContainer.appendChild(span);
            container.appendChild(checkContainer);

        });
        return container;
    }

    handlecheckboxinput(event) {

        let element = event.currentTarget as HTMLInputElement;
        let checked = element.checked;
        let answerIndex = element.getAttribute("answer-index");
        let answer = this.data.answers[answerIndex].answer;

        if (checked) {
            this.base.dispatchEvent(new CustomEvent("setanswer", { detail: [this.data.question, answer] }));
            return;
        }
        this.base.dispatchEvent(new CustomEvent("removeanswer", { detail: [this.data.question, answer] }));

    }


    handleAnswerSelect(event: Event) {

        let element = event.currentTarget as HTMLElement;
        let answerChecked = element.querySelector(".answerChecked") as HTMLElement
        let classList = answerChecked.classList;
        let isSelected = classList.contains("selected");

        let answerIndex = element.getAttribute("answer-index");
        let answer = this.data.answers[answerIndex].description;

        if (!isSelected) {
            this.base.dispatchEvent(new CustomEvent("setanswer", { detail: [this.data.question, answer] }));
            this.selectAnswer(answerChecked);
            return;
        }
        this.base.dispatchEvent(new CustomEvent("removeanswer", { detail: [this.data.question, answer] }));
        this.deSelectAnswer(answerChecked);
    }



}