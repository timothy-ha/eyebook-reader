const delay = 1000; // amount of time before scrolling (in ms)
const distance = 250; // # of pixels to scroll each time
let threshold = window.innerHeight * 0.2; // how much whitespace before actually scrolling

let lastTime = 0;
let direction = 0;

function updateDirection(x, time) {
	direction = x;
	lastTime = time;
}

function scroll(direction, distance, time) {
	if (time - lastTime > delay) {
		window.scrollBy({
			top: direction * distance,
			behavior: 'smooth'
		});
		
		updateDirection(0, time);
	}
}

webgazer.setGazeListener(function(data, elapsedTime) {
	threshold = window.innerHeight * 0.2;
	
	if (data == null) return;
	
	if (data.y > window.innerHeight/2 + threshold && direction != 1) updateDirection(1, elapsedTime);
	else if (data.y < window.innerHeight/2 - threshold && direction != -1) updateDirection(-1, elapsedTime);
	else if (data.y < (window.innerHeight/2 + threshold) && data.y > (window.innerHeight/2 - threshold)) updateDirection(0, elapsedTime);

	scroll(direction, distance, elapsedTime);
	
	console.log(direction);
}).begin();