import createGame from "./createGame.js"

export default function createQuizes(section) {
    const cardContent = section.querySelector('.choose-quiz')
    
    for(let i = cardContent.childNodes.length-1; i>=0;i--){
        if(cardContent.childNodes[i].classList?.contains('quiz-level')){
            cardContent.removeChild(cardContent.childNodes[i])
        }
    }
    

  let quizData = {};
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
    card.appendChild(header)
    card.appendChild(imageContainer)
    section.insertAdjacentElement('afterbegin', card)

    card.addEventListener('click',()=>{
        location.hash = "#game";
        sessionStorage.setItem("hash", "#game")
        createGame(obj)
    })
    // section.appendChild(card)
}

