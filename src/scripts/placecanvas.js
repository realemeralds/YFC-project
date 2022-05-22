window.addEventListener("load", () => {
  const canvas = document.querySelectorAll("canvas")[1]
  const canvas2 = document.querySelectorAll("canvas")[0]
  const ctx = canvas.getContext("2d");
  const ctx2 = canvas2.getContext("2d");
  var breakButton = document.querySelectorAll("button")[0]
  var cancelButton = document.querySelectorAll("button")[1]

  const size = 502;
  const pixelSize = 10;
  var image = new Image();
  image.src = '../assets/pixilpng.png';
  canvas.width = size;
  canvas.height = size;
  canvas2.width = size;
  canvas2.height = size;
  var mouseOnCanvas = false;
  breakButton.disabled = true
  cancelButton.disabled = true

  var clearRectArray = JSON.parse(localStorage.getItem('clearRectArray'))
  console.log(clearRectArray)
  clearRectArray ? () => {} : clearRectArray = []

  // var clearRectArray = []

  // Create a grey box when mousing over boxes
  // @param x: center x-coord of pixel
  // @param y: center y-coord of pixel
  var mouseoverElement = (x, y) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white'
    ctx.fillRect(1, 1, 501, 501); 
    // Create a grey background
    ctx.fillStyle = "#F0F0F0";
    ctx.fillRect(x, y, pixelSize, pixelSize);
    // Create spots where image is revealed
    if (clearRectArray) {
      for (let i = 0; i < clearRectArray.length; i++) {
        clearRectCoords = clearRectArray[i]
        ctx.clearRect(clearRectCoords[0], clearRectCoords[1], 10, 10)
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + 3, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + 3);
    ctx.moveTo(x, y + 7);
    ctx.lineTo(x, y + 10);
    ctx.lineTo(x + 3, y + 10);
    ctx.moveTo(x + 7, y + 10);
    ctx.lineTo(x + 10, y + 10);
    ctx.lineTo(x + 10, y + 7);
    ctx.moveTo(x + 10, y + 3);
    ctx.lineTo(x + 10, y);
    ctx.lineTo(x + 7, y);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1
    ctx.stroke();
  };

  // create a red box after clicking on one
  var selectElement = (x, y) => {
    // Create a border of 1 px, length 2 px
    ctx.beginPath();
    ctx.moveTo(x + 3, y - 1);
    ctx.lineTo(x - 1, y - 1);
    ctx.lineTo(x - 1, y + 3);
    ctx.moveTo(x - 1, y + 7);
    ctx.lineTo(x - 1, y + 11);
    ctx.lineTo(x + 3, y + 11);
    ctx.moveTo(x + 7, y + 11);
    ctx.lineTo(x + 11, y + 11);
    ctx.lineTo(x + 11, y + 7);
    ctx.moveTo(x + 11, y + 3);
    ctx.lineTo(x + 11, y - 1);
    ctx.lineTo(x + 7, y - 1);
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.lineWidth = 1
    ctx.stroke();
  };

  var pos = {
    x: undefined,
    y: undefined
  };
  var overlaypos = { 
    x: undefined,
    y: undefined
  }
  var selectpos = { 
    x: undefined,
    y: undefined
  }
  
  // Set offsets, change upon resize
  window.xOffset = (window.innerWidth - size) / 2;
  window.yOffset = (window.innerHeight - size) / 2;
  window.addEventListener("resize", () => {
    window.xOffset = (window.innerWidth - size) / 2;
    window.yOffset = (window.innerHeight - size) / 2 + 30;
  });


  // Change upon mouseover
  window.addEventListener("mousemove", (e) => {
    if (
      window.xOffset < e.x &&
      e.x < window.xOffset + size - 2 &&
      window.yOffset < e.y &&
      e.y < window.yOffset + size - 2
    ) {
      pos.x = e.x - window.xOffset;
      pos.y = e.y - window.yOffset;
      overlaypos.x = pos.x - (pos.x % 10) + 1;
      overlaypos.y = pos.y - (pos.y % 10) + 1;
      mouseOnCanvas = true
      // console.log(overlaypos)
    } else {
      pos.x = undefined;
      pos.y = undefined;
      overlaypos.x = undefined;
      overlaypos.y = undefined;
      mouseOnCanvas = false;
    }
    mouseoverElement(overlaypos.x, overlaypos.y);
    selectElement(selectpos.x, selectpos.y)
  });

  // Set upon click
  window.addEventListener("mousedown", () => {
      if (mouseOnCanvas) {
        selectpos.x = overlaypos.x
        selectpos.y = overlaypos.y
        breakButton.disabled = false
        cancelButton.disabled = false
      }
  })

  // Paint a white background
  ctx2.fillStyle = 'white'
  ctx2.drawImage(image, 1, 1, 501, 501);
  ctx.fillStyle = 'white'
  ctx.fillRect(1, 1, 501, 501)

  breakButton.addEventListener("click", () => {
    clearRectArray.push([selectpos.x, selectpos.y])
    ctx.clearRect(selectpos.x, selectpos.y, 10, 10)
    localStorage.setItem('clearRectArray', JSON.stringify(clearRectArray))
    console.log(localStorage.getItem('clearRectArray'))
    selectpos.x = undefined
    selectpos.y = undefined
    breakButton.disabled = true
    cancelButton.disabled = true
  })
  cancelButton.addEventListener("click", () => {
    selectpos.x = undefined
    selectpos.y = undefined
  })
});
