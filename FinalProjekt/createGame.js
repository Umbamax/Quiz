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
    }
}


// typeOfAnswers: "4txt"
// typeOfQuestions