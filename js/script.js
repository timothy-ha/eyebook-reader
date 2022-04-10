function scroll(speed) {
	window.scrollBy(0, speed);
}

let direction = 0;
let threshold = window.innerHeight * 0.5;

webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
    // var xprediction = data.x; //these x coordinates are relative to the viewport
    // var yprediction = data.y; //these y coordinates are relative to the viewport

	if (data.y > window.innerHeight/2 + threshold) {
		scroll(250);
	} else if (data.y < window.innerHeight/2 - threshold) {
		scroll(-250);
	}

	console.log(data);
}).begin();