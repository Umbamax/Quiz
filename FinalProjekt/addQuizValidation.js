export default function checkValidation(container) {
  const carousel = container.querySelectorAll(".carousel__block");
  const mainData = container.querySelectorAll(".new-question");
  let isValid = true;
  mainData.forEach((element, idx) => {
    if (checkBlock(element)) {
      carousel[idx].classList.add("correct-data");
    } else {
      isValid = false;
    }
  });
  const btn = document.querySelector(".send-new-quiz__ready-btn");
  if (isValid) {
    btn.disabled = false;
  }

  function checkBlock(block) {
    const wrongAnswersContainer = block.querySelector(".wrong-answers-container");
    
    if (!!wrongAnswersContainer) {
      let valid = true;
      const inputs = wrongAnswersContainer.querySelectorAll('input[type="text"]');
      console.log(inputs)
      inputs.forEach((el) => {
          
        if (!isFill(el.value)) {
          valid = false;
        }
      })
    


      if (!valid) {
        return false
      }
    }
    const file = block.querySelector('input[type="file"]');
    const text = block.querySelector('input[type="text"]').value;
    const reader = new FileReader();

    if (!isFill(text)) {
      return false;
    }

    if (file.files.length === 0) {
      return false;
    }

    return true;
  }
}
