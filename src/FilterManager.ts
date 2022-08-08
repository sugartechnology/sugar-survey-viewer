import { asnwerType } from "./Localstoragemanager";
import SugarSurveyViewerElementBase from "./sugar-survey-viewer-base";

export interface FilterData {
    FilterType: string,
    FilterId: string,
    FilterValues: [string]
}


export class FilterManager {

    base: SugarSurveyViewerElementBase;

    constructor(base: SugarSurveyViewerElementBase) {


        this.base = base;
        //if (this.base.getAttribute("paintingorder"))
        //  return;

        this.base.addEventListener("setanswer", this.getFilter.bind(this));
        this.base.addEventListener("removeanswer", this.removeFilter.bind(this));
        this.base.addEventListener("setInputAnswer", this.getInputFilterFromUser.bind(this));
    }


    getFilter(data: MouseEvent) {

        let detail = data.detail as unknown as asnwerType;
        let filterType = detail[2];
        let filterId = detail[3];
        let filterValue = detail[4];

        //0-30 küçük aldı 30-50 orta - 50-100 büyük 100-dem çok büyük
        if (filterType == "category" && filterValue)
            this.setCategoryFilter(filterValue);

        if (filterType === "tdetay")
            this.setDTypeFilter(filterId, filterValue);

        if (filterType === "price")
            this.setPriceFilter(filterValue);

        if (filterType == "measurement") {
            let filterValues = filterValue.split(",")
            filterValues.forEach(value => {
                value = value.replace(" ", "");
                this.setDTypeFilter(filterId, value);
            });
        }
        this.updateFilterProductsUrl();
    }


    setCategoryFilter(filterValue: string) {

        let categories = localStorage.getItem("category") ? localStorage.getItem("category") : "";
        categories = categories + "," + filterValue
        this.base.categories = categories;
        localStorage.setItem("category", categories);
    }



    removeCategoryFilter(filterValue: string) {

        let categories = localStorage.getItem("category") ? localStorage.getItem("category") : "";
        categories = categories.replace("," + filterValue, "");
        this.base.categories = categories;
        localStorage.setItem("category", categories);
    }


    getInputFilterFromUser(data: MouseEvent) {

        let detail = data.detail as unknown as asnwerType;
        let key = detail[0];
        let value = detail[1];

        if (key === "Ilk fiyat")
            this.setMinPrice(value);

        if (key === "Son fiyat")
            this.setMaxPrice(value);

        this.updateFilterProductsUrl();
    }


    setPriceFilter(filterValue) {

        if (!filterValue)
            return;

        let max = filterValue[0] ? filterValue[0] : 0;
        let min = filterValue[1] ? filterValue[1] : 0;

        this.setMaxPrice(max);
        this.setMinPrice(min);
    }


    setMaxPrice(max: string) {

        max = max.split(",")[0];
        max = max.replace(" ", "").replace(".", "").replace("₺", "");
        localStorage.setItem("simurgsurveymax", max);
    }


    setMinPrice(min: string) {

        min = min.split(",")[0];
        min = min.replace(".", "").replace(" ", "").replace("₺", "")
        localStorage.setItem("simurgsurveymin", min);
    }


    removePriceFilter() {
        localStorage.removeItem("simurgsurveymin");
        localStorage.removeItem("simurgsurveymax");
    }


    setDTypeFilter(filterId: string, filterValue: string) {

        let filters = this.base.filters;
        if (filters) {
            this.updateFilter(filterId, filterValue);
        }
        else {
            this.setFilter(filterId, filterValue);
        }
        localStorage.setItem("filter", JSON.stringify(this.base.filters));
    }


    updateFilter(filterId: string, filterValue: any) {
        let filters = this.base.filters;
        let filterFounded = false;
        if (filters) {
            filters.forEach(filter => {

                if (filter.FilterId == filterId) {
                    filter.FilterValues.push(filterValue)
                    filterFounded = true;
                    //this.base.filters = filters;
                    return;
                }
            });
        }

        if (filterFounded)
            return;

        var fData: any = {};
        fData.FilterType = "tdetay"
        fData.FilterId = filterId;
        fData.FilterValues = [filterValue];
        filters.push(fData);

    }


    setFilter(filterId: string, filterValue: string) {
        let fData = JSON as any;
        fData.FilterType = "tdetay"
        fData.FilterId = filterId;
        fData.FilterValues = [filterValue];
        this.base.filters = [fData];
    }

    removeDTypeFilter(filterId: string, filterValue: string) {

        let filters = this.base.filters;
        if (!filters)
            return;

        if (filters) {
            filters.forEach(filter => {

                if (filter.FilterId != filterId)
                    return;

                let filterValues = filter.FilterValues;
                var index = filterValues.indexOf(filterValue);

                if (index == -1)
                    return;
                filterValues.splice(index, 1)

                if (filterValues.length <= 0)
                    this.removeFilterFromJson(filter);
            });
        }

        this.base.filters = filters;
        localStorage.setItem("filter", JSON.stringify(this.base.filters));
    }


    removeFilterFromJson(filter) {
        var index = this.base.filters.indexOf(filter);
        if (index == -1)
            return;
        this.base.filters.splice(index, 1)
    }


    removeFilter(data: MouseEvent) {

        let detail = data.detail as unknown as asnwerType;
        let filterType = detail[2];
        let filterId = detail[3];
        let filterValue = detail[4];

        if (filterType == "category" && filterValue)
            this.removeCategoryFilter(filterValue);

        if (filterType == "tdetay")
            this.removeDTypeFilter(filterId, filterValue);

        if (filterType == "price")
            this.removePriceFilter();

        if (filterType == "measurement") {
            let filterValues = filterValue.split(",")
            filterValues.forEach(value => {
                value = value.replace(" ", "");
                this.removeDTypeFilter(filterId, value);
            });
        }

        this.updateFilterProductsUrl();

    }


    async updateFilterProductsUrl() {

        let baseUrl = "https://www.simurgsanatevi.com/" + "yagli-boya-tablolar?";


        let categories = localStorage.getItem("category");
        let filters = localStorage.getItem("filter");
        let url = baseUrl + "kategori=" + categories + "&filtre=" + filters;

        let max = localStorage.getItem("simurgsurveymax");
        if (max)
            url = url + "&max=" + max;


        let min = localStorage.getItem("simurgsurveymin");
        if (min)
            url = url + "&min=" + min;

        this.base.filteredPRoductUrl = url;
    }

}