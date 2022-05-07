const starter_container_template = document.createElement('template');
starter_container_template.innerHTML = `   

    <style>

    .firstpage {
      background: black;
      display: flex;
      flex-direction: column;
    }
    .maincontainer {
      font-family: 'Times New Roman', Times, serif;
      flex-direction: column;
      text-align: center;
      margin: 0;
      position: absolute;
      top: 50%;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
    }


    .starterImage {
      width: 100%;
      opacity: .50;
    }
    .imagetext {
      position: absolute;
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
    }
    </style>

    <div class="maincontainer">

    <div class="firstpage ">
      <img class="starterImage" src="https://sugar.mncdn.com/simurgsurvey/starter/surveystart-min.png">
      <div class="imagetext center">
        <span class="title">Ücretsiz Sanat Danışmanlığı</span>
        <span class="titleText"> Satın almanız için özenle seçilmiş sanat eserlerini bulmak için sanat
          danışmanlarımızdan rehberlik isteyin.</span>
        <button class="startbutton"><span class="startbuttontext center">Başla</span></button>
      </div>
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