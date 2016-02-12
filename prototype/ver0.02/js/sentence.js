var sentenceCanvas;
var sentenceContext;
window.addEventListener('load', function() {
  //document.getElementById('textarea').addEventListener('keydown', textarea);
  sentenceCanvas = document.getElementById('sentenceCanvas');
  sentenceContext = sentenceCanvas.getContext('2d');
  sentenceContext.font = "25px 'ＭＳ Ｐゴシック'";
});

//textareaに入力された文章をpタグに縦書きで反映します
function paste() {
  console.log('aaaaaaaa');
  var text = document.getElementById('textarea');
  var sentence = text.value;
  console.log(sentence);
  writeVartical(sentenceContext,sentence,600,40);
}

function writeVartical(context, sentence, x, y) {
  var sentenceList = sentence.split('\n');
  var lineHeight = context.measureText("あ").width;
  sentenceList.forEach(function(elm, i) {
    console.log(i);
    Array.prototype.forEach.call(elm, function(ch, j) {
      context.fillText(ch, x-lineHeight*i, y+lineHeight*j);
    });
  });
}