export default function createGame(quizData){
    const gameBoard = document.querySelector('.game-wrapper')
    gameBoard.innerHTML = ""
    console.log(quizData)
    const questionCounter = quizData.counterOfQuestions
    const typeOfAnswers = quizData.typeOfAnswers
    const typeOfQuestions = quizData.typeOfQuestions

    const questionWrapper = document.createElement('div')

    createCarousel(questionCounter, gameBoard)
    createAnswersField(questionWrapper,questionCounter, typeOfAnswers, typeOfQuestions, quizData)
    gameBoard.appendChild(questionWrapper)
}


function createCarousel(counter,section){
    const carousel = document.createElement('div')
    carousel.classList.add('game__carousel')
    for(let i =0; i<counter; i++){
        createCarouselBlock(carousel) 
    }
    section.appendChild(carousel)
}

function createCarouselBlock(main) {

    let div = document.createElement("div")
    div.classList.add("game__carousel_block")
    main.appendChild(div)

  }


function createAnswersField(section,counter,typeAnswer,typeQuestion,quizData){

    console.log(typeAnswer)
    console.log(typeQuestion)

    switch(typeAnswer){
        case '4txt':
            switch(typeQuestion){
                case 'multiQuestion':
                    textAnswersMulti(quizData,section,counter)
                    break
                case 'simpleQuestion':
                    break
            }
            break
        case '4img':
            break
    }


    
}

function textAnswersMulti(quizData,section,counter){
    
    const mainQuestionWrapper = document.createElement('div')
    for(let i =0; i<counter; i++){
        // в данной функции создается вопрос, 4 текстовых ответа и добавляется картинка
        createTextQuestion(mainQuestionWrapper,quizData,i)
    }
    section.appendChild(mainQuestionWrapper)


    function createTextQuestion(section, data,idx){
        const task = document.createElement('div')
        const question = document.createElement('h3')
        question.textContent = data.answers[idx].wrongAnswers.question
        task.appendChild(question)
        const imageContainer = document.createElement('div')
        const image = document.createElement('img')
        image.src = data.answers[idx].file
        image.alt = 'Quiz image'
        imageContainer.appendChild(image)
        task.appendChild(imageContainer)

        const answersContainer = document.createElement('div')
        const answersArr = []
        const rightAnswer = data.answers[idx].answer

        createBtn(answersContainer,data.answers[idx].answer)
        data.answers[idx].wrongAnswers.wrongAnswersArr.forEach(el=>createBtn(answersContainer,el))
        task.appendChild(answersContainer)

        section.appendChild(task)

        function createBtn(container, value){
            const button = document.createElement('button')
            button.value = value
            button.addEventListener('click', (e)=>{
                e.preventDefault()
                if(e.target.value === rightAnswer){
                    console.log("true")
                }else{
                    console.log("false")
                }
            })
            container.appendChild(button)
        }
    }
}


// typeOfAnswers: "4txt"
// typeOfQuestions

function rand(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }