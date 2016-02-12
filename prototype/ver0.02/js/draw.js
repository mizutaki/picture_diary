var canvas;
window.addEventListener('load', function() {
  canvas = new fabric.Canvas('myCanvas');
  canvas.isDrawingMode = true;
  var color = document.getElementById('t1');
  canvas.freeDrawingBrush.color = color.style.backgroundColor;
  
  document.getElementById('deleteAll').addEventListener('click', function() {
    canvas.clear().renderAll();
  },false);

  document.getElementById('canvas').addEventListener('mouseover', function() {
    var color = document.getElementById('t1');
    canvas.freeDrawingBrush.color = color.style.backgroundColor;
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