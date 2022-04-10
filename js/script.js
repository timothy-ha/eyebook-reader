function scroll(speed) {
	window.scrollBy(0, speed);
}

let direction = 0;
let threshold = window.innderHeight * 0.1;

webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
    // var xprediction = data.x; //these x coordinates are relative to the viewport
    // var yprediction = data.y; //these y coordinates are relative to the viewport

	if (0 < data.y < window.innerHeight) {
		if (data.y > window.innerHeight/2 + threshold) {
			scroll(1000);
		} else if (data.y < window.innerHeight/2 - threshold) {
			scroll(-1000);
		}
	}


	console.log(data);
}).begin();