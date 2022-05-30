import createGame from "./createGame.js"

export default function createQuizes(section) {
    const cardContent = section.querySelector('.choose-quiz')
    
    for(let i = cardContent.childNodes.length-1; i>=0;i--){
        if(cardContent.childNodes[i].classList?.contains('quiz-level')){
            cardContent.removeChild(cardContent.childNodes[i])
        }
    }
    

  
  fetch("http://localhost:3000/api/quizes")
    .then((res) => res.json())
    .then((res) => {
        res.forEach(el=>createCard(el,cardContent))
    })
}


function rand(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }


function createCard(obj,section){
    // obj это полный объект данных
    const card = document.createElement("div")
    card.classList.add('quiz-level')
    const header = document.createElement('h3')
    header.classList.add('quiz-level__header')
    const imageContainer = document.createElement('div')
    imageContainer.classList.add('quiz-level__background-img')
    const img = document.createElement('img')
    img.src = obj.answers[rand(0,obj.answers.length - 1)].file
    img.alt = 'Image for quiz'
    imageContainer.appendChild(img)
    header.textContent = obj.quizName

    const resultBox = document.createElement('div')
    resultBox.classList.add('result-box')
    const resultText = document.createElement('div')
    const p = document.createElement('p')
    p.textContent = "Результат:"
    const total = obj.counterOfQuestions
    let user = JSON.parse(sessionStorage.getItem('user'))
    let currentUserResult = obj?.results?.[user.login]
    if(currentUserResult == undefined){
        currentUserResult = 0
    }
    resultText.textContent = `${currentUserResult} / ${total}`

    resultBox.appendChild(p)
    resultBox.appendChild(resultText)
    card.appendChild(header)
    card.appendChild(imageContainer)
    card.appendChild(resultBox)
    
    section.insertAdjacentElement('afterbegin', card)

    card.addEventListener('click',()=>{
        location.hash = "#game";
        sessionStorage.setItem("hash", "#game")
        createGame(obj)
    })
    // section.appendChild(card)
}

