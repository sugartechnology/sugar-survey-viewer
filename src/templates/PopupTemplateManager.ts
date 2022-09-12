import { SugarSurveyViewerElement } from "../sugar-survey-viewer";
import SugarSurveyViewerElementBase from "../sugar-survey-viewer-base";
import survey_popup_info_template from "./survey_info_popup_template";


export interface PopupInterface {

    create(parentElement: HTMLElement);
    show();
    hide();
    fillContent(text: string, localizationvalue: string);
}

export class PopupTemplate implements PopupInterface {

    popupContentText: string;
    popupModal: HTMLElement;
    popup: HTMLTemplateElement;
    viewer: SugarSurveyViewerElement

    constructor(element: SugarSurveyViewerElementBase) {
        this.popup = survey_popup_info_template.content.cloneNode(true) as HTMLTemplateElement;
        this.viewer = element;

    }


    fillContent(popupContentText: string) {
        let modalContentText = this.popupModal.querySelector(".modalContentText") as HTMLElement;
        this.popupContentText = popupContentText;
        modalContentText.innerHTML = this.popupContentText;
    }


    create(parentElement: HTMLElement) {

        if (this.popupModal != null)
            return;

        this.popupModal = this.popup.querySelector("#myModal");
        parentElement.appendChild(this.popup);
    }


    exit() {
        this.hide();
        this.remove();
    }

    show() {
        this.popupModal.scrollIntoView();
        this.popupModal.classList.add("enabled");
    }

    hide() {
        this.popupModal.classList.remove("enabled");
    }

    remove() {

        setTimeout(() => {
            this.popupModal.remove();
        }, 1000);

    }


}