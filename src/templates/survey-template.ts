export const checkbutton = `<svg xmlns="http://www.w3.org/2000/svg" width="58" height="40" viewBox="0 0 58 40">
<path fill="none" fill-rule="evenodd" stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M2 20l18 18L56 2"/>
  </svg>`;
const survey_template = document.createElement('template');
survey_template.innerHTML = `   

    <style>
    .body {
        width: auto;
      }
  
      @media only screen and (max-width: 700px) {}
  
      .navigators,
      .slider-index-lines {
        display: flex;
        flex-direction: row;
      }
  
      .slider-index-lines {
        margin: 0 23%;
      }
  
      hr {
        width: 12%;
        height: 3.5px !important;
        background-color: gray;
        margin:1em;
      }
  
      hr.filled {
        background-color: black;
  
      }

      .center {
        left: 0px;
        top: 0px;
        transform: translate(50%, 50%);
      }
  
  
      .answerline {
        gap: 2em;
        display: flex;
        align-content: stretch;
        justify-content: space-evenly;
        margin: 1em;
        margin-top: 2em;
        max-width: 470px;
        margin-left: auto;
        margin-right: auto;
      }
  
  
      .navigators {
        margin: 1em 8em 1em;
      }
  
      .navigators div {
        display: grid;
        justify-items: center;
        width: 33%;
      }
  
      .navigators .toend {
        text-decoration: underline;
        font-size: small !important;
        color: rgb(138, 138, 137);
        cursor:pointer;
      }
  
  
      .button {

        background-color: #3C3C3B;
        font-size: 20px;
        line-height: 30px;
        height: 40px;
        background-color: #3C3C3B;
        color: #fff;
        min-width: 80px;
        cursor: pointer;
        display: inline-block;
        margin: 0;
        outline: none;
        overflow: hidden;
        text-transform: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        color:white;
      }
  
      .button:hover,
      .button:focus {
        opacity: .75;
      }


      .toend{
       color: #989897;
       line-height:14px;
       font-size:12px;
      }
      //question template
      .questions {
        margin-top: 4vh;
      }
  
      .question {
        font-size: 25px;
        line-height: 30px;
        color: #1D1D1B;
        width: 100%;
      }
  
      .question,
      .answerText {
        font-weight: 500;
        display: grid;
        justify-items: center;
        font-family: arial;
        font-size: 1.25em;
      }
  
      .answers {
        flex-wrap: wrap;
        margin: 1em 8em 1em;
      }
  
      .answerContainer {
        text-align: center;
        flex: 1 0 21%;
        margin-right: 1em;
        display: flex;
        flex-direction: column;
        margin-bottom: 36px;
        cursor: pointer;
        position: relative;
        break-inside: avoid;
        align-self: flex-end;
      }
  
      .answerText {
        margin: 1em;
      }

      .templatecontainer{
        gap: 2em;
      display: flex;
      /* align-content: stretch; */
      justify-content: space-evenly;
      margin: 1em;
      margin-top: 2em;
      }

      .template.enable{
        opacity:1;
        display:block;
      }

      .template{
        opacity:0;
        display:none;
      }

      .answerChecked {
        position: absolute;
        top: 0px;
        left: 0px;
        background-color: rgba(255, 255, 255, 0.6);
        background-image: url(https://d3t95n9c6zzriw.cloudfront.net/art-advisory/aa-quiz/check.svg);
        background-position: 50% 38%;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        opacity:0;
        display: none;
    }

    .answerChecked.selected {
      opacity:1;
      display: block;
    }
    .filterinput {
      height: 3em;
    }

    .checkboxes {
      display: flex;
      flex-direction: column;
      font-size: 18px;
      color: gray;
      margin: 1em;
      padding: 1em;
    }

    .checkboxinput {
      transform: scale(1.5);
      margin-right: 1em !important;
    }
    .checkboxanswercontainer {
      margin: 1em;
      text-align: center;
    }

    .filterbutton {
      background: dimgray;
      border: none;
    }

    .formInput{
      height: 2em;
      font-size: 20px;
      color: gray;
      border: 1px solid gray;
      padding-left: 1em;
    }

    .messagetext{
      font-size: 20px;
      width: 80vh;
      height: 15vh;
    }
    .surveycontainer{
      display:none;
    }
    </style>

    <div class="surveycontainer">
    <div class="main-container">

      <div class="slider-index-lines">
      
      </div>

 
    <div class="templatecontainer">

      
    </div>

    <div class="navigators">
      <div class="prev">
        <button class="button">
          <span>Geri</span>
        </button>
      </div>
      <div class="toend">
        <span class="toend center toendtext">Sona Atla</span>
      </div>
      <div class="next">
        <button class="button">
          <span>Sonraki</span>
        </button>
      </div>

      <div class="finish" style="display:none">
      <button class="button">
        <span>İstek Gönderin</span>
      </button>
      </div>
      
    </div>
  </div>

  </div>

    
`;



export default survey_template;

export const makeTemplate = (tagName: string) => {
  const clone = document.createElement('template');
  clone.innerHTML = survey_template.innerHTML;
  if ((window as any).ShadyCSS) {
    (window as any).ShadyCSS.prepareTemplate(clone, tagName);
  }
  return clone;
};
