import SugarSurveyViewerElementBase from "./sugar-survey-viewer-base";

export interface asnwerType {
    answers: [{ answer: string, description: string }];
}
export class LocalStorageManager {

    base: SugarSurveyViewerElementBase;
    public localstorageanswerjson = "sugarsurveystorage";
    public localindexstoragepageindex: string = "localindestoragepageindex";
    public filter: string = "filtre";

    constructor(base: SugarSurveyViewerElementBase) {

        this.base = base;
        //let pagetype = this.base.getAttribute("surveytype");
        //this.setKey("surveytype", pagetype);
        this.setKey("filtre", "");

        this.localstorageanswerjson = this.localstorageanswerjson;
        this.localstorageanswerjson = this.localstorageanswerjson;
        this.localindexstoragepageindex = this.localindexstoragepageindex;

        this.base.addEventListener("update-local-storage", this.setAnswerToLocalStorage.bind(this))
        this.base.addEventListener("pageinitilized", this.pageloaded.bind(this));
        this.base.addEventListener("page-changed", this.setpageindex.bind(this));
        this.base.addEventListener("finishsurvey", this.onFinishSurvey.bind(this), false);
        this.base.addEventListener("moved-to-start", this.onMoveToStart.bind(this));

    }

    setKey(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    getKeyFromLocalStorage(key: string) {
        var answer = localStorage.getItem(key);
        return answer;
    }

    getJsonKeyFromLocalStorage(key: string) {
        var jsonanswer = this.getanswersjson();
        let value = jsonanswer.get(key);
        if (value)
            return value;
        return [];
    }


    removeAnswer(key: string, value: string) {

        let values = this.getJsonKeyFromLocalStorage(key) as any[];
        const index = values.indexOf(value);
        if (index > -1) {
            values.splice(index, 1);
            this.base.answers.set(key, values)
        }
    }

    getanswersjson() {
        var answer = localStorage.getItem(this.localstorageanswerjson);

        try {
            var jsonanswer = new Map(JSON.parse(answer)) as Map<string, Set<string>>;
            return jsonanswer;
        } catch (e) {
            //alert(e); // 
        }
        return new Map() as Map<string, Set<string>>
    }




    setAnswerToLocalStorage(data: MouseEvent) {
        let detail = data.detail as unknown as Map<string, Set<string>>;
        let answers = JSON.stringify(Array.from(detail.entries()));
        localStorage.setItem(this.localstorageanswerjson, answers);
    }

    setpageindex(data: CustomEvent) {
        let index = data.detail;
        if (!index || index < 1)
            index = 0;

        this.setKey(this.localindexstoragepageindex, index)
    }


    pageloaded() {

        let index = this.getKeyFromLocalStorage(this.localindexstoragepageindex);

        if (index === "null" || index == null)
            return;

        this.base.startManager.hide();
        this.base.movePageToIndex(index as unknown as number);
        this.base.dispatchEvent(new CustomEvent("page-loaded"));
        this.base.createLines();
        this.base.fillLines();
    }

    onMoveToStart() {
        this.setKey(this.localindexstoragepageindex, null);
    }

    onFinishSurvey() {
        localStorage.removeItem(this.localindexstoragepageindex)
        localStorage.removeItem(this.localstorageanswerjson)
        localStorage.removeItem("filter")
        localStorage.removeItem("category")
        localStorage.removeItem("simurgsurveymin")
        localStorage.removeItem("simurgsurveymax")
    }
}