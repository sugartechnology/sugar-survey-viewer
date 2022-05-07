import SugarSurveyViewerElementBase from './sugar-survey-viewer-base';


export const SugarSurveyViewerElement = (SugarSurveyViewerElementBase);


export type SugarSurveyViewerElement = InstanceType<typeof SugarSurveyViewerElement>;

customElements.define('sugar-survey-viewer', SugarSurveyViewerElement);

declare global {
  interface HTMLElementTagNameMap {
    'sugar-survey-viewer': SugarSurveyViewerElement;
  }
}
