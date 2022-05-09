import SugarSurveyViewerElementBase from "./sugar-survey-viewer-base";

export interface asnwerType {
    answers: [{ answer: string, description: string }];
}
export class AnswerManager {

    base: SugarSurveyViewerElementBase;

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

        let values = this.base.answers.get(key) ? this.base.answers.get(key) : [];
        values.push(value);
        let uniqValues = [...new Set(values)];

        this.base.answers.set(key, uniqValues)
        this.updateLocalStorage();

        console.log("this.baeans", this.base.answers);
    }

    getInputAnswerFromUser(data: MouseEvent) {

        let detail = data.detail as unknown as asnwerType;
        let key = detail[0];
        let value = detail[1];
        this.base.answers.set(key, value);
        this.updateLocalStorage();
    }

    deleteAnswer(data: MouseEvent) {
        let detail = data.detail;
        this.removeAnswer(detail[0], detail[1]);
        this.updateLocalStorage();
    }

    removeAnswer(key: string, value: string) {

        let values = this.base.answers.get(key) ? this.base.answers.get(key) : [];
        const index = values.indexOf(value);

        if (index > -1) {
            values.splice(index, 1);
            this.base.answers.set(key, values)
        }
        this.updateLocalStorage();
    }

    updateLocalStorage() {
        this.base.dispatchEvent(new CustomEvent("update-local-storage", { detail: this.base.answers }))
    }


}