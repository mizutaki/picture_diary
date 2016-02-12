var canvas;
window.addEventListener('load', function() {
  canvas = new fabric.Canvas('myCanvas');
  canvas.isDrawingMode = true;
  var color = document.getElementById('color');
  canvas.freeDrawingBrush.color = '#' + color.value;
  

  document.getElementById('deleteAll').addEventListener('click', function() {
    canvas.clear().renderAll();
  },false);

  document.getElementById('color').addEventListener('change', function() {
    canvas.freeDrawingBrush.color = '#' + this.value;  
  })
});

function modeChange() {
  var radio = document.getElementsByName('mode');
  if (radio[0].checked) {
    canvas.isDrawingMode = true;
  } else if (radio[1].checked) {
    canvas.isDrawingMode = false;
  }
}