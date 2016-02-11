var drawFlag = false;
var oldX = 0;
var oldY = 0;
var observer;
window.addEventListener('load', function(){
  var can = document.getElementById('myCanvas');
  can.addEventListener('mousemove', draw, true);
  can.addEventListener('mousedown', function(e){
    drawFlag = true;
    oldX = e.clientX;
    oldY = e.clientY;
  }, false);
  can.addEventListener('mouseup', function(){
    drawFlag = false;
  }, false);
  monitor();
}, true);

//window.addEventListener('onkeyup', textarea);
window.addEventListener('keydown', textarea);

//canvas内のDOMが変更されたか監視する
function monitor() {
  var target = document.getElementById('canvas');
  observer = new MutationObserver(init);
  var config = {
    childList: true
  };
  observer.observe(target, config);
}

//Canvasエレメントの作成
//全削除後の呼ばれる
function createCanvasElment() {
  console.log('antena');
  var myCanvas = document.createElement('canvas');
  myCanvas.setAttribute('id','myCanvas');
  myCanvas.setAttribute('width','640');
  myCanvas.setAttribute('height','480');
  var can = document.getElementById('canvas');
  can.appendChild(myCanvas);
}

//canvasオブジェクト初期化作成
function init() {
  createCanvasElment();
  var can = document.getElementById('myCanvas');
  can.addEventListener('mousemove', draw, true);
  can.addEventListener('mousedown', function(e){
    drawFlag = true;
    oldX = e.clientX;
    oldY = e.clientY;
  }, false);
  can.addEventListener('mouseup', function(){
    drawFlag = false;
  }, false);
  observer.disconnect();
  monitor();
}

var context;
//描画処理
function draw(e) {
	if (!drawFlag) return;
	var x = e.clientX;
  var y = e.clientY;
  var can = document.getElementById('myCanvas');
  context = can.getContext('2d');
  context.fillStyle = "rgba(255,0,0,1)";
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(oldX, oldY);
  context.lineTo(x,y);
  context.stroke();
  context.closePath();
  oldX = x;
  oldY = y;
}

//保存処理
function saveData() {
  var can = document.getElementById('myCanvas');
  var d = can.toDataURL('image/png');
  d = d.replace('image/png', 'image/octet-strem');
  window.open(d, 'save');
}

//描画全削除
function allClear() {
  var can = document.getElementById('myCanvas');
  can.parentNode.removeChild(can);
}

function textarea() {
  var text = document.getElementById('textarea');
  //console.log(text.value);
  var p = document.getElementById('text');
  var sentences = text.value.split(/\r\n|\r|\n/);
  console.log(sentences);
  var textValue = "";
  for (var i = 0; i < sentences.length; i++) {
    console.log(sentences[i]);
    /*if (sentences.toString().match(/\S/g) || typeof sentences[i] === "undefined") {
      continue;
    }*/
    var sentence = sentences[i] + "<br>";
    textValue += sentence;
  }
  p.innerHTML = textValue;
}