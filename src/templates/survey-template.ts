export const checkbutton = `<svg xmlns="http://www.w3.org/2000/svg" width="58" height="40" viewBox="0 0 58 40">
<path fill="none" fill-rule="evenodd" stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M2 20l18 18L56 2"/>
  </svg>`;
const survey_template = document.createElement('template');
survey_template.innerHTML = `   

    <style>
    .body {
        width: auto;
      }
      
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
        margin-left: auto;
        margin-right: auto;
      }

      @media only screen and (max-device-width : 568px)  {

        .answerline{
          flex-direction: column;
          display: contents;
        }
        .navigators{
          margin: 50px auto 100px !important;
        }
        .slider-index-lines{
          margin: 30px 1em 0px;
        }
        .answerContainer{
          width: 100%;
        }
        .checkboxes {

          margin-left: unset !important;

        }
        .filters{
          display: flex;
          flex-direction: column;
          gap: 1em;
        }

        .messagetext{
          width: unset !important;
        }

        .answerline img{
          width: 100%;
          object-fit: contain;
          object-position: 50% 50%;
          height: 32vh;
        }

        .measurements img{
          height: 18vh !important;
        }
      }
    

      .navigators {
        margin:auto;
        width: 80%;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
      }
  
      .navigators div {
        display: grid;
        justify-items: center;
        width: 30%;
      }
  
      .navigators .toend, .navigators .tostart{
        text-decoration: underline;
        color: rgb(138, 138, 137);
        cursor:pointer;
        text-transform: uppercase;
        margin-right:1em;
      }
  
      .navigate{
        align-items: baseline;
        display: flex !important;
        text-align: center;
        gap: 1em;
        justify-content: center;
      }
  
      .button {
      background-color: #3C3C3B;
       font-size: 18px; 
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
      color: white;
      }
  
      .button:hover,
      .button:focus {
        opacity: .75;
      }


      .toend, tostart{
       color: #989897;
       line-height:14px;
      }

      .question {
        font-size: 25px;
        line-height: 30px;
        color: #1D1D1B;
        width: 100%;
        margin:30px 0px 40px;
        text-align: center;
      }
  
      .question,
      .answerText {
        font-weight: 500;
        display: grid;
        justify-items: center;
        font-size: 20px;
      }
  
      .answers {
        flex-wrap: wrap;
      }
  
      .answerContainer {
        text-align: center;
        margin-right: 1em;
        display: flex;
        flex-direction: column;
        margin-bottom: 36px;
        cursor: pointer;
        position: relative;
        break-inside: avoid;
        gap:1em;
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
        background-position: 50% 50%;
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
      text-align: center;
      margin-left: 5px;
      margin-right: 5px;
    }

    .checkboxes {
      display: flex;
      flex-direction: column;
      font-size: 18px;
      color: gray;
      margin-left: 8em;
      padding: 1em;
      float: left;
    }

    .checkboxinput {
      transform: scale(1.5);
      margin-right: 1em !important;
    }
    .checkboxanswercontainer {
      margin: 1em;
      font-family: sans-serif;
      font-size:15px;
    }

    .filterbutton {
      background: dimgray;
      border: none;
      margin-left: 5px;
      height: 3em;
      font-size: 15px;

    }

    .formInput{
      height: 2em;
      font-size: 20px;
      color: gray;
      border: 1px solid gray;
      padding-left: 1em;
      margin-left: 1em;
      margin-right: 1em;
    }

    .messagetext{
      font-size: 20px;
      width: 80vh;
      height: 15vh;
    }

    .formcontainer{

    }

    .kvkkcontainer{
      margin-top: -20px;
      margin-bottom: 30px;
      display:none;
    }


    .form_file .kvkkcontainer{
      display:block;
   }
    .surveycontainer{
      display:none;
    }


    .answerline img{
      width: 100%;
    }
    .kvkk{
      font-size: 1em;
    }

   .finish .finishText{
    font-size : 15px !important;
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
        <button 
        class="button"
        type="button">
          <span>Geri</span>
        </button>
      </div>
      <div class="navigate">
      <a class="tostart tostarttext">Başa Dön</a>
      <a class="toend toendtext">Sona Atla</a>
      </div>
      <div class="next">
        <button
        class="button"
        type="button">
          <span>Sonraki</span>
        </button>
      </div>

      <div class="finish" style="display:none;white-space: nowrap;">

        <button class="button" type="button">
          <span class="finishText">Tamamlayın</span>
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
