let delay = 1000; // time expressed in ms
let distance = 500;
let threshold = window.innerHeight * 0.3;
let lastTime = 0;

function scroll(distance, time) {
	if (time - lastTime > delay) {
		window.scrollBy({
			top: distance,
			behavior: 'smooth'
		});
		lastTime = time;
	}
}

webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) return;
	if (data.y > window.innerHeight/2 + threshold) scroll(distance, elapsedTime);		
	else if (data.y < window.innerHeight/2 - threshold) scroll(-distance, elapsedTime);

	console.log(data);
}).begin();