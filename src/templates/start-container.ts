const starter_container_template = document.createElement('template');
starter_container_template.innerHTML = `   

    <style>

    .firstpage, .firstFullpage {
      background: black;
      background-repeat: no-repeat;
      display: flex;
      flex-direction: column;
      width: 100%;
      opacity: 0.8;
      height: 100%;
      justify-content: center;
      display:none;
      top: 100%;

    }

    .firstFullpage{
      height: 100vh !important;
      background: white;
  
      background: center;
    }

    .firstFullpage button{
      border: 1px solid black;
    }

    .maincontainer {
      font-family: 'Times New Roman', Times, serif;
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
    }

    .title {
      font-size: 50px;
      font-style: italic;
    }

    .titleText {
      font-size: 30px;
      width: 860px;
    }
    .firstFullpage span{
      color:black !important;
    }

    @media only screen and  (min-width: 320px) and (max-device-width : 568px)  {
      .titleText {
        width: 860px;
        width: 100%; 
        font-size: 1.3em;
        
    }
      .starterImage {
        width: 100%;
        min-height: 40vh;
        opacity: .50;
      }
    .title {
      font-size: 1.3em;
      }
    }

      

    .startbutton {
      background: transparent;
      height: 50px;
      min-width: 130px;
      border-color: white;
      border: 1px solid;
    }

    .startbuttontext{
      font-size:30px;
    }


    /*second page*/
    .secondpage {
      display: flex;
      flex-direction: column;
      color: #1D1D1B !important;
      align-items: center;
      transform: translateY(100%);
    }

    .secondpagetext{
      color: #1D1D1B !important;

    }
    .secondtitletext {
      line-height: 30px;
      font-size: 25px;
    }
    /*lastpage*/
    .lastpage{
      display: flex;
      flex-direction: column;
      color: #1D1D1B;
      width: 1500px;
      max-width: 100%;
      align-items: center;
      transform: translateY(100%);
    }
    </style>

  <div class="maincontainer">

    <div class="firstpage" style="background-repeat: no-repeat; transform: translateY(100%);">
   
      <div class="imagetext">
        <span class="title"></span>
        <span class="titleText"></span>
        <button class="startbutton"><span class="startbuttontext center">Başla</span></button>
      </div>

      <div style="position:absolute;width:100%;height: 100%;background:#000000;left: 0;top: 0;opacity: 0.6; z-index:-1;"></div>
    </div>

    <div class="firstFullpage"  style="background-repeat: no-repeat;">
   
    <div class="imagetext">
      <span class="title"></span>
      <span class="titleText"></span>
      <button class="startbutton"><span class="startbuttontext center">Başla</span></button>
    </div>

    <div style="position:absolute;width:100%;height: 100vh;background: white;left: 0;top: 0;opacity: 0.6;z-index:-1;"></div>
  </div>

    <div class="secondpage" style="display:none">

      <span class="title">Sanat Danışmanlığı'na hoş geldiniz</span>
      <span class="secondtitletext"> Birkaç kısa soruyu yanıtladıktan sonra, uzman sanat danışmanlarımız sizin için
        özel
        olarak seçilmiş sanat eserlerini bir araya getirecek.
        Anketi doldurmanızın ardından, sanat danışmanlarımız kısa sürede içinde sizinle iletişime geçecektir.
        Başlayalım!</span>
      <button class="startbutton"><span class="startbuttontext center">Başla</span></button>
    </div>

  <div class="lastpage" style="display:none">

    <span class="title">Teşekkür ederim!</span>
    <span class="secondtitletext">Kişisel sanat danışmanınız, değerlendirmeniz için özenle seçilmiş bir sanat eseri seçkisi ile 48 saat içerisinde sizinle iletişime geçecektir. 
    Bu arada, Evinde Gör uygulamamızdan eserleri evinizde deneyebilirsiniz.</span>
    <button class="startbutton"><span class="startbuttontext center">Evinde Gör uygulamasını kullan</span></button>
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