window.addEventListener("DOMContentLoaded", () => {
    leftOffsetArray = ['2rem', '257.212px', '414.912px', '552.712px']
    rightOffsetArray = ['669.087px', '511.387px', '373.587px', '2rem']
    line = document.getElementById("animatedline")
    parent = document.getElementById("#parent")
    fromIndex = 0
   
    // Buttons
    button1 = document.querySelectorAll('button')[0] 
    button2 = document.querySelectorAll('button')[1]
    button3 = document.querySelectorAll('button')[2]
    button4 = document.querySelectorAll('button')[3]
   
    // Content
    firstContent = document.getElementById('firstContent')
    secondContent = document.getElementById('secondContent')
    thirdContent = document.getElementById('thirdContent')
    fourthContent = document.getElementById('fourthContent')

    // Default is first element
    line.style.left = leftOffsetArray[0]
    line.style.right = rightOffsetArray[0] 

    // ??
    var currentElement = firstContent
    window.currentElementYDisplacement = ["0", "-384px", "-768px", "-1152px"]
    window.halfWindow = window.innerWidth / 2
    var movingOutArray = []
    var animationDuration = 1600 // in ms

    window.addEventListener('resize', () => {
        window.halfWindow = window.innerWidth / 2
    })

    function moveOut(element, index) {
        var translateWidth = window.halfWindow + 600
        element.style.transform = `translateX(${translateWidth}px) translateY(${window.currentElementYDisplacement[index]})`
    //     movingOutArray.push(element)
    //     console.log(element)
    //     console.log(movingOutArray)
    //     localStorage.setItem('movingOutArray', `${movingOutArray}`)
    //     setTimeout(movingOutArray.shift(), 1600)
    }

    function moveIn(element, index) {
        var negativeTranslateWidth = String((window.halfWindow + 600) * -1) + "px"
        // var theArray = localStorage.getItem('movingOutArray');
        // console.log(theArray)
        // for (let i = 0; i < theArray.length; i++) {
        //     element = theArray[i]
        //     console.log
        //     if (!element) {
        //         continue;
        //     }
        //     element.style.opacity = "0.0"
        // }

        element.classList.remove('transition')
        element.style.transform = `translateX(${negativeTranslateWidth}) translateY(${window.currentElementYDisplacement[index]})`
        setTimeout(() => 
        {element.classList.add('transition')
        element.style.transform = `translateY(${window.currentElementYDisplacement[index]})`}
        , 10)
        
    }
    
    // Button click events
    button1.addEventListener('click', () => {
        if (fromIndex === 0) {
            return 
        }
        line.classList.add("first-active")
        line.classList.remove("second-active")
        line.classList.remove("third-active")
        line.classList.remove("fourth-active")
        line.classList.remove("transition-right")
        line.classList.add("transition-left")
        line.style.left = leftOffsetArray[0] 
        line.style.right = rightOffsetArray[0]   
        moveOut(currentElement, fromIndex)
        moveIn(firstContent, 0)
        fromIndex = 0
        currentElement = firstContent
    })

    button2.addEventListener('click', () => {
        if (fromIndex === 1) {
            return 
        }
        line.classList.add("second-active")
        line.classList.remove("first-active")
        line.classList.remove("third-active")
        line.classList.remove("fourth-active")
        line.classList.remove("transition-right")
        line.classList.remove("transition-left")
        if (fromIndex < 1) {
            line.classList.add("transition-right")
        } else {
            line.classList.add("transition-left")
        }
        line.style.left = leftOffsetArray[1] 
        line.style.right = rightOffsetArray[1]
        moveOut(currentElement, fromIndex)
        moveIn(secondContent, 1)
        fromIndex = 1
        currentElement = secondContent
    })

    button3.addEventListener('click', () => {
        if (fromIndex === 2) {
            return 
        }
        line.classList.add("third-active")
        line.classList.remove("first-active")
        line.classList.remove("second-active")
        line.classList.remove("fourth-active")
        line.classList.remove("transition-right")
        line.classList.remove("transition-left")
        if (fromIndex < 2) {
            line.classList.add("transition-right")
        } else {
            line.classList.add("transition-left")
        }
        line.style.left = leftOffsetArray[2] 
        line.style.right = rightOffsetArray[2]
        moveOut(currentElement, fromIndex)
        moveIn(thirdContent, 2)
        fromIndex = 2
        currentElement = thirdContent
    })

    button4.addEventListener('click', () => {
        if (fromIndex === 3) {
            return 
        }
        line.classList.add("fourth-active")
        line.classList.remove("first-active")
        line.classList.remove("second-active")
        line.classList.remove("third-active")
        if (fromIndex < 3) {
            line.classList.add("transition-right")
        } else {
            line.classList.add("transition-left")
        }
        line.style.left = leftOffsetArray[3] 
        line.style.right = rightOffsetArray[3]
        moveOut(currentElement, fromIndex)
        moveIn(fourthContent, 3)
        fromIndex = 3
        currentElement = fourthContent
    })
})