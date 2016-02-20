var sentenceContext;
window.addEventListener('load', function() {
  var sentenceCanvas = document.getElementById('sentenceCanvas');
  sentenceContext = sentenceCanvas.getContext('2d');
  sentenceContext.font = "25px 'ＭＳ Ｐゴシック'";

  var datetimePicker = document.getElementById('datetimepicker');
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  datetimePicker.value = year + "." + month + "." + day;
});

//textareaに入力された文章をpタグに縦書きで反映します
function paste() {
  var text = document.getElementById('textarea');
  var datetimePicker = document.getElementById('datetimepicker');
  var sentence = datetimepicker.value + '\n';
  sentence += text.value;
  writeVartical(sentenceContext,sentence,600,40);
}

function writeVartical(context, sentence, x, y) {
  var sentenceList = sentence.split('\n');
  var lineHeight = context.measureText("あ").width;
  sentenceList.forEach(function(elm, i) {
    Array.prototype.forEach.call(elm, function(ch, j) {
      context.fillText(ch, x-lineHeight*i, y+lineHeight*j);
    });
  });
}