const addQuizBtn = document.getElementById('addQuiz')

addQuizBtn.addEventListener('click', ()=>{
    location.hash = 'addQuiz';
})

const nameOfQuizInput = document.getElementById('nameOfQuiz')
const numberOfQuestionsInput = document.getElementById('numberOfQuestion')
const typeOfAnswers = document.querySelectorAll('input[name="typeOfAnswers"]')
const typeOfQuestions = document.querySelectorAll('input[name="typeOfQuestions"]')

console.log(typeOfAnswers)