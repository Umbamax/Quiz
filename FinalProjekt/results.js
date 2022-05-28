export default function results(username, quizName, result){

    const body = {
        'username': username,
        'quizName': quizName,
        'result': result,
    }

    fetch("http://localhost:3000/api/quizes",{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then((res) => console.log(res))
}