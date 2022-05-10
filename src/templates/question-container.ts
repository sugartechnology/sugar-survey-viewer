const cquestion_container_template = document.createElement('template');
cquestion_container_template.innerHTML = `   
    <div class="template">
    


    <span class="question"></span>



    <div class="answers">
 
      
    </div>
    </div>
   
`;

export default cquestion_container_template;

export const makeTemplate = (tagName: string) => {
  const clone = document.createElement('template');
  clone.innerHTML = cquestion_container_template.innerHTML;
  if ((window as any).ShadyCSS) {
    (window as any).ShadyCSS.prepareTemplate(clone, tagName);
  }
  return clone;
};
