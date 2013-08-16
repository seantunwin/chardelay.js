/**
* chardelay.js - Delay the output of content in an HTML document
*
* @author: Sean T. Unwin
* @contact: <sean DOT t DOT unwin AT gmail DOT com> <https://twitter.com/seantunwin>
* @url: https://github.com/seantunwin/chardelay.js
*
**** USAGE ***
* var myVar = Chardelay(content, options);
* @content: String or Array
* @options:
*       @layout     : String (h OR v)
*       @delay      : Number (> 0)
*       @inEl       : String (Elements accepted: p OR span OR div)
*       @css        : String (CSS class name)
*       @parentEl   : Object (HTML element)
*       @multi      : Boolean 
*
*************** 
* Copyright 2013 Sean T. Unwin
* Released under the MIT license.
* http://en.wikipedia.org/wiki/MIT_License
*/
;(function () {
	"use strict";

    function Chardelay(c, options) {
        var content,
            args = arguments,
            opts = {},
            defaults = {
                "parentEl": window.document.body,
                "layout": "h",
                "delay": 150,
                "inEl": "span",
                "css": "chardelay",
                "multi": false
            };

        function contentConfig(){

            function validate(c) {
                try {
                  if (typeof c === "string" || Array.isArray(c)) {
                    return c;
                  } else if (typeof c === "number") {
                    return c.toString();
                  } else {
                    throw new TypeError("content must be a String or Array");
                  }
                } catch(e) {
                  window.console.log(e.name + ": " + e.message);
                  content = false;
                  return false;
                }
            } /* END validate */

            try {
                if(c === undefined){
                    throw new Error("NoContent");
                } else {
                    content = validate(c);
                }
            } catch(e) {
                window.console.log(e.name + ": " + e.message);
                content = false;
                return false;
            }
        } /* END contentConfig() */

        function optionsConfig(){
            var optsLen,
                isSet = true;

            function setup() {

                var item,
                    defsLen = Object.keys(defaults).length, /* Number of default options */
                    argsLen = args.length; /* Number of initial arguments */
                /* Check for Options */
                if (argsLen > 1) {
                    /* Options were passed as Object */
                    if(argsLen === 2 && typeof args[1] === "object") {
                        /* Get number of Options passed */
                        optsLen = Object.keys(options).length;
                            item = 0;
                            /* Check Properties for Options that match Defaults */
                                for (var op in options) {
                                    for ( var prop in defaults) {
                                        if (op === prop) {
                                            opts[prop] = options[prop];
                                        } else if (typeof options[prop] === "undefined" ) {
                                            opts[prop] = defaults[prop];
                                        } else {
                                            opts[op] = options[op];
                                        }
                                    }
                                }
                    } else { /* Options passed as argument array */
                        optsLen = args.length-1;
                        for (item = 0; item <= defsLen-1; item++) {
                            opts[Object.keys(defaults)[item]] = args[item+1];
                        }
                    }
                } else {
                    isSet = false;
                    return false;
                }
            } /* END setup() */

            function validate() {
                var tVal,
                    step = 0;

                function setAsDefault(i) {
                    opts[i] = defaults[i];
                    return;
                } /* END setAsDefault */

                function setAsOption(i) {
                    if(arguments[1] !== undefined){
                        opts[i] = arguments[1];
                    } else {
                        opts[i] = tVal;
                    }
                    return;
                } /* END setAsOption */
                
                for (var i in defaults) {
                        tVal = opts[i];
                        switch (i) {
                            case "parentEl":
                                if (tVal && typeof tVal === "object") {
                                    if (tVal instanceof window.jQuery || tVal.nodeType === 1 || Object.prototype.toString.call(tVal).match(/^\[object\s(.*)\]$/)[1] === "NodeList" || tVal.constructor.name === "NodeList") {
                                        setAsOption(i, tVal[0]);
                                    } else {
                                        setAsDefault(i);
                                    }
                                } else {
                                    setAsDefault(i);
                                }
                            break;
                            case "layout":
                                if (tVal && typeof tVal === "string") {
                                    if (tVal=== "v" || tVal === "h") {
                                        setAsOption(i);
                                    } else {
                                        setAsDefault(i);
                                    }
                                } else {
                                    setAsDefault(i);
                                }
                            break;
                            case "delay":
                                if (tVal && typeof tVal === "number" && tVal > 0) {
                                    setAsOption(i);
                                } else {
                                    setAsDefault(i);
                                }
                            break;
                            case "inEl":
                                if (/^\s*$/.test(tVal) !== false && typeof tVal === "string") {

                                    if(tVal === "p" || tVal === "span" || tVal === "div") {
                                        setAsOption(i);
                                    } else {
                                        setAsDefault(i);
                                    }
                                }
                            break;
                            case "css":
                                if (tVal && typeof tVal === "string") {
                                    setAsOption(i);
                                } else {
                                    setAsDefault(i);
                                }
                            break;
                            case "multi":
                                if(tVal && typeof tVal === "boolean" && tVal === true) {
                                    setAsOption(i);
                                } else {
                                    setAsDefault(i);
                                }
                            break;
                            default: break;
                        }
                        step++;
                }
            } /* END validate */

            setup();
            if(isSet === true) {
                validate();
            } else {
                opts = defaults;
            }
        } /* END optionsConfig */

        function writeToDOM() {
            var itemArr = [];

            function createElmt(v) {
                v = document.createElement(opts.inEl);
                    v.className += opts.css;
                if (opts.multi && opts.layout === "v") {
                    v.style.display = "table";
                    v.style.verticalAlign = "middle";
                }
                return v;
            } /* END createElmt */

            function contentToElmt(el, item, dir) {
                el.innerHTML += itemArr[item];
                if (dir === "v") {
                    if (!opts.multi) {
                      el.innerHTML += "<br />";
                    } else {
                        return;
                    }
                }
            } /* END contentToElmt() */
            
            function doDelay(el, x, dir, dly) {
                setTimeout(function(){
                    if (opts.multi) {
                        writeIt(el);
                    }
                    contentToElmt(el, x, dir);
                },x * dly);
            } /* END doDelay() */

            function setStage() {
                var el,
                    elArr = [];

                if (!opts.multi) {
                    el = createElmt(el);
                    writeIt(el);
                }
                for (var i = 0; i < itemArr.length; i++) {
                    if(!opts.multi) {
                        doDelay(el, i, opts.layout, opts.delay);
                    } else {
                        el = createElmt(el);
                        elArr.push(el);
                        doDelay(elArr[i], i, opts.layout, opts.delay);
                    }
                }
           } /* END setStage */

            function splitStr(s){
                s.split("");
                return s;
            } /* END splitStr */

            function writeIt (el) {
                opts.parentEl.appendChild(el);
            } /* END writeIt */

            itemArr = (Array.isArray(content)) ? content : splitStr(content);
            setStage();
        } /* END writeToDOM */

        function init() {
            contentConfig();
            if (content === false){return false;}
            optionsConfig();
            writeToDOM();
        } /* END init */
        /* END Functions */

        init();

    } /* END Chardelay */

    /****
     * Dependencies
     ****/
    (function(){
        /* For browsers that do not support Array.isArray()
         * Snippet copied from:
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
         */
        if(!Array.isArray) {
          Array.isArray = function (vArg) {
            return Object.prototype.toString.call(vArg) === "[object Array]";
          };
        }
    })();

    (function(){
        /* For browsers that do not support Object.keys
         * Snippet copied from:
         * http://tokenposts.blogspot.com.au/2012/04/javascript-objectkeys-browser.html
         */
        if (!Object.keys) Object.keys = function(o) {
            if (o !== Object(o)) {
            throw new TypeError("Object.keys called on a non-object");
            }
            var k=[],p;
            for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
            return k;
        };

    })();
    /* END Dependencies */

   /**
    * Expose Chardelay
    */
    // AMD suppport
    if (typeof window.define === "function" && window.define.amd !== undefined) {
        window.define("Chardelay", [], function () {
            return Chardelay;
            });

    // CommonJS suppport
    } else if (typeof module !== "undefined" && module.exports !== undefined) {
        module.exports = Chardelay;

    // Default
    } else {
        window.Chardelay = Chardelay;
    }
}());