window.addEventListener("load", () => {
  // Get elements
  const canvas = document.querySelectorAll("canvas")[1];
  const canvas2 = document.querySelectorAll("canvas")[0];
  const ctx = canvas.getContext("2d");
  const ctx2 = canvas2.getContext("2d");
  var breakButton = document.querySelectorAll("button")[0];
  var cancelButton = document.querySelectorAll("button")[1];

  // define stuff
  const size = 502;
  const pixelSize = 10;
  var image = new Image();
  image.src = "../assets/placeholderCanvas.jpg"
  canvas.width = size;
  canvas.height = size;
  canvas2.width = size;
  canvas2.height = size;
  var mouseOnCanvas = false;
  breakButton.disabled = true;
  cancelButton.disabled = true;

  // Mouse position
  var pos = {
    x: undefined,
    y: undefined,
  };
  // Overlay square position
  var overlaypos = {
    x: undefined,
    y: undefined,
  };
  // selected square position
  var selectpos = {
    x: undefined,
    y: undefined,
  };

  // Get the stored values of clearRects.
  var clearRectArray = JSON.parse(localStorage.getItem("clearRectArray"));
  console.log(clearRectArray);
  clearRectArray ? () => {} : (clearRectArray = []);

  // Create a grey box when mousing over boxes
  // @param x: center x-coord of pixel
  // @param y: center y-coord of pixel
  const mouseoverElement = (x, y) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(1, 1, 501, 501);
    // Create a grey background
    ctx.fillStyle = "#F0F0F0";
    ctx.fillRect(x, y, pixelSize, pixelSize);
    // Create spots where image is revealed
    if (clearRectArray) {
      for (let i = 0; i < clearRectArray.length; i++) {
        clearRectCoords = clearRectArray[i];
        ctx.clearRect(clearRectCoords[0], clearRectCoords[1], 10, 10);
      }
    }
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
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  // create a red box after clicking on one
  const selectElement = (x, y) => {
    // Create a border of 1 px, length 2 px
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
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  // Set offsets, change upon resize
  window.xOffset = (window.innerWidth - size) / 2;
  window.yOffset = (window.innerHeight - size) / 2;
  window.addEventListener("resize", () => {
    window.xOffset = (window.innerWidth - size) / 2;
    window.yOffset = (window.innerHeight - size) / 2 + 30;
  });


  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width, // relationship bitmap vs. element for x
      scaleY = canvas.height / rect.height; // relationship bitmap vs. element for y

    return {
      x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY, // been adjusted to be relative to element
    };
  }

  // Change upon mouseover
  window.addEventListener("mousemove", (e) => {
    const {x, y} = getMousePos(canvas, e)

    if (0 < x && x < canvas.width && 0 < y && y < canvas.height) {
      pos.x = x;
      pos.y = y;
      overlaypos.x = pos.x - (pos.x % 10) + 1; // +1 to compensate for padding
      overlaypos.y = pos.y - (pos.y % 10) + 1;
      mouseOnCanvas = true;
      console.log(pos, overlaypos); // TODO: remove
    } else {
      pos.x = undefined;
      pos.y = undefined;
      overlaypos.x = undefined;
      overlaypos.y = undefined;
      mouseOnCanvas = false;
    }
    mouseoverElement(overlaypos.x, overlaypos.y);
    selectElement(selectpos.x, selectpos.y);
  });

  // Set upon click
  window.addEventListener("mousedown", () => {
    if (mouseOnCanvas) {
      selectpos.x = overlaypos.x;
      selectpos.y = overlaypos.y;
      breakButton.disabled = false;
      cancelButton.disabled = false;
    }
  });

  // Paint a white background
  ctx2.fillStyle = "white";
  ctx2.drawImage(image, 1, 1, 500, 500);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 502, 502);

  breakButton.addEventListener("click", () => {
    clearRectArray.push([selectpos.x, selectpos.y]);
    ctx.clearRect(selectpos.x, selectpos.y, 10, 10);
    localStorage.setItem("clearRectArray", JSON.stringify(clearRectArray));
    console.log(localStorage.getItem("clearRectArray"));
    selectpos.x = undefined;
    selectpos.y = undefined;
    breakButton.disabled = true;
    cancelButton.disabled = true;
  });
  cancelButton.addEventListener("click", () => {
    selectpos.x = undefined;
    selectpos.y = undefined;
  });
});
