# Chardelay.js
[https://seantunwin.github.io/chardelay.js/](https://seantunwin.github.io/chardelay.js/)

A stand-alone library for placing content on the page with a delay similar to a typing effect.

Compatible with most modern browsers, including IE8+.

## Project Setup

Download and unzip or clone then copy `chardeley.min.js` into your project's js folder.

Since this is stand-alone there are no dependencies, although it is ready to accept a jQuery element object.

## How to use

### Add the javascript file to your page:

```html
<script src="js/chardelay.min.js"></script>
```

### Create a new instance

_Able to initialize in a few ways_:

`var myChardelay = Chardelay( contentString );` -- Uses `defaults` for `options`.

`var myChardelay = Chardelay( contentString, "container", 300, "p", "coolText", "v", false, true );`

```js
var myChardelay = Chardelay( contentString, {
                      "parentEl": $("#container"),
                      /* OR if not using jQuery:
                       * "parentEl": document.getElementById("container")
                                 or
                       * "parentEl": document.querySelector(".myClass")
                       */
                      "delay"     : 225,
                      "inEl"      : "div",
                      "css"       : "shadow",
                      "layout"    : "v",
                      "overwrite" : false
                      "multi"    : true

                  });
```

#### _Arguments:_

1. `content`: String, Number, or Array of that which is to be outputted. _Required_.
2. Options:
    1. `parentEl`: Object of parent element for `inEl` to be used as a container. Must be a valid HTML element object or jQuery element object. Accepts element by Id, Class, or jQuery element object. _Default_: `document.body`.
    2. `delay`: Number of milliseconds between placing output items. Must be greater than 0 or default will be used. _Default_: `150`.
    3. `inEl`: String of type of HTML element to create for our output to be placed inside. Accepted types are `"p"`, `"span"`, `"div"`, `"li"`, any header tag (`h1` to `h6`). _Default_: `"span"`.
    4. `css`: String of CSS class for output to be styled as. Note: No dot(.). _Default_: `chardelay`.
    5. `layout`: String of output display - `"h"` = horizontal, `"v"` = vertical. _Default_: `"h"`.
    6. `overwrite`: Boolean to stipulate whether innerHTML of `parentEl` is overwritten.
    7. `multi`: Boolean to stipulate whether the content is to be placed inside a single HTML element or each item of content gets it's own element. _Default_: `false`.


## Troubleshooting

* If there is more than 1 element in the returned `NodeList` for `parentEl` only the first element will be used.
* If `overwrite` is `true` and there is a flash of the original content before Chardelay does it's thing it is recommended to clear that content before instantiating Chardelay. You may want to store that content in a variable before hand if planning on using it.
* If `overwrite` is `true` then `inEl` will not be considered.
* If `multi` is `true` then `overwrite` will be considered `false`.

## License

Copyright (c) 2013-2014 [@seantunwin](https://twitter.com/seantunwin) Licensed under the MIT license.
