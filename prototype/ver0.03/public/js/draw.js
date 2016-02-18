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
  var target = document.getElementById('pictureDiary');
  html2canvas(target, {
    onrendered: function(canvas) {
      var dataURL = canvas.toDataURL('image/png');
      // Decode the dataURL
      var binary = atob(dataURL.split(',')[1]);
      // Create 8-bit unsigned array
      var array = [];
      for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      // Return our Blob object
      var blob = new Blob([new Uint8Array(array)], {type: 'image/png'});
      var fd = new FormData();
      fd.append("image", blob);
      $.ajax({
        url: "/save",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
      });
    },
    width:650,
    heigth:1150
  });
}

function downloadDiary(id) {
  $.ajax({
    url: "/download",
    type: "GET",
    data: {
      id: id
    },
    success: function(redirectUrl){
      location.href = redirectUrl;
    },
    error: function() {
      alert('it failed to download');
    }
  });
}

function deleteDiary(id) {
  $.ajax({
    url: "/delete",
    type: "POST",
    data: {
      id: id
    }
  });
}