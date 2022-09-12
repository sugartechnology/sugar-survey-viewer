const starter_container_template = document.createElement('template');
starter_container_template.innerHTML = `   

    <style>

    .firstpage,
    .firstFullpage {
        justify-content: center;
        display: none;
        color: #1D1D1B !important;
        align-items: center;
        gap: 2em;
        /*transform: translateY(25%);*/
    }

    .firstFullpage {
        height: 100vh !important;
        background: white;
        background: center;
    }

    .firstFullpage button {
        border: 1px solid black;
    }

    .maincontainer {
        flex-direction: column;
        text-align: center;
        width: 100%;

    }


    .starterImage {
        width: 100%;
        opacity: .50;
    }

    .imagetext {
        z-index: 11;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: white;
        opacity: 0.8;
        width: 70%;
    }

    .lastpageTitle {
        font-size: 2em;
        font-style: italic;
        margin-bottom: 2em;
    }

    .titleText{
      color: black;
    }

    @media only screen and (max-device-width : 700px) {


        .title {
            font-size: 1.3em;
        }

        .firstpage {
          flex-direction: column;
        }

        .firstpage .imagetext {
            font-size: 1em;
        }
        .description,  .firstpage {
            transform: translateY(0) !important;
        }
        .surveyProducts span br, .survey span br{
            display:none;
        }
        .titleText{
            font-size:25px !important;
        }
        .secondpage, .lastpage{
            margin:unset !important;
        }
    }

    .startbutton {
        background: transparent;
        height: 36px;
        border-color: black;
        border: 2px solid;
        color: black;
        width:100px;
        margin-top:1em;
        font-size: 50% !important;

    }

    .startbuttontext {
        font-size: 20px;
    }


    /*second page*/
    .secondpage, .lastpage{

        top: 50%;
        color: #1D1D1B !important;
        align-items: center;
        gap: 2em;
        flex-direction: column;
        margin-top: 5em;
        display: flex;
        
        /*position: fixed;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);*/

        top: 50%;
        left: 50%;
        /*width: 90%;*/
    }

    .secondpagetext {
        color: #1D1D1B !important;

    }

    .secondtitletext {
        line-height: 30px;
        font-size: 20px;
    }

    /*lastpage*/
    .lastpage {
        gap: 2em;
        display: flex;
        flex-direction: column;
        color: #1D1D1B;
        max-width: 100%;
        align-items: center;
    }

    .surveyProducts,
    .survey {
        position: relative;
    }


    .image {
        width: 100%;
    }

    .description{
        flex-direction: column;
        align-items: center;
        display: table-cell;
        vertical-align: middle;
    }

    .firstpage .imagetext {
        position: absolute;
        background: white;
        background-color: rgb(255 255 255 / 100%);
        padding:1em;
        font-size:25px;
        display: table;
        text-align: center;
       
    }
    .surveyProducts .imagetext{
        font-size: 30px;
    }
  
    .surveyImageContainer{
      position: relative;
    }

    .centeredImageText{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height:25vh;
    }
   

    </style>


    <div class="maincontainer">

    <div class="firstpage">

    <div class="surveyProducts" style="background-repeat: no-repeat;">
    <div class="surveyImageContainer">
         <img class="image" alt=""
            src="https://sugar.mncdn.com/simurgsurvey/starter/simurg1st.png" />
        <div class="imagetext centeredImageText">
            <div class="description">

            <span class="title"></span>
            <span class="titleText">Mekanınıza Uygun Eserleri 
            <br>
            Seçmeye Başlayın!</span>
            <br>
            <button class="startbutton" type="button"><span class="startbuttontext">Başla</span></button>
            </div>
        </div>
      </div>
    </div>

    <div class="survey" style="background-repeat: no-repeat; ">

    <div class="surveyImageContainer">
        <img class="image" alt="" src="https://sugar.mncdn.com/simurgsurvey/starter/simurg2nd.png" />
        <div class="imagetext centeredImageText">
        <div class="description">
            <span class="title"></span>
            <span class="titleText"> Satın Almanız İçin Özenle Seçilmiş
            <br>
             Sanat Eserlerini Bulmak İçin 
            <br>
              Sanat
                Danışmanlarımızdan <br>
                Rehberlik İsteyin</span>
            <br>
          <button class="startbutton"
            surveyType="consulting"
            next-page="Page1"
            type="button"
            data-page-index="0"><span
            class="startbuttontext">Başla</span>
            </button>
            </div>
        </div>
      </div>
        </div>
    </div>

       <!-- <div class="firstFullpage" style="background-repeat: no-repeat;">

            <div class="imagetext">
                <span class="title"></span>
                <span class="titleText"></span>
                <button 
                class="startbutton"
                type="button"
                next-page="page1"
                data-page-index="0">
                    <span class="startbuttontext">Başla</span>
                </button>
            </div>

            <div
                style="position:absolute;width:100%;height: 100vh;background: white;left: 0;top: 0;opacity: 0.6;z-index:-1;">
            </div>
        </div>-->

        <div class="secondpage" style="display:none">

            <span class="lastpageTitle">Sanat Danışmanlığı'na Hoş Geldiniz</span>
            <span class="secondtitletext"> Birkaç kısa soruyu yanıtladıktan sonra, uzman sanat danışmanlarımız sizin
                için
                özel
                olarak seçilmiş sanat eserlerini bir araya getirecek.<br>
                Anketi doldurmanızın ardından, sanat danışmanlarımız kısa sürede içinde sizinle iletişime geçecektir.
                <br>
                Başlayalım!</span>
                <br>
            <button class="startbutton" type="button"><span class="startbuttontext center">Başla</span></button>
        </div>

        <div class="lastpage" style="display:none">

            <span class="lastpageTitle">Teşekkür Ederiz!</span>
            <span class="secondtitletext">Kişisel sanat danışmanınız, değerlendirmeniz için özenle seçilmiş bir sanat
                eseri seçkisi ile
                 48 saat içerisinde sizinle iletişime geçecektir.
           <br>
                Bu arada, Evinde Gör uygulamamızdan eserleri evinizde deneyebilirsiniz.</span>

            <div class="finish">

                <button class="button" type="button" id="try_at_home" target="_blank">
                    <span class="finishText submitData">Evinde Gör Uygulamasını Kullan </span>
                </button>

            </div>
        </div>
    </div>
 `;


export default starter_container_template;

export const makeTemplate = (tagName: string) => {
    const clone = document.createElement('template');
    clone.innerHTML = starter_container_template.innerHTML;
    if ((window as any).ShadyCSS) {
        (window as any).ShadyCSS.prepareTemplate(clone, tagName);
    }
    return clone;
};