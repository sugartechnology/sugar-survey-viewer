const checkbox_container_template = document.createElement('template');
checkbox_container_template.innerHTML = `   
    <div class="template">
    
    <div class="questions">

    <span class="question"></span>

    </div>

    <div class="answers">
    <div class="checkboxanswercontainer">
    
    </div>
      
    </div>
    </div>
   
`;

export default checkbox_container_template;

export const makeTemplate = (tagName: string) => {
  const clone = document.createElement('template');
  clone.innerHTML = checkbox_container_template.innerHTML;
  if ((window as any).ShadyCSS) {
    (window as any).ShadyCSS.prepareTemplate(clone, tagName);
  }
  return clone;
};
