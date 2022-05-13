const addQuizBtn = document.getElementById("addQuiz");

addQuizBtn.addEventListener("click", () => {
  location.hash = "addQuiz";
});
const body = document.querySelector("body");
const nameOfQuizInput = document.getElementById("nameOfQuiz");
const counterOfQuestionsInput = document.getElementById("numberOfQuestion");
const typeOfAnswersRadios = document.querySelectorAll('input[name="typeOfAnswers"]');
const typeOfQuestionsRadios = document.querySelectorAll('input[name="typeOfQuestions"]');
const multiQuestionRadioBtn = document.querySelector('input[value="multiQuestion"]');
const singleQuestionRadioBtn = document.querySelector('input[value="simpleQuestion"]');
const textForSimpleQuestion = document.getElementById("textForSimpleQuestion");
const errorSettings = document.querySelector(".add-quiz__error-value");
errorSettings.hidden = true;
let typeOfAnswers = "4img"
let typeOfQuestions = 'simpleQuestion'
// addPopup(counterOfQuestionsInput, isCorrectNumber)
const sbmtSettings = document.getElementById("submitAddQuizSettings");

typeOfAnswersRadios.forEach((el) =>
  el.addEventListener("click", () => {
    typeOfAnswers = el.value;
    
    if (typeOfAnswers === "4img") {
      singleQuestionRadioBtn.checked = true;
      multiQuestionRadioBtn.disabled = true;
      textForSimpleQuestion.disabled = false;
    } else {
      multiQuestionRadioBtn.disabled = false;
    }
  })
);

typeOfQuestionsRadios.forEach((el) =>
  el.addEventListener("change", () => {

console.log('dasdadad')
typeOfQuestions = el.value
    if (multiQuestionRadioBtn.checked) {
      textForSimpleQuestion.value = "";
      textForSimpleQuestion.disabled = true;
    } else {
      textForSimpleQuestion.disabled = false;
    }
  })
);

function getValueOfRadio(allRadios){
  let type;
  allRadios.forEach(el=>{
    if(el.checked === true){
      type = el.value
    }
  })
  return type
}


let quizData = {};

sbmtSettings.addEventListener("click", () => {
  quizData = {}
  let isValid = true;
  if (!isCorrectNumber(counterOfQuestionsInput.value)) {
    isValid = false;
    errorSettings.innerHTML += "Неверное количество вопросов. ";
    errorSettings.hidden = false;
  }
  if (!isFill(nameOfQuizInput.value)) {
    errorSettings.innerHTML += "Название викторины не должно быть пустым. ";
    isValid = false;
    errorSettings.hidden = false;
  }
  if (singleQuestionRadioBtn.checked) {
    if (!isFill(textForSimpleQuestion.value)) {
      errorSettings.innerHTML += "Текст вопроса не должен быть пустым. ";
      isValid = false;
      errorSettings.hidden = false;
    }
  }

  if (!isValid) {
    sbmtSettings.disabled = true;
    setTimeout(() => {
      errorSettings.hidden = true;
      sbmtSettings.disabled = false;
      errorSettings.innerHTML = "";
    }, 5000);
  } else {
    quizData.quizName = nameOfQuizInput.value
    quizData.typeOfAnswers = getValueOfRadio(typeOfAnswersRadios)
    quizData.typeOfQuestions = getValueOfRadio(typeOfQuestionsRadios)

    if(quizData.typeOfQuestions === 'simpleQuestion'){
      quizData.question = textForSimpleQuestion.value
    }

    console.log(quizData)

  }
});

function isCorrectNumber(num) {
  return (num < 1 || num >10) ? false : true;
}



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
