const addQuizBtn = document.getElementById("addQuiz");

addQuizBtn.addEventListener("click", () => {
  location.hash = "addQuiz";
});
const body = document.querySelector("body");
const nameOfQuizInput = document.getElementById("nameOfQuiz");
const counterOfQuestionsInput = document.getElementById("numberOfQuestion");
const typeOfAnswersRadios = document.querySelectorAll('input[name="typeOfAnswers"]');
const typeOfQuestionsRadios = document.querySelectorAll('input[name="typeOfQuestions"]');
const multiQuestionRadioBtn = document.querySelectorAll('input[value="multiQuestion"]');
let typeOfAnswers = "4img";
let typeOfQuestions = "multiQuestion";
// addPopup(counterOfQuestionsInput, isCorrectNumber)
const sbmtSettings = document.getElementById("submitAddQuizSettings");

typeOfQuestionsRadios.forEach((el) =>
  el.addEventListener("click", () => {
      
    typeOfQuestions = el.value;
    console.log(typeOfQuestions);
    multiQuestionRadioBtn.disabled = typeOfQuestions === "4img" ? true : false;
  })
);

// typeOfAnswers.forEach((el) =>
//   el.addEventListener("click", () => {
//     console.log(el.value);
//   })
// );

sbmtSettings.addEventListener("click", () => {
  let isValid = isCorrectNumber(counterOfQuestionsInput.value);
  if (!isFill(nameOfQuizInput.value)) {
    isValid = false;
  }
});

function isCorrectNumber(num) {
  return num < 1 ? false : true;
}

let quizData = {};

// function addPopup(element, callback) {
//   let coordX = element.getBoundingClientRect().x;
//   let coordY = element.getBoundingClientRect().y;

//   let parentWidth = element.offsetWidth;

//   const text = element.dataset.popup;
//   const side = element.dataset.popupSide;

//   let handler;

//   if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//     handler = "click";
//   } else {
//     handler = element.dataset.popupHandler || "click";
//   }

//   let div = document.createElement("div");
//   div.className = "popup";
//   div.textContent = text;
//   div.style.width = parentWidth + "px";
//   div.style.height = "auto";
//   div.hidden = true;
//   switch (side) {
//     case "right":
//       div.style.left = coordX + parentWidth + "px";
//       div.style.top = coordY + "px";

//       break;
//     case "left":
//       div.style.left = coordX - parentWidth + "px";
//       div.style.top = coordY + "px";
//       break;
//     case "top":
//       div.style.left = coordX + "px";
//       div.style.top = coordY - div.style.height + "px";
//       break;
//     case "bottom":
//       div.style.left = coordX + "px";
//       div.style.top = coordY + div.style.height + "px";
//       break;
//     default:
//       div.style.left = coordX + parentWidth + "px";
//       div.style.top = coordY + "px";
//   }

//   element.addEventListener('change', ()=>{

//       div.hidden =  callback(element.value) ? false : true
//   })

//   body.appendChild(div);

// }
