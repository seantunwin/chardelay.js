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
                "layout": "h",
                "delay": 150,
                "inEl": "span",
                "css": "chardelay",
                "parentEl": window.document.body,
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
            }

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
        }

        function optionsConfig(){
            var defsLen,
                argsLen,
                optsLen,
                isArgs,
                optsTmp = {},
                isSet = true;

            function setup() {

                var item;
                defsLen = Object.keys(defaults).length;
                argsLen = args.length;
                if (argsLen > 1) {
                    if(argsLen === 2 && typeof args[1] === "object") {
                        isArgs = false;
                        optsLen = Object.keys(options).length;
                        optsTmp = options;
                    } else {
                        isArgs = true;
                        optsLen = args.length-1;

                        for (item = 0; item <= defsLen-1; item++) {
                            optsTmp[Object.keys(defaults)[item]] = args[item+1];
                        }
                    }
                } else {
                    isSet = false;
                    return false;
                }
            }

            function validate() {
                var i,
                    tVal,
                    step = 0;
                function setAsDefault() {
                    opts[Object.keys(optsTmp)[step]] = defaults[Object.keys(defaults)[step]];
                    return;
                }
                function setAsOption() {
                    if(arguments[0] !== undefined){
                        opts[Object.keys(defaults)[step]] = arguments[0];
                    } else {
                    opts[Object.keys(defaults)[step]] = tVal;
                    }
                    return;
                }

                for (i in defaults) {
                        tVal = optsTmp[Object.keys(optsTmp)[step]];
                    switch (step) {
                        case 0:
                            if (typeof tVal === "string") {
                                setAsOption(function(t){
                                    t = (t === "v" || t === "h") ? t : "h";
                                }(tVal))
                            }
                        break;
                        case 1:
                            if (typeof tVal === "number" && tVal > 0) {
                                setAsOption();
                            } else {
                                if (optsTmp[Object.keys(optsTmp)[step]] === "v") {
                                    setAsOption(400);
                                } else {
                                    setAsOption(150);
                                }
                            }
                        break;
                        case 2:
                            if (tVal && typeof tVal === "string") {
                                if(tVal === "p" || tVal === "span" || tVal === "div") {
                                    setAsOption();
                                } else {
                                    setAsDefault();
                                }
                            }
                        break;
                        case 3:
                            if (typeof tVal === "string") {
                                setAsOption();
                            } else {
                                setAsDefault();
                            }
                        break;
                        case 4:
                            if (typeof tVal === "object") {
                                if (tVal instanceof jQuery) {
                                    setAsOption(tVal[0]);
                                } else {
                                    setAsOption();
                                }
                            } else if (typeof tVal === "string") {
                                if (document.getElementById(tVal)) {
                                    setAsOption(document.getElementById(tVal));
                                } else if (document.querySelectorAll("." + tVal)) {
                                    setAsOption(document.querySelectorAll("." + tVal).item(0));
                                } else {
                                    setAsDefault();
                                }

                            } else {
                                setAsDefault();
                            }
                            break;
                        case 5:
                            if(typeof tVal === "boolean" && tVal === true) {
                                setAsOption();
                            } else {
                                setAsDefault();
                            }
                        default: break;
                    }
                    step++;
                }
            }
            setup();
            if(isSet === true) {
                validate();
            } else {
                opts = defaults;
            }
        }   

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
            }
            function contentToElmt(el, item, dir) { 
                el.innerHTML += itemArr[item];
                if (dir === "v") {
                    if (!opts.multi) {
                      el.innerHTML += "<br />";
                    } else {
                        return;
                    }
                }
            }

            function doDelay(el, x, dir, dly) {
                setTimeout(function(){
                    if (opts.multi) {
                        writeIt(el);
                    }
                    contentToElmt(el, x, dir);
                },x * dly);
            }

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
                        //writeIt(el);
                        elArr.push(el);
                        doDelay(elArr[i], i, opts.layout, opts.delay);
                    }
                }
           }

            function splitStr(s){
                s.split("");
                return s;
            }

            function writeIt (el) {
                opts.parentEl.appendChild(el);
            }

            itemArr = (Array.isArray(content)) ? content : splitStr(content);
            setStage();
        }

        function init() {
            contentConfig();
            if (content === false){return false;}
            optionsConfig();
            writeToDOM();
        }
        /* End Functions */

        init();

    }
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
    /* End Dependencies */

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