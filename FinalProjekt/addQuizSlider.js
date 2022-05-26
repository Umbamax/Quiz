
export default function createSlider(carousel, main, next,prev){

   
    let index = 0
    console.log(carousel)
    console.log(main)
    console.log(next)
    console.log(prev)

    const activeDot = n => {
    
      for (let block of carousel){
        block.classList.remove('active-block')
      }
      carousel[n].classList.add('active-block')
    }
    

    const activeInput = n => {
    
      for (let slide of main){
        slide.classList.remove('active')
      }
      main[n].classList.add('active')
    }
    

    const currentSlide = idx => {
        activeInput(idx)
      activeDot(idx)
      
    }
    

    const nextSlide =()=>{
      if(index == main.length - 1){
        index = 0;
        currentSlide(index)
        
      } else {
        index++
        currentSlide(index)
      }
    }
    
    
    const prevSlide =()=>{
      if(index == 0){
        index = main.length - 1
        currentSlide(index)
      } else {
        index--
        currentSlide(index)
      }
    }
  
    
    carousel.forEach((item, indexDot)=>{
      item.addEventListener('click', ()=>{
        index = indexDot
        currentSlide(index)
      })
    })
    
    
    next.addEventListener('click', nextSlide)
    prev.addEventListener('click', prevSlide)

    

}

// const dots = document.querySelectorAll(".carousel-block");
// const arrowLeft = document.querySelector('.arrow-left')
// const arrowRight = document.querySelector('.arrow-right')
// const slides = document.querySelectorAll('.slide')


