/*
 *     SETTINGS 
 */
/*Set String */
var str = "You are a slave. Like everyone else, you were born into bondage, born into a prison that you cannot smell or taste or touch. A prison...for your mind....Unfortunatly, no one can be..._told_ what the Matrix is...you have to see it for yourself.";
/* Set Array */
var arr = [1, 2, 3, 4, 5, 6, 7, 8];
/* 
 * Set object to iterate through
 * In this case choose arr or str
 */
var obj = str;
/* 
 * Set direction
 *  - 'h'= horizontal, 'v' = vertical
 */
var direction = 'h';
/*  
 * Set delay for outputing characters
 *   - 0 is ignored and will use default
 */
var delay = 0;
/*
 * END SETTINGS *
 */


/* Initializer */
function init() {
  /* 
   *      VARS
   */
  /* 
   * Type of element to create 
   *   - String representation
   */
  var el = 'p';
  /* 
   * Set Timeout Interval
   *   - If delay is number and > 0 use it
   *   - Defaults: 1s for vert; 150ms for horz
   */
  var dly = (typeof delay === 'number' && delay <= 0) ? ((direction === 'v') ?  1000 : 150) : delay;
  /* If obj is a string then convert to character array */
  var newObj = [];
  /* Create element */
  var elmt = document.createElement(el);
  /***   END VARS   ***/
  /*
   *     FUNCTIONS
   */
  /* Split string into character array */
  function splitStr(s){ 
  s.split('');
  return s;
  }
  /* Write text inside <p> tag */
  function writeIt(ele, object, index, dir) {
    /* If vertical then add a <br /> */
    ele.innerHTML += object[index];
    if (dir === 'v') {
      ele.innerHTML += '<br />';
    }else{ return; }
  }
  /***   END FUNCTIONS   ***/
  /* Convert obj to character array if string */
  newObj = (Array.isArray(obj)) ? obj : splitStr(obj);
  /* Attach class to element */
   elmt.className += 'chardelay';
  /* Attach <p> tag to document */
  document.body.appendChild(elmt);
  /* Loop through Array */
  for (var i = 0; i < newObj.length; i++) {
  /* Anonymous IIFE passing vars i, newObj and time */
    (function(e, o, x, d){
      /* Invoke delay */
      setTimeout(function(){
        /* Call write function */
        writeIt(e, o, x, d);
      },x * dly); /* multiply to keep consistant interval on each loop*/
    })(elmt, newObj, i,  direction);
  }
}
/* Start */
init();