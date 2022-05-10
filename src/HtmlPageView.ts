import checkbox_container_template from "./templates/checkbox-container";
import question_container_template from "./templates/question-container";
import form_container_template from "./templates/form-container";
import SugarSurveyViewerElementBase from "./sugar-survey-viewer-base";

export interface QuestionsData {
    title: string,
    question: string,
    column: number;
    answers: [{
        answer: string,
        description: string,
        skippage: string

    }];
    filter: boolean,
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

        this.page = this.pageTemplate.querySelector(".template");
        return this.pageTemplate;
    }

    createFormPage() {

        this.pageTemplate = form_container_template.content.cloneNode(true) as HTMLTemplateElement;
        let answers = this.pageTemplate.querySelector(".answers") as HTMLDivElement;
        let answerContainer = this.createFormInputContainer();
        answers.appendChild(answerContainer);
    }


    createFormInputContainer() {

        let container = document.createElement("div") as HTMLDivElement;
        container.className = "answerContainer"
        let column = this.data.column;

        let answerline = this.createAnswerline();
        this.data.inputs.forEach((input, index) => {
            let textInput = input.input;
            if ((index) % column == 0) {
                answerline = this.createAnswerline();
            }

            let inputelement = document.createElement("textarea") as HTMLTextAreaElement;
            inputelement.placeholder = textInput;
            inputelement.className = input.classname;

            let value = this.inputFieldIsFilled(textInput);
            if (value)
                inputelement.value = value;

            inputelement.setAttribute("key", textInput);
            inputelement.addEventListener("input", this.getInputElement.bind(this));


            answerline.appendChild(inputelement);
            container.appendChild(answerline);
        });
        return container;
    }

    getInputElement(event: MouseEvent) {

        let element = event.currentTarget as HTMLInputElement;
        let key = element.getAttribute("key");
        this.base.dispatchEvent(new CustomEvent("setInputAnswer", { detail: [key, element.value] }));
    }

    createPageData() {

        let column = this.data.column;
        let answerline = this.createAnswerline() as HTMLElement;
        this.pageTemplate = question_container_template.content.cloneNode(true) as HTMLTemplateElement;

        this.data.answers.forEach((answer, index) => {

            if ((index) % column == 0)
                answerline = this.createAnswerline();

            let answers = this.pageTemplate.querySelector(".answers") as HTMLDivElement;
            let answerContainer = this.createAnswerContainer(answer.answer, answer.description, index + "");
            answerContainer.addEventListener("click", this.handleAnswerSelect.bind(this));
            answerline.appendChild(answerContainer);
            answers.appendChild(answerline);
        })
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

        let checkIsAnswered = this.checkIsSelected(text);
        if (checkIsAnswered)
            check.classList.add("selected")


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
    }


    createFilterContainer(filteroptions: any) {

        let container = document.createElement("div") as HTMLDivElement;
        container.className = "filters"

        filteroptions.forEach((filterOption) => {


            let key = filterOption.filter;
            let inputelemment = document.createElement("input") as HTMLInputElement;
            inputelemment.className = "filterinput";
            inputelemment.placeholder = key;

            inputelemment.addEventListener("input", this.getInputElement.bind(this));
            inputelemment.setAttribute("key", key);
            let value = this.inputFieldIsFilled(filterOption.filter);
            if (value)
                inputelemment.value = value;

            container.appendChild(inputelemment);
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

            let input = document.createElement("input") as HTMLInputElement;
            input.type = "checkbox";
            input.className = "checkboxinput";
            input.checked = this.checkIsSelected(answer.answer);

            input.setAttribute("answer-index", index + "")
            input.addEventListener("click", this.handlecheckboxinput.bind(this));

            let span = document.createElement("span") as HTMLInputElement;
            span.className = "checkboxtext";
            span.innerHTML = answer.answer;

            let checkContainer = document.createElement("div") as HTMLDivElement;
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
        let answerIndex = element.getAttribute("answer-index");

        let answerChecked = element.querySelector(".answerChecked") as HTMLElement
        let classList = answerChecked.classList;
        let isSelected = classList.contains("selected");
        let answer = this.data.answers[answerIndex];
        this.createFilterBy(answer.skippage, isSelected);
        if (!isSelected) {

            let isAnswerSelectable = this.isAnswerSelectable();
            if (!isAnswerSelectable)
                return;
            this.base.dispatchEvent(new CustomEvent("setanswer", { detail: [this.data.question, answer.description] }));
            answerChecked.classList.add("selected");
            return;
        }
        this.base.dispatchEvent(new CustomEvent("removeanswer", { detail: [this.data.question, answer.description] }));
        this.deSelectAnswer(answerChecked);
    }


    isAnswerSelectable() {

        let allCheckedAnswer = this.page.querySelectorAll(".answerChecked.selected");
        let length = allCheckedAnswer.length;
        let maxLength = this.data.maxanswer;
        if (length >= maxLength) {
            alert("max :" + maxLength);
            return false;
        }
        return true;
    }


    deSelectAnswer(element: HTMLElement) {
        element.classList.remove("selected");
    }

    createFilterBy(filter: string, isSelectedbefore: boolean) {

        if (!filter)
            return;
        if (isSelectedbefore) {
            console.log("removing");
            this.base.dispatchEvent(new CustomEvent("removeanswer", { detail: ["filteredpages", filter] }));
            return;
        }
        this.base.dispatchEvent(new CustomEvent("setanswer", { detail: ["filteredpages", filter] }));
    }

    checkIsSelected(answer: string) {

        let question = this.data.question;
        let answeroflocalstorage = this.base.localStorageManager.getJsonKeyFromLocalStorage(question) as any;
        let index = answeroflocalstorage.indexOf(answer);

        if (index == -1)
            return false;

        this.base.dispatchEvent(new CustomEvent("setanswer", { detail: [this.data.question, answer] }));
        return true;
    }

    inputFieldIsFilled(input: string) {

        let value = this.base.localStorageManager.getJsonKeyFromLocalStorage(input) as any;
        if (!value || value.length == 0)
            return null;

        this.base.dispatchEvent(new CustomEvent("setInputAnswer", { detail: [this.data.question, value] }));
        return value;
    }


}