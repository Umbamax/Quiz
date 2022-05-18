

export default function checkValidation(container){

    const carousel = container.querySelectorAll('.carousel__block')
    const mainData = container.querySelectorAll('.new-question')
    let isValid = true
    mainData.forEach((element,idx) => {

        if(checkBlock(element)){
            carousel[idx].classList.add('correct-data')
        }else{
            isValid = false
        }

    })
    const btn = document.querySelector('.send-new-quiz__ready-btn')
    if(isValid){
        btn.disabled = false
    }

        function checkBlock(block){
    
    
        const file = block.querySelector('input[type="file"]')
        const text = block.querySelector('input[type="text"]').value
        const reader = new FileReader()
    
        if(!isFill(text)){
            return false
        }

        if(file.files.length === 0){
            return false
        }

        return true
        }


   

}