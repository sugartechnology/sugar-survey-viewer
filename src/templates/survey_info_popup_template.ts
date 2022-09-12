

const survey_popup_info_template = document.createElement('template');
survey_popup_info_template.innerHTML = `
<style>
.modal {
  z-index: 101;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  box-shadow: 1px 1px 1px 1px grey;
  border-radius: 3.5px;
  -webkit-transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -ms-transition: opacity 1s ease-in-out;
  -o-transition: opacity 1s ease-in-out;
  transition: opacity 1s ease-in-out;
  opacity:0;
  width:100%;
  background-color:white;
  width:40vh;

}
.modal.enabled{
  -webkit-animation: fadeIn 1s;
  opacity:0.9;
  display: flex;
  max-height: fit-content;
  font-size:20px;
  transition: opacity 1s ease-in-out;
}


/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
  from {opacity: 0;} 
  to {opacity: 0.9;}
}


@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity:0.9 ;}
}

.modalContent{
  width: 100%;
  text-align: center;
  padding: 8px 0;
}


.popupınfoclose {
  display:none;
  float: right;
}

.popupınfoclose:hover,
.popupınfoclose:focus {
  cursor: pointer;
}

.actionbutton {
  display:none;
  background-color: #fff;
  border: 1px solid #d5d9d9;
  border-radius: 8px;
  box-shadow: rgba(213, 217, 217, .5) 0 2px 5px 0;
  box-sizing: border-box;
  color: #0f1111;
  font-family: "Amazon Ember",sans-serif;
  font-size: 13px;
  line-height: 29px;
  padding: 0 10px 0 11px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  width: 100px;
}

.actionbutton:hover {
  background-color: #f7fafa;
  cursor: pointer;

}

.actionbutton:focus {
  border-color: #008296;
  box-shadow: rgba(213, 217, 217, .5) 0 2px 5px 0;
  outline: 0;
}

.modalContentText{
  font-size: 1em;
  margin: 1em;
  text-align: center;
  font-weight: lighter;
  
}

</style>

<div id="myModal" class="modal">
<span class="popupınfoclose"> </span>
<div class="modalContent">
  <p class="modalContentText"></p>

  <button class="actionbutton" type="button"></button>

</div>
</div>

`;

export default survey_popup_info_template;
