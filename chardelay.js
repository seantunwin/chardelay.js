var str = "Hello. I am creating a typing effect."
/* Set Array */
var arr = [1,2,3,4,5,6,7,8];
/* Create <p> element */
var el = document.createElement('p');
/* Write text inside <p> tag */
function writeIt(dir, obj,index) {
  /* If vertical then add a <br /> */
  el.innerHTML += obj[index];
  if (dir === 'v') {
    el.innerHTML += '<br />';
  }else{ return; }
}
/* Split string into character array */
function splitStr(s){
  s.split('');
  return s;
}
/* Initializer */
function init() {
  /* Set object to iterate through
   * In this case choose arr or str
   */
  var obj = str;
  /* Set direction ('h'= horizontal, 'v' = vertical */
  var direction = 'h';
  /* Set Timeout Interval 
   * Lower number for horizontal (faster)
   */
  var time = (direction === 'v') ?  1000 : 150;
  /* If obj is a string then convert to character array */
  var newObj = (Array.isArray(obj)) ? obj : splitStr(obj);
  /* Attach <p> tag to document */
  document.body.appendChild(el);
  /* Loop through Array */
  for (var i = 0; i < newObj.length; i++) {
  /* Anonymous IIFE passing vars i, newObj and time */
    (function(x, o, t){
      /* Invoke delay */
      setTimeout(function(){
        /* Call write function */
        writeIt('h',o,x);
      },x * time); /* multiply to keep consistant interval on each loop*/
    })(i, newObj, time);
  }
}
/* Start */
init();