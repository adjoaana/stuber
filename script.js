document.addEventListener('DOMContentLoaded', () => {
    const headertoggle = document.querySelector(".header__toggle")
    const header = document.querySelector(".header");
    const open = document.querySelector(".open");
    const overlay = document.querySelector(".overlay");
    const fadeElems = document.querySelectorAll(".has-fade");

    headertoggle.addEventListener('click', function () {
        if (header.classList.contains("open")) {
            header.classList.remove("open");
            fadeElems.forEach(function (element) {
                element.classList.add("fade-out");
                element.classList.remove("fade-in");
            })

        } else {
            header.classList.add("open");
            fadeElems.forEach(function (element) {
                element.classList.add("fade-in");
                element.classList.remove("fade-out");
            })
        }
    })
})

 
const slider = document.querySelector('.slider'),
    slides = Array.from(document.querySelectorAll('.slider__item'));

 
    let isDragging = false,
        startPos = 0,
        currentTranslate = 0,
        PrevTranslate = 0,
        animationID = 0,
        currentIndex = 0;
    
slides.forEach((slide,index)=> {
    const slideImage = slide.querySelector('img')
    slideImage.addEventListener('dragstart',(e)=> 
    e.preventDefault())


    //Touch events
    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)

    //Mouse events
    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mouseleave', touchEnd)
    slide.addEventListener('mousemove', touchMove)
});

//disable right click menu
window.oncontextmenu = function(e){
    e.preventDefault()
    e.stopPropagation()
    return false
}
function touchStart(index){
    return function (event){
        currentIndex = index
        startPos = getPositionX(event)
        console.log(startPos)
        isDragging = true


        animationID = requestAnimationFrame(animation)
    }
}

function touchEnd(){
    isDragging = false
    console.log('end')
}
function touchMove(event){
    if (isDragging) {
       const currentPosition = getPositionX(event)
       currentTranslate = PrevTranslate + currentPosition - startPos
    }
}

function getPositionX(event){
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}
function animation(){
   setSliderPosition()
    if (isDragging) requestAnimationFrame(animation)
        
    
}
function setSliderPosition(){
    slider.getElementsByClassName.transform = `translateX(${currentTranslate}px)`
}