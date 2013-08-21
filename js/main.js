var myStr = "No matter where you go, there you are.",
	navArr = [
				'<a href="#about" class="test-menu-item">About</a>',
				'<a href="#getting-started" class="test-menu-item">Get Started</a>',
				'<a href="#usage" class="test-menu-item">Usage</a>',
				'<a href="#samples" class="test-menu-item">Samples</a>'
			],
	galArr = [
				'<a href="http://www.flickr.com/photos/7306738@N03/419635929" target="_blank"><img src="img/01.jpg" alt="" /></a>',
				'<a href="http://www.flickr.com/photos/42507736@N02/5321720511" target="_blank"><img src="img/02.jpg" alt="" /></a>',
				'<a href="http://www.flickr.com/photos/75988799@N00/431098835" target="_blank"><img src="img/03.jpg" alt="" /></a>',
				'<a href="http://www.flickr.com/photos/42507736@N02/5055021024" target="_blank"><img src="img/04.jpg" alt="" /></a>',
				'<a href="http://www.flickr.com/photos/36516818@N00/2161222087" target="_blank"><img src="img/05.jpg" alt="" /></a>',
				'<a href="http://www.flickr.com/photos/45939540@N05/5988281117" target="_blank"><img src="img/06.jpg" alt="" /></a>',
				'<a href="http://www.flickr.com/photos/53986933@N00/8147871467" target="_blank"><img src="img/07.jpg" alt="" /></a>',
				'<a href="http://www.flickr.com/photos/22588240@N04/8168976577" target="_blank"><img src="img/08.jpg" alt="" /></a>',
				'<a href="http://www.flickr.com/photos/37882873@N00/3196286183" target="_blank"><img src="img/09.jpg" alt="" /></a>',
				'<a href="http://www.flickr.com/photos/37195641@N03/3715440219" target="_blank"><img src="img/10.jpg" alt="" /></a>',
				'<a href="http://www.flickr.com/photos/12940826@N02/4908566352" target="_blank"><img src="img/11.jpg" alt="" /></a>',
				'<a href="http://www.flickr.com/photos/35221329@N08/7817018096" target="_blank"><img src="img/12.jpg" alt="" /></a>',
			],
	nums = 12345678;

function removeIt(s){
	$("." + s).remove();
}

function startGal() {
	var gal,
		hldr = $(".sample-box-gal"),
		css = "sample-box-gal-item";

		removeIt(css);
		gal = Chardelay(galArr, {
						"parentEl": hldr,
						"layout": "h",
						"delay": 500,
						"inEl": "div",
						"css": css,
						"multi": true
					});
}

function startHNav() {
	var hnav,
		hldr = $(".sample-box-hnav"),
		css = "sample-box-hnav-item";
		

		removeIt(css);
		hnav = Chardelay(navArr, {
						"parentEl": hldr,
						"layout": "h",
						"delay": 300,
						"inEl": "span",
						"css": css,
						"multi": true
					});
}

function startVList() {
	var vlist,
		hldr = $(".sample-box-vlist"),
		css = "sample-box-vlist-item";

		removeIt(css);
		vlist = Chardelay(nums, {
						"parentEl": hldr,
						"layout": "v",
						"delay": 400,
						"inEl": "p",
						"css": css,
						"multi": true
					});
}

function startTryit() {
	var oTryit = $(".example-tryit"),
		myCd;

	oTryit.find("p").hide();
	oTryit.find(".chardelay").remove();
	myCd = Chardelay(myStr, {"parentEl": oTryit});
}
function lazyLoad(s) {
	var d = window.document,
		b = d.body,
		e = d.createElement("script");

	e.async = true;
	e.src = s;
	b.appendChild(e);
}
$(function() {
	SyntaxHighlighter.defaults["toolbar"] = false;
	SyntaxHighlighter.all();

	lazyLoad("//platform.linkedin.com/in.js");

	$(".btn-tryit").on("click", startTryit);
	$(".btn-sample-hnav").on("click", startHNav);
	$(".btn-sample-vlist").on("click", startVList);
	$(".btn-sample-gal").on("click", startGal);
});