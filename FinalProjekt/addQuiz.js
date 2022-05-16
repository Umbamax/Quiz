import createSlider from "./addQuizSlider.js"

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
    quizData.counterOfQuestions = counterOfQuestionsInput.value

    if(quizData.typeOfQuestions === 'simpleQuestion'){
      quizData.question = Number(textForSimpleQuestion.value)
    }
    createSendNewQuizPage(quizData)
    location.hash = "#sendNewQuiz"
    sessionStorage.setItem('hash',"#sendNewQuiz")

  }
});

function isCorrectNumber(num) {
  return (num < 1 || num >10) ? false : true;
}

// функция создания страницы добавления викторины

function createSendNewQuizPage(quizData){
  console.log(quizData)
  const section = document.querySelector('.send-new-quiz')
  section.innerHTML = '' //В случае повторного вызова функции сразу удаляем контент

  const mainCarousel = document.createElement('div')
  const inputQuizData = document.createElement('div')
  mainCarousel.classList.add('carousel')
  inputQuizData.classList.add('input-quiz-data')


  for(let i = 0; i<quizData.counterOfQuestions; i++){
    createCarouselBlock(mainCarousel)
    createQuizData(inputQuizData)
  }
  
  mainCarousel.childNodes[0].classList.add('active-block')
  inputQuizData.childNodes[0].classList.add('active')
  section.appendChild(mainCarousel)
  section.appendChild(inputQuizData)

  createControls(section)
  const next = section.querySelector('.send-new-quiz__next-btn')
  const prev = section.querySelector('.send-new-quiz__prev-btn')
 
  createSlider(mainCarousel.childNodes, inputQuizData.childNodes, section.querySelector('.send-new-quiz__next-btn'),  section.querySelector('.send-new-quiz__prev-btn'))

  function createQuizData(main){
    const newQuestion = document.createElement('div')
    newQuestion.classList.add('new-question')
    const imgWrapper = document.createElement('div')
    imgWrapper.classList.add('input-quiz-data__img')
    const inputImgDiv = document.createElement('div')
    inputImgDiv.classList.add('input-img')
    const inputImg = document.createElement('input')
    inputImg.type = 'file'
    const answerOnQuestionWrapper = document.createElement('div')
    answerOnQuestionWrapper.classList.add('answer-on-question')
    const inputAnswerOnQuestion = document.createElement('input')
    inputAnswerOnQuestion.type = 'text'



    imgWrapper.appendChild(inputImgDiv)
    imgWrapper.appendChild(inputImg)


    answerOnQuestionWrapper.appendChild(inputAnswerOnQuestion)


    newQuestion.appendChild(imgWrapper)
    newQuestion.appendChild(answerOnQuestionWrapper)
    main.appendChild(newQuestion)

  }

  function createControls(main){
    const controls = document.createElement('div')
    controls.classList.add('send-new-quiz__controls')
    const next = document.createElement('div')
    next.classList.add('send-new-quiz__next-btn')
    next.textContent = "Next"
    const prev = document.createElement('div')
    prev.classList.add('send-new-quiz__prev-btn')
    prev.textContent = "Prev"
    const ready = document.createElement('div')
    ready.classList.add('send-new-quiz__ready-btn')
    ready.textContent = 'Ready'


    controls.appendChild(prev)
    controls.appendChild(ready)
    controls.appendChild(next)
    main.appendChild(controls)
  }

  function createCarouselBlock(main){
    let div = document.createElement('div')
    div.classList.add('carousel__block')
    main.appendChild(div)
  }


}

