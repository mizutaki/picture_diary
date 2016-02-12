window.addEventListener('keydown', textarea);

//textareaに入力された文章をpタグに縦書きで反映します
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