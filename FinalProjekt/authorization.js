const enterUser = document.getElementById("enterUser");
const authLogin = document.getElementById("auth_login");
const authPass = document.getElementById("auth_pass");

enterUser.addEventListener("click", (e) => {
  e.preventDefault();
  const login = authLogin.value;
  const password = authPass.value;

  fetch(`http://localhost:3000/api/users/${login}&${password}`)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return res;
      } else {
        let error = new Error(res.statusText);
        error.response = res;
        throw error;
      }
    })
    .then((res) => res.text())
    .then((res) => {
      sessionStorage.setItem("user", res);
      location.hash = "#chooseQuiz"
    })
    .catch(() => {
        erorAuth.innerHTML = 'Неверный логин или пароль'
        erorAuth.style.visibility = "visible"
        setTimeout(()=>{erorAuth.style.visibility = "hidden"}, 2000)
    });
});


