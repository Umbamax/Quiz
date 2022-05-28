export default async function results(username, quizName, result,total){

    const body = {
        'username': username,
        'quizName': quizName,
        'result': result,
    }
    
    let promise = await fetch("http://localhost:3000/api/quizes",{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify(body)
    }).then(res => res.json()).then(res => createResultPage(result, total, res))    

    console.log(promise)

    if (promise.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let json = await promise.json();
        console.log(json)
      }
    // promise.then(res => res.json())
    // promise.then((res) => {
    //     console.log(res)
    //     createResultPage(result, total, res)
    // })
}


function createResultPage(userResult, total, isRecord){
    debugger
    const resultPage = document.querySelector('.result')

    const overflow = document.createElement('div')
    overflow.classList.add('overflow')
    const result = document.createElement('div')
    result.classList.add('result')
    const header = document.createElement('h2')
    header.textContent = `Вы ответили на ${userResult} вопроса из ${total}.`
    const text = document.createElement('p')


    if(isRecord){
        text.textContent = `Поздравляем! Это Ваш новый рекорд!`
    }else{
        text.textContent = `Увы, Вы не смогли превзойти Ваш предыдущий резульат`
    }

    const btn = document.createElement('button')
    btn.textContent = 'Продолжить'
    btn.addEventListener('click',()=>{
        location.hash = "#chooseQuiz"
        resultPage.innerHTML = ''
    })

    resultPage.appendChild(overflow)
    result.appendChild(header)
    result.appendChild(header)
    result.appendChild(btn)
    resultPage.appendChild(result)
}


// Вы ответили на 3 вопроса из 4. 

// Поздравляем! Это Ваш новый рекорд!

// Увы, Вы не смогли превзойти Ваш предыдущий резульат