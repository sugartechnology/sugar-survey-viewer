import SugarSurveyViewerElementBase from "./sugar-survey-viewer-base";

export interface asnwerType {
    answers: [{ answer: string, description: string }];
}
export class AnswerManager {

    base: SugarSurveyViewerElementBase;
    answers: Map<string, any> = new Map();
    localstoragename: string = "simurgsurvey";

    constructor(base: SugarSurveyViewerElementBase) {
        this.base = base;
        this.base.addEventListener("setanswer", this.getAnswerFromUser.bind(this));
        this.base.addEventListener("removeanswer", this.deleteAnswer.bind(this));
        this.base.addEventListener("setInputAnswer", this.getInputAnswerFromUser.bind(this));
    }

    getAnswerFromUser(data: MouseEvent) {

        let detail = data.detail as unknown as asnwerType;
        let key = detail[0];
        let value = detail[1];

        let values = this.answers.get(key) ? this.answers.get(key) : [];
        values.push(value);
        this.answers.set(key, values)

        console.log("answer", this.answers)
        this.updateLocalStorage();
    }

    deleteAnswer(data: MouseEvent) {
        let detail = data.detail;
        this.removeAnswer(detail[0], detail[1]);
        this.updateLocalStorage();
        console.log("answer", this.answers)
    }

    getInputAnswerFromUser(data: MouseEvent) {

        let detail = data.detail as unknown as asnwerType;
        let key = detail[0];
        let value = detail[1];
        this.answers.set(key, value);
    }

    removeAnswer(key: string, value: string) {

        let values = this.answers.get(key) ? this.answers.get(key) : [];
        const index = values.indexOf(value);

        if (index > -1) {
            values.splice(index, 1);
            this.answers.set(key, values)
        }
    }

    updateLocalStorage() {
        this.base.dispatchEvent(new CustomEvent("update-local-storage", { detail: this.answers }))

    }

}