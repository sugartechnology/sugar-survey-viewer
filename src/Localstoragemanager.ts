import SugarSurveyViewerElementBase from "./sugar-survey-viewer-base";

export interface asnwerType {
    answers: [{ answer: string, description: string }];
}
export class LocalStorageManager {

    base: SugarSurveyViewerElementBase;
    localstorageanswername: string = "sugarsurveystorage";
    localindexstoragepageindex: string = "localindestoragepageindex";

    constructor(base: SugarSurveyViewerElementBase) {
        this.base = base;
        this.base.addEventListener("update-local-storage", this.setAnswerToLocalStorage.bind(this))
        this.base.addEventListener("pageinitilized", this.pageloaded.bind(this));
        this.base.addEventListener("page-changed", this.setpageindex.bind(this));

    }

    setKey(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    getKeyFromLocalStorage(key: string) {
        var answer = localStorage.getItem(key);
        return answer;
    }

    getFromLocalStorage() {
        var answer = localStorage.getItem(this.localstorageanswername);
        var jsonanswer = new Map(JSON.parse(answer));
        return jsonanswer;
    }

    getJsonKeyFromLocalStorage(key: string) {
        var answer = localStorage.getItem(key);
        var jsonanswer = new Map(JSON.parse(answer));
        return jsonanswer[key];
    }

    setAnswerToLocalStorage(data: MouseEvent) {
        let detail = data.detail as unknown as Map<string, []>;
        let answers = JSON.stringify(Array.from(detail.entries()));
        localStorage.setItem(this.localstorageanswername, answers);
    }

    setpageindex(data: CustomEvent) {
        let index = data.detail;
        let pageLentgh = this.base.pageElements.length - 1;

        if (!index || index >= pageLentgh || index < 1)
            index = 0;

        this.setKey(this.localindexstoragepageindex, index)
    }

    pageloaded() {

        let index = this.getKeyFromLocalStorage(this.localindexstoragepageindex) as unknown as number;
        if (index == 0)
            return;

        this.base.startManager.hide();
        this.base.movePageToIndex(index);
    }
}