window.addEventListener("DOMContentLoaded", () => {
  leftOffsetArray = ["2rem", "257.212px", "414.912px", "552.712px"];
  rightOffsetArray = ["669.087px", "511.387px", "373.587px", "2rem"];
  line = document.getElementById("animatedline");
  parent = document.getElementById("#parent");
  fromIndex = 0;

  // Buttons
  button1 = document.querySelectorAll("button")[0];
  button2 = document.querySelectorAll("button")[1];
  button3 = document.querySelectorAll("button")[2];
  button4 = document.querySelectorAll("button")[3];

  // Content
  firstContent = document.getElementById("firstContent");
  secondContent = document.getElementById("secondContent");
  thirdContent = document.getElementById("thirdContent");
  fourthContent = document.getElementById("fourthContent");

  // Default is first element
  line.style.left = leftOffsetArray[0];
  line.style.right = rightOffsetArray[0];

  var currentElement = firstContent;
  window.currentElementYDisplacement = ["0", "-384px", "-768px", "-1152px"];
  window.halfWindow = window.innerWidth / 2;

  window.addEventListener("resize", () => {
    window.halfWindow = window.innerWidth / 2;
  });

  function moveOut(element, index) {
    var translateWidth = window.halfWindow + 600;
    element.style.transform = `translateX(${translateWidth}px) translateY(${window.currentElementYDisplacement[index]})`;
  }

  function moveIn(element, index) {
    var negativeTranslateWidth = String((window.halfWindow + 600) * -1) + "px";
    // go to start
    element.classList.remove("transition");
    element.style.transform = `translateX(${negativeTranslateWidth}) translateY(${window.currentElementYDisplacement[index]})`;
    // start transition
    setTimeout(() =>
      // have sliding animation
      {
        element.classList.add("transition");
        // set end position
        element.style.transform = `translateY(${window.currentElementYDisplacement[index]})`;
      }, 10);
  }

  // Function to disable switching for a bit
  var switchingDisabled = false;
  const disabledDuration = 600;

  function disableSwitching() {
    switchingDisabled = true;
    console.log("Switching disabled");
    setTimeout(() => {
      switchingDisabled = false;
      console.log("Switching re-enabled");
    }, disabledDuration);
  }

  // Button click events
  button1.addEventListener("click", () => {
    if (fromIndex === 0 || switchingDisabled) {
      return;
    }
    line.classList.add("first-active");
    line.classList.remove("second-active");
    line.classList.remove("third-active");
    line.classList.remove("fourth-active");
    line.classList.remove("line-transition-right");
    line.classList.add("line-transition-left");
    line.style.left = leftOffsetArray[0];
    line.style.right = rightOffsetArray[0];
    moveOut(currentElement, fromIndex);
    moveIn(firstContent, 0);
    fromIndex = 0;
    currentElement = firstContent;
    disableSwitching();
  });

  button2.addEventListener("click", () => {
    if (fromIndex === 1 || switchingDisabled) {
      return;
    }
    line.classList.remove("first-active");
    line.classList.add("second-active");
    line.classList.remove("third-active");
    line.classList.remove("fourth-active");
    line.classList.remove("line-transition-right");
    line.classList.remove("line-transition-left");
    if (fromIndex < 1) {
      line.classList.add("line-transition-right");
    } else {
      line.classList.add("line-transition-left");
    }
    line.style.left = leftOffsetArray[1];
    line.style.right = rightOffsetArray[1];
    moveOut(currentElement, fromIndex);
    moveIn(secondContent, 1);
    fromIndex = 1;
    currentElement = secondContent;
    disableSwitching();
  });

  button3.addEventListener("click", () => {
    if (fromIndex === 2 || switchingDisabled) {
      return;
    }
    line.classList.remove("first-active");
    line.classList.remove("second-active");
    line.classList.add("third-active");
    line.classList.remove("fourth-active");
    line.classList.remove("line-transition-right");
    line.classList.remove("line-transition-left");
    if (fromIndex < 2) {
      line.classList.add("line-transition-right");
    } else {
      line.classList.add("line-transition-left");
    }
    line.style.left = leftOffsetArray[2];
    line.style.right = rightOffsetArray[2];
    moveOut(currentElement, fromIndex);
    moveIn(thirdContent, 2);
    // disableSwitching();
    fromIndex = 2;
    currentElement = thirdContent;
    disableSwitching();
  });

  button4.addEventListener("click", () => {
    if (fromIndex === 3 || switchingDisabled) {
      return;
    }
    line.classList.remove("first-active");
    line.classList.remove("second-active");
    line.classList.remove("third-active");
    line.classList.add("fourth-active");
    line.classList.remove("line-transition-left");
    line.classList.add("line-transition-right");
    line.style.left = leftOffsetArray[3];
    line.style.right = rightOffsetArray[3];
    moveOut(currentElement, fromIndex);
    moveIn(fourthContent, 3);
    // disableSwitching();
    fromIndex = 3;
    currentElement = fourthContent;
    disableSwitching();
  });
});
