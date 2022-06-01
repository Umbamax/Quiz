import createQuiz from "./createQuizes.js";

window.onload = () => {
  if (!sessionStorage.getItem("hash")) {
    sessionStorage.setItem("hash", "#auth");
    location.hash = sessionStorage.getItem("hash");
  } else {
    location.hash = sessionStorage.getItem("hash");
  }
  changeHash();
};

window.addEventListener("hashchange", changeHash);

const resultPage = document.querySelector(".result");
const authPage = document.querySelector(".authorization");
const chooseQuizPage = document.querySelector(".choose-quiz-wrapper");
const addQuizPage = document.querySelector(".add-quiz-page");
const sendNewQuizPage = document.querySelector(".send-new-quiz");
const gamePage = document.querySelector(".game");
const addQuizBtn = document.getElementById("addQuiz");

// const logoutBtn = document.querySelector('.logout')
// const homeBtn = document.querySelector('.home')

function changeHash() {
  logoutBtn.style.visibility = 'visible';
  homeBtn.style.visibility = 'visible';
  addQuizBtn.hidden = true;
  authPage.hidden = true;
  chooseQuizPage.hidden = true;
  addQuizPage.hidden = true;
  sendNewQuizPage.hidden = true;
  gamePage.hidden = true;
  resultPage.hidden = true
  let user;
  switch (location.hash) {
    case "#auth":
      authPage.hidden = false;
      homeBtn.style.visibility = 'hidden';
      logoutBtn.style.visibility = 'hidden';
      break;
    case "#chooseQuiz":
      if (!sessionStorage.getItem("user")) {
        location.hash = "#auth";
        return;
      }
      user = JSON.parse(sessionStorage.getItem("user"));
      if (user.isAdmin === true) {
        addQuizBtn.hidden = false;
      }
      createQuiz(chooseQuizPage);
      sessionStorage.setItem("hash", "#chooseQuiz");
      chooseQuizPage.hidden = false;
      break;
    case "#addQuiz":
      user = JSON.parse(sessionStorage.getItem("user"));
      if (user.isAdmin === false) {
        location.hash = "#auth";
      }
      addQuizPage.hidden = false;
      break;
    case "#sendNewQuiz":
      user = JSON.parse(sessionStorage.getItem("user"));
      if (user.isAdmin === false) {
        location.hash = "#auth";
      }
      sendNewQuizPage.hidden = false;
      break;
    case "#game":
      gamePage.hidden = false;
      break;
    default:
      location.hash = "#auth";
      sessionStorage.setItem("hash", "#auth");
  }
}
