
function setFontSize() {
	var winWidth = window.innerWidth;
	if (winWidth == undefined || winWidth == 0) {
		setTimeout(setFontSize, 0);
	} else {
		document.documentElement.style.fontSize = (winWidth / 640) * 100 + 'px';
	}
}

!(function (win, doc) {

	// 640宽度以上进行限制 需要css进行配合
	// var size = (winWidth / 640) * 100;
	// doc.documentElement.style.fontSize = (size < 100 ? size : 100) + 'px';

	var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';

	win.addEventListener(evt, function () {
		setTimeout(setFontSize, 0);
	}, false);

	win.addEventListener("pageshow", function (e) {
		setTimeout(setFontSize, 0);
	}, false);

	setTimeout(setFontSize, 0);

}(window, document));
