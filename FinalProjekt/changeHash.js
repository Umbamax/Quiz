



window.onload = () => {
    if (!sessionStorage.getItem("hash")) {
      sessionStorage.setItem("hash", "#auth");
      location.hash = sessionStorage.getItem("hash");
    } else {
      location.hash = sessionStorage.getItem("hash");
    }
    changeHash()
  };

window.addEventListener("hashchange",changeHash)


const authPage = document.querySelector('.authorization')
const chooseQuizPage = document.querySelector('.choose-quiz-wrapper')
const addQuizPage = document.querySelector('.add-quiz-page')
const sendNewQuizPage = document.querySelector('.send-new-quiz')

function changeHash(){


    authPage.hidden = true
    chooseQuizPage.hidden = true
    addQuizPage.hidden = true
    sendNewQuizPage.hidden = true
    let user;
    switch(location.hash){

        case "#auth":
            authPage.hidden = false
            break
        case "#chooseQuiz":
            if(!sessionStorage.getItem('user')){
                location.hash = "#auth"
                return
            }
            sessionStorage.setItem("hash", "#chooseQuiz")
            chooseQuizPage.hidden = false
            break
        case "#addQuiz":
            user = JSON.parse(sessionStorage.getItem('user'))
            if(user.isAdmin === false){
              location.hash = "#auth"
            }
            addQuizPage.hidden = false
            break
        case '#sendNewQuiz':
            user = JSON.parse(sessionStorage.getItem('user'))
            if(user.isAdmin === false){
              location.hash = "#auth"
            }
            sendNewQuizPage.hidden = false
          break
        default:
             location.hash = "#auth"
             sessionStorage.setItem("hash", "#auth")
             
    }


}
