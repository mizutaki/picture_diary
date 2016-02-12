window.addEventListener('load', function() {
  document.getElementById('textarea').addEventListener('keydown', textarea);
});

//textareaに入力された文章をpタグに縦書きで反映します
function textarea() {
  var text = document.getElementById('textarea');
  var p = document.getElementById('text');
  var sentences = text.value.split(/\r\n|\r|\n/);
  var textValue = "";
  for (var i = 0; i < sentences.length; i++) {
    var sentence = sentences[i] + "<br>";
    textValue += sentence;
  }
  p.innerHTML = textValue;
}