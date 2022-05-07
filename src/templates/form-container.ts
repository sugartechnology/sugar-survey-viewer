const form_container_template = document.createElement('template');
form_container_template.innerHTML = `   
    <div class="template">
    
    <div class="questions">

    <span class="question"></span>

    </div>

    <div class="answers">

      
    </div>
    </div>
   
`;

export default form_container_template;

export const makeTemplate = (tagName: string) => {
  const clone = document.createElement('template');
  clone.innerHTML = form_container_template.innerHTML;
  if ((window as any).ShadyCSS) {
    (window as any).ShadyCSS.prepareTemplate(clone, tagName);
  }
  return clone;
};
