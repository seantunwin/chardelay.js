# Chardelay.js

A stand-alone library for placing content on the page with a delay similar to a typing effect.

Compatible with most major browsers, including IE8+.

## Project Setup

Download and unzip or clone into your project's js folder.

Since this is stand-alone there are no dependencies, although it is ready to accept a jQuery element object.

## Deploying

### Add the javascript file to your page:

```html
<script src="js/chardelay.js"></script>
```

### Create a new instance

_Able to initialize in a few ways_:

`var myChardelay = Chardelay( contentString );` -- Uses `defaults` for `options`.

`var myChardelay = Chardelay( contentString, "h", 300, "p", "coolText", "container" );`

```js
var myChardelay = Chardelay( contentString, {
                      "layout"  : "v",
                      "delay"   : 225,
                      "inEl"    : "div",
                      "css"     : "shadow",
                      "parentEl": $("#container")
                      /* OR if not using jQuery:
                       * "parentEl": document.getElementById("container")
                       * "parentEl": document.getElementsByClassName("myClass")
                       */
                  });
```

#### _Arguments:_

1. `content`: String or Array of that which is to be outputted. Required.
2. Options:
    1. `layout`: String of output display - `"h"` = horizontal, `"v"` = vertical. Default: `"h"`.
    2. `delay`: Number of milliseconds between placing output items. Default: `150` if `"h", `400` if `"v"`.
    3. `inEl`: String of type of HTML element to create for our output to be placed inside. Accepted types are `"p"`, "span"`, `"div"`. Default: `span`. 
    4. `css`: String of CSS class for output to be styled as. Default: `chardelay`.
    5. `parentEl`: String of parent element for `inEl`. Accepts elements by Id or Class (Note: No dot (`.`) before class). Also accepts a jQuery element object as well. Default: `document.body`.



## Troubleshooting

> If using `document.getElementsByClassName` and there are more than 1 elements in the returned NodeList
>only the first element will be used.

## License

Copyright (c) 2013 [@seantunwin](https://twitter.com/seantunwin) Licensed under the MIT license.
