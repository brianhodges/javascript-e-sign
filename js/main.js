var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var mousedown = false;

ctx.strokeStyle = '#000000';
ctx.lineWidth = 5;
canvas.onmousedown = function(e) {
    var pos = fixPosition(e, canvas);
    mousedown = true;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    return false;
};

canvas.onmousemove = function(e) {
    var pos = fixPosition(e, canvas);
    if (mousedown) {
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }
};

canvas.onmouseup = function() {
    mousedown = false;
};

function fixPosition(e, gCanvasElement) {
    var x, y;
    if (e.pageX || e.pageY) { 
      x = e.pageX;
      y = e.pageY;
    } else { 
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    } 
    x -= gCanvasElement.offsetLeft;
    y -= gCanvasElement.offsetTop;
    return {x: x, y:y};
}

function erase() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function save() {
    if (!isCanvasBlank(canvas)) {
        var imgData = canvas.toDataURL();
        console.log(imgData);
    }
}

function isCanvasBlank(canvas) {
    var blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;
    return canvas.toDataURL() == blank.toDataURL();
}