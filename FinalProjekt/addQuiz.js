import createSlider from "./addQuizSlider.js";
import checkValidation from "./addQuizValidation.js";

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
let typeOfAnswers = "4img";
let typeOfQuestions = "simpleQuestion";
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
    typeOfQuestions = el.value;
    if (multiQuestionRadioBtn.checked) {
      textForSimpleQuestion.value = "";
      textForSimpleQuestion.disabled = true;
    } else {
      textForSimpleQuestion.disabled = false;
    }
  })
);

function getValueOfRadio(allRadios) {
  let type;
  allRadios.forEach((el) => {
    if (el.checked === true) {
      type = el.value;
    }
  });
  return type;
}

let quizData = {};

sbmtSettings.addEventListener("click", () => {
  quizData = {};
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
    quizData.quizName = nameOfQuizInput.value;
    quizData.typeOfAnswers = getValueOfRadio(typeOfAnswersRadios);
    quizData.typeOfQuestions = getValueOfRadio(typeOfQuestionsRadios);
    quizData.counterOfQuestions = counterOfQuestionsInput.value;

    if (quizData.typeOfQuestions === "simpleQuestion") {
      quizData.question = textForSimpleQuestion.value;
    }
    createSendNewQuizPage(quizData);
    location.hash = "#sendNewQuiz";
    sessionStorage.setItem("hash", "#sendNewQuiz");
  }
});

// функция создания страницы добавления викторины

function createSendNewQuizPage(quizData) {
  const section = document.querySelector(".send-new-quiz");
  section.innerHTML = ""; //В случае повторного вызова функции сразу удаляем контент

  const quizName = document.createElement('h3')
  quizName.innerHTML = quizData.quizName

  const mainCarousel = document.createElement("div");
  const inputQuizData = document.createElement("div");
  mainCarousel.classList.add("carousel");
  inputQuizData.classList.add("input-quiz-data");

  for (let i = 0; i < quizData.counterOfQuestions; i++) {
    createCarouselBlock(mainCarousel);
    createQuizData(inputQuizData);
  }

  mainCarousel.childNodes[0].classList.add("active-block");
  inputQuizData.childNodes[0].classList.add("active");

  section.appendChild(mainCarousel);
  section.appendChild(quizName);
  section.appendChild(inputQuizData);

  createControls(section);
  const send = section.querySelector(".send-new-quiz__ready-btn");
  // quizData.answers = {};

  send.addEventListener("click", () => {

    const toBase64 = (file, answer, wrongAnswers) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve({ file: reader.result, answer, wrongAnswers });
      });

    const promises = Array.from(inputQuizData.childNodes).map((el) => {
      const file = Array.from(el.querySelector('input[type="file"]').files);
      const text = el.querySelector('input[type="text"]').value;

      const wrongAnswersContainer = el.querySelector(".wrong-answers-container");
      
      const multiQuestion = {};
      let question
      const wrongAnswersArr = [];
      if (!!wrongAnswersContainer) {


        let questionInput = el.querySelector('.enter-question')
        question = questionInput.value

        const inputs = wrongAnswersContainer.querySelectorAll('input[type="text"]');
        
        inputs.forEach(el=>{
          wrongAnswersArr.push(el.value)
        })
      }

      multiQuestion.wrongAnswersArr = wrongAnswersArr
      multiQuestion.question = question

      return toBase64(file[0], text, multiQuestion);
    })


    Promise.all(promises).then((res) => {
      

      quizData.answers = res
      fetch("http://localhost:3000/api/quizes", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(quizData),
      }).then(res=>console.log(JSON.parse(res)))
    })
  });

  createSlider(mainCarousel.childNodes, inputQuizData.childNodes, section.querySelector(".send-new-quiz__next-btn"), section.querySelector(".send-new-quiz__prev-btn"));

  function createQuizData(main) {
    const newQuestion = document.createElement("div");
    const span = document.createElement("span");
    newQuestion.classList.add("new-question");
    const imgWrapper = document.createElement("div");
    imgWrapper.classList.add("input-quiz-data__img");
    const inputImgDiv = document.createElement("div");
    inputImgDiv.classList.add("input-img");
    const inputImg = document.createElement("input");
    inputImg.type = "file";
    const answerOnQuestionWrapper = document.createElement("div");
    answerOnQuestionWrapper.classList.add("answer-on-question");
    const question = document.createElement("div");

    if(quizData.typeOfQuestions === "multiQuestion"){
      const questionInput = document.createElement("input")
      const questionSpan = document.createElement("span")
      questionSpan.textContent = "Enter question"
      questionInput.classList.add('enter-question')
      questionInput.addEventListener('change',()=>checkValidation(section))
      question.appendChild(questionInput)
      question.appendChild(questionSpan)

    }else{
      const questionName = document.createElement("h4")
      question.appendChild(questionName)
    }
    const inputAnswerOnQuestion = document.createElement("input");
    inputAnswerOnQuestion.type = "text";

    span.textContent = "Enter right answer";
    inputImg.setAttribute("accept", ".png,.jpg,.jpeg");

    const open = document.createElement("button");
    open.textContent = "Choose file";

    inputAnswerOnQuestion.addEventListener("change", () => {
      checkValidation(section);
    });

    const triggerInput = () => inputImg.click();

    const changeHandler = (event) => {
      if (!event.target.files.length) {
        return;
      }

      inputImgDiv.innerHTML = "";
      const file = Array.from(event.target.files);

      const reader = new FileReader();

      reader.onload = (e) => {
        let src = e.target.result;
        const img = document.createElement("img");
        img.setAttribute("src", src);
        img.setAttribute("alt", file.name);

        inputImgDiv.appendChild(img);
      };

      reader.readAsDataURL(file[0]);
      checkValidation(section);
    };

    open.addEventListener("click", triggerInput);
    inputImg.addEventListener("change", changeHandler);

    imgWrapper.appendChild(open);
    imgWrapper.appendChild(inputImgDiv);
    imgWrapper.appendChild(inputImg);

    answerOnQuestionWrapper.appendChild(inputAnswerOnQuestion);
    answerOnQuestionWrapper.appendChild(span);

    if (quizData.typeOfQuestions === "multiQuestion") {
      createWrongAnswersInput(answerOnQuestionWrapper);
    }

    newQuestion.appendChild(imgWrapper);
    newQuestion.appendChild(question);
    newQuestion.appendChild(answerOnQuestionWrapper);
    main.appendChild(newQuestion);
  }

  function createControls(main) {
    const controls = document.createElement("div");
    controls.classList.add("send-new-quiz__controls");
    const next = document.createElement("button");
    next.classList.add("send-new-quiz__next-btn");
    next.textContent = "Next";
    const prev = document.createElement("button");
    prev.classList.add("send-new-quiz__prev-btn");
    prev.textContent = "Prev";
    const ready = document.createElement("button");
    ready.classList.add("send-new-quiz__ready-btn");
    ready.disabled = true;
    ready.textContent = "Ready";

    controls.appendChild(prev);
    controls.appendChild(ready);
    controls.appendChild(next);
    main.appendChild(controls);
  }

  function createCarouselBlock(main) {
    let div = document.createElement("div");
    div.classList.add("carousel__block");
    main.appendChild(div);
  }
}

function createWrongAnswersInput(section) {


  const div = document.createElement("div");
  div.classList.add("wrong-answers-container");

  for (let i = 0; i < 3; i++) {

    const input = document.createElement("input");
    input.type = "text";
    input.addEventListener("change",()=>{
      const section = document.querySelector(".send-new-quiz");
      checkValidation(section)
    })
    div.appendChild(input);
  }

  section.appendChild(div);
}

function isCorrectNumber(num) {
  return num < 1 || num > 10 ? false : true;
}
