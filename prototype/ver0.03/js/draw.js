var picturecanvas;
window.addEventListener('load', function() {
  picturecanvas = new fabric.Canvas('imageCanvas');
  picturecanvas.isDrawingMode = true;
  var color = document.getElementById('t1');
  picturecanvas.freeDrawingBrush.color = color.style.backgroundColor;
  
  document.getElementById('deleteAll').addEventListener('click', function() {
    picturecanvas.clear().renderAll();
  },false);

  document.getElementById('imageBox').addEventListener('mouseover', function() {
    var color = document.getElementById('t1');
    picturecanvas.freeDrawingBrush.color = color.style.backgroundColor;
  })
});

function modeChange() {
  var radio = document.getElementsByName('mode');
  if (radio[0].checked) {
    picturecanvas.isDrawingMode = true;
  } else if (radio[1].checked) {
    picturecanvas.isDrawingMode = false;
  }
}

function save() {
  console.log('aaaaa');
  var target = document.getElementById('pictureDiary');
  console.log(target);
  html2canvas(target, {
    onrendered: function(canvas) {
      document.getElementById('download').href = canvas.toDataURL('image/png');
    },
    width:650,
    heigth:1150
  });
}