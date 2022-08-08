const form_container_template = document.createElement('template');
form_container_template.innerHTML = `   

    <div class="template">
    
    <div class="questions">

    <span class="question"></span>

    </div>

    <div class="formcontainer">

    <div class="answers">

    </div>


    <div class="kvkkcontainer">

    <input type="checkbox" id="kvkk" name="kvkk" value="kvkk">
    <label for="kvkk" class="kvkk">KVKK Onay</label>
    
  <div>

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
