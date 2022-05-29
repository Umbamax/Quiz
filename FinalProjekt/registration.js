const registrationForm = document.forms.sendUser;
const userName = document.getElementById("reg_name");
const userLogin = document.getElementById("reg_nickname");
const userEmail = document.getElementById("reg_email");
const password = document.getElementById("reg_pass");
const confirmPassword = document.getElementById("reg_conf-pass");
const registerUser = document.getElementById("registerUser");
const erorAuth = document.querySelector(".eror-authorization");
const regFormInputs = document.querySelectorAll("form[name = 'sendUser'] > div > input");

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

function isFill(str) {
  return str.trim().length > 0 ? true : false;
}

function isEmail(str) {
  str = str.split("@");

  if (str.length !== 2 || str[0].length === 0) {
    return false;
  }
  let secondMaiPart = str[1].split(".");
  if (secondMaiPart.length !== 2 || secondMaiPart[0].length === 0 || secondMaiPart[1].length === 0) {
    return false;
  }
  return true;
}

regFormInputs.forEach((el) => {
  el.addEventListener("blur", (event) => {
    if (!isFill(event.target.value)) {
      
      event.target.classList.add("eror");
      event.target.nextElementSibling.classList.add("visible");
      event.target.nextElementSibling.textContent = "Поле обязательно для ввода.";
    } else if (event.target.id === "reg_email" && !isEmail(event.target.value)) {
      event.target.classList.add("eror");
      event.target.nextElementSibling.classList.add("visible");
      event.target.nextElementSibling.textContent = "Введите email в формате ххх@xxx.xx";
    }

    if (!isPasswordsSame(confirmPassword.value, password.value) && !!confirmPassword.value) {
      confirmPassword.classList.add("eror");
      confirmPassword.nextElementSibling.classList.add("visible");
      confirmPassword.nextElementSibling.textContent = "Пароли не совпадают.";
    }
  });
});

regFormInputs.forEach((el) => {
  el.addEventListener("focus", (event) => {
    event.target.classList.remove("eror");
    event.target.nextElementSibling.classList.remove("visible");
  });
});

function isPasswordsSame(str1, str2) {
  return str1 === str2 ? true : false;
}

function chechAllNecessariInput(event) {
  let isValid = true;
  regFormInputs.forEach((el) => {
    if (!isFill(el.value)) {
      isValid = false;
      el.classList.add("eror");
      el.nextElementSibling.classList.add("visible");
      el.nextElementSibling.textContent = "Поле обязательно для ввода.";
    } else if (el.id === "reg_email" && !isEmail(el.value)) {
      isValid = false;
      el.classList.add("eror");
      el.nextElementSibling.classList.add("visible");
      el.nextElementSibling.textContent = "Введите email в формате ххх@xxx.xx";
    }

    if (!isPasswordsSame(confirmPassword.value, password.value) && !!confirmPassword.value) {
      isValid = false;
      confirmPassword.classList.add("eror");
      confirmPassword.nextElementSibling.classList.add("visible");
      confirmPassword.nextElementSibling.textContent = "Пароли не совпадают.";
    }
  });
  if (isValid) {
    let user = {};
    user.login = userLogin.value;
    user.email = userEmail.value;
    user.name = userName.value;
    user.password = password.value;

    fetch("http://localhost:3000/api/users", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.status === 409) {
        erorAuth.innerHTML = "Данный логин и/или email заняты";
        erorAuth.style.color = "white";
        erorAuth.style.visibility = "visible";
        erorAuth.style.backgroundColor = "rgb(211, 21, 21)";
        setTimeout(() => {
          erorAuth.style.visibility = "hidden";
        }, 2000);
      } else if (res.status >= 200 && res.status < 300) {

        document.forms.sendUser.reset();
        erorAuth.innerHTML = "Регистрация прошла успешно";
        erorAuth.style.color = "white";
        erorAuth.style.visibility = "visible";
        erorAuth.style.backgroundColor = "rgb(3, 179, 0)";
        setTimeout(() => {
          erorAuth.style.backgroundColor = "rgb(211, 21, 21)";
          erorAuth.style.visibility = "hidden";
        }, 2000);
      }
    }).catch(rej=>{
      erorAuth.innerHTML = "Сервер временно недоступен";
        erorAuth.style.visibility = "visible";
        erorAuth.style.backgroundColor = "rgb(211, 21, 21)";
        erorAuth.style.color = "white";
        setTimeout(() => {
          erorAuth.style.visibility = "hidden";
        }, 2000);
    })
  }
}

registerUser.addEventListener("click", chechAllNecessariInput);
