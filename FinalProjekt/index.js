const chooseModeBtns = document.querySelectorAll(".mode_btn")
const authMode = document.querySelector(".authorization__authorization-forms")


chooseModeBtns.forEach(el => el.addEventListener("click", ()=>{
    if(el.classList.contains("authorization__registration-mode")){
        authMode.classList.add("active_registration")
    }else{
        authMode.classList.remove("active_registration")
    }
    chooseModeBtns.forEach(elem => elem.classList.remove("active_btn"))
    el.classList.add("active_btn")
}))


const logoutBtn = document.querySelector('.logout')
const homeBtn = document.querySelector('.home')

logoutBtn.addEventListener('click',()=>{
    location.hash = "#auth";
    sessionStorage.setItem('user','')
    
})
homeBtn.addEventListener('click',()=>{
    location.hash = "#chooseQuiz";
    
})