import createSlider from "./addQuizSlider.js";
import results from "./results.js";

export default function createGame(quizData){
    const gameBoard = document.querySelector('.game-wrapper')
    gameBoard.innerHTML = ""
    console.log(quizData)
    const questionCounter = quizData.counterOfQuestions
    const typeOfAnswers = quizData.typeOfAnswers
    const typeOfQuestions = quizData.typeOfQuestions

    

    createCarousel(questionCounter, gameBoard)
    createAnswersField(gameBoard,questionCounter, typeOfAnswers, typeOfQuestions, quizData)
    createControls(gameBoard)
    const carousel = gameBoard.querySelector('.game__carousel')
    const tasks = gameBoard.querySelector('.question-wrapper')
    const prev = gameBoard.querySelector('.game__prev-btn')
    const next = gameBoard.querySelector('.game__next-btn')


    createSlider(carousel.childNodes, tasks.childNodes,next, prev)
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
                    textAnswersSindge(quizData,section,counter)
                    break
            }
            break
        case '4img':
            imgAnswersSindge(quizData,section,counter)
            break
    }


    
}

function textAnswersMulti(quizData,section,counter){
    
    const mainQuestionWrapper = document.createElement('div')
    mainQuestionWrapper.classList.add('question-wrapper')
    for(let i =0; i<counter; i++){
        // в данной функции создается вопрос, 4 текстовых ответа и добавляется картинка
        createTextQuestion(mainQuestionWrapper,quizData,i)
    }
    section.appendChild(mainQuestionWrapper)

    let answersCounter = 0;
    let rightAnswersCounter = 0;

    function createTextQuestion(section, data,idx){
        const task = document.createElement('div')
        task.classList.add('task')
        if(idx===0){
            task.classList.add('active-task')
        }
        const question = document.createElement('h3')
        question.textContent = data.answers[idx].wrongAnswers.question
        task.appendChild(question)
        const imageContainer = document.createElement('div')
        imageContainer.classList.add('image-container')
        const image = document.createElement('img')
        image.src = data.answers[idx].file
        image.alt = 'Quiz image'
        imageContainer.appendChild(image)
        task.appendChild(imageContainer)

        const answersContainer = document.createElement('div')
        answersContainer.classList.add('answers-container')
        const answersArr = []

        const rightAnswer = data.answers[idx].answer
        const totalTasks = Number(data.counterOfQuestions) 

        createBtn(answersArr,data.answers[idx].answer)
        data.answers[idx].wrongAnswers.wrongAnswersArr.forEach(el=>createBtn(answersArr,el))
        shuffle(answersArr)
        answersArr.forEach(el=>answersContainer.appendChild(el))
        task.appendChild(answersContainer)

        section.appendChild(task)

        
        function createBtn(arr, value){
            
            const carouselBlocks = document.querySelectorAll('.game__carousel_block')
            const button = document.createElement('button')
            button.value = value
            button.textContent = value
            button.addEventListener('click', async (e)=>{
                
                if(carouselBlocks[idx].classList.contains('wrong') || carouselBlocks[idx].classList.contains('right')){
                    return
                }
                answersCounter++
                if(e.target.value === rightAnswer){
                    carouselBlocks[idx].classList.add('right')
                    rightAnswersCounter++
                }else{
                    carouselBlocks[idx].classList.add('wrong')
                }
                
                if(totalTasks == answersCounter){
                    const user = JSON.parse(sessionStorage.getItem('user')) 

                    const login = user.login
                   await results(login,data.quizName,rightAnswersCounter, totalTasks)
                }
                return false
            })
            arr.push(button)
        }
    }
}


function textAnswersSindge(quizData,section,counter){
    const mainQuestionWrapper = document.createElement('div')
    mainQuestionWrapper.classList.add('question-wrapper')
    const allAnswers = []
    quizData.answers.forEach(el => allAnswers.push(el.answer))
    for(let i =0; i<counter; i++){
        // в данной функции создается вопрос, 4 текстовых ответа и добавляется картинка
        createTextQuestion(mainQuestionWrapper,quizData,i)
    }
    section.appendChild(mainQuestionWrapper)
    

    let answersCounter = 0;
    let rightAnswersCounter = 0;

    function createTextQuestion(section, data,idx){
        const task = document.createElement('div')
        task.classList.add('task')
        if(idx===0){
            task.classList.add('active-task')
        }
        const question = document.createElement('h3')
        question.textContent = data.question
        task.appendChild(question)
        const imageContainer = document.createElement('div')
        imageContainer.classList.add('image-container')
        const image = document.createElement('img')
        image.src = data.answers[idx].file
        image.alt = 'Quiz image'
        imageContainer.appendChild(image)
        task.appendChild(imageContainer)

        const answersContainer = document.createElement('div')
        answersContainer.classList.add('answers-container')
        



        const taskAnswers = []
        const rightAnswer = data.answers[idx].answer
        taskAnswers.push(rightAnswer)

        for(let i =0; i<3; i++){
            genereteAnswers(allAnswers, taskAnswers)
        }

        const totalTasks = Number(data.counterOfQuestions) 
        const btnsArra = []
        // createBtn(btnsArra,data.answers[idx].answer)
        taskAnswers.forEach(el=>createBtn(btnsArra,el))
        shuffle(btnsArra)
        btnsArra.forEach(el=>answersContainer.appendChild(el))
        task.appendChild(answersContainer)

        section.appendChild(task)

        
        function createBtn(btnsArra, value){
            
            const carouselBlocks = document.querySelectorAll('.game__carousel_block')
            const button = document.createElement('button')
            button.value = value
            button.textContent = value
            button.addEventListener('click', (e)=>{
                e.preventDefault()
                if(carouselBlocks[idx].classList.contains('wrong') || carouselBlocks[idx].classList.contains('right')){
                    return
                }
                answersCounter++
                if(e.target.value === rightAnswer){
                    carouselBlocks[idx].classList.add('right')
                    rightAnswersCounter++
                }else{
                    carouselBlocks[idx].classList.add('wrong')
                }
                
                if(totalTasks == answersCounter){
                    const user = JSON.parse(sessionStorage.getItem('user')) 

                    const login = user.login
                    results(login,data.quizName,rightAnswersCounter, totalTasks)
                }
            })
            btnsArra.push(button)
        }
    }
    
    function genereteAnswers(allAnswers, taskAnswers){
        let answer = allAnswers[rand(0, allAnswers.length - 1)]
        if(taskAnswers.includes(answer)){
            return genereteAnswers(allAnswers, taskAnswers)
        }
        taskAnswers.push(answer)

    }

}


function imgAnswersSindge(quizData,section,counter){
    const mainQuestionWrapper = document.createElement('div')
    mainQuestionWrapper.classList.add('question-wrapper')
    const allAnswers = []
    quizData.answers.forEach(el => allAnswers.push(el.file))
    for(let i =0; i<counter; i++){
        // в данной функции создается вопрос, 4 текстовых ответа и добавляется картинка
        createImgQuestion(mainQuestionWrapper,quizData,i)
    }
    section.appendChild(mainQuestionWrapper)
    


    let answersCounter = 0;
    let rightAnswersCounter = 0;

    function createImgQuestion(section, data,idx){
        const task = document.createElement('div')
        task.classList.add('task')

        if(idx===0){
            task.classList.add('active-task')
        }

        const question = document.createElement('h3')
        question.textContent = data.question
        task.appendChild(question)
        // const imageContainer = document.createElement('div')
        // imageContainer.classList.add('image-container')
        // const image = document.createElement('img')
        // image.src = data.answers[idx].file
        // image.alt = 'Quiz image'
        // imageContainer.appendChild(image)
        // task.appendChild(imageContainer)
        const answer = document.createElement('h2')
        answer.textContent = data.answers[idx].answer
        task.appendChild(answer)

        const answersContainer = document.createElement('div')
        answersContainer.classList.add('answers-container')
        



        const taskAnswers = []
        const rightAnswer = data.answers[idx].file
        taskAnswers.push(rightAnswer)

        for(let i =0; i<3; i++){
            genereteAnswers(allAnswers, taskAnswers)
        }

        const totalTasks = Number(data.counterOfQuestions) 
        const btnsArra = []
        // createBtn(btnsArra,data.answers[idx].answer)
        taskAnswers.forEach(el=>createBtn(btnsArra,el))
        shuffle(btnsArra)
        btnsArra.forEach(el=>answersContainer.appendChild(el))
        task.appendChild(answersContainer)

        section.appendChild(task)


        
        function createBtn(btnsArra, value){
            
            const carouselBlocks = document.querySelectorAll('.game__carousel_block')
            const imgContaiter = document.createElement('div')
            imgContaiter.classList.add('task__image-container')

            const image = document.createElement('img')
            image.src = value
            image.alt = 'Quiz image'
            imgContaiter.appendChild(image)
            

            imgContaiter.addEventListener('click', (e)=>{
                e.preventDefault()
                if(carouselBlocks[idx].classList.contains('wrong') || carouselBlocks[idx].classList.contains('right')){
                    return
                }
                answersCounter++
                if(e.target.closest('img').src === rightAnswer){
                    carouselBlocks[idx].classList.add('right')
                    rightAnswersCounter++
                }else{
                    carouselBlocks[idx].classList.add('wrong')
                }
                
                if(totalTasks == answersCounter){
                    const user = JSON.parse(sessionStorage.getItem('user')) 

                    const login = user.login
                    results(login,data.quizName,rightAnswersCounter, totalTasks)
                }
            })
            btnsArra.push(imgContaiter)
        }
    }
    
    function genereteAnswers(allAnswers, taskAnswers){
        let answer = allAnswers[rand(0, allAnswers.length - 1)]
        if(taskAnswers.includes(answer)){
            return genereteAnswers(allAnswers, taskAnswers)
        }
        taskAnswers.push(answer)

    }

}


// typeOfAnswers: "4txt"
// typeOfQuestions

function rand(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function createControls(section){
    const controls = document.createElement("div")
    controls.classList.add("game__controls")
    const next = document.createElement("button")
    next.classList.add("game__next-btn")
    next.textContent = "Next"
    const prev = document.createElement("button")
    prev.classList.add("game__prev-btn")
    prev.textContent = "Prev"
    controls.appendChild(prev)
    controls.appendChild(next)
    section.appendChild(controls)
}


