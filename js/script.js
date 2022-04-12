window.saveDataAcrossSessions = true

let distance = 500;
let threshold = window.innerHeight * 0.3;
let lastTime = 0;
let direction = 0;

function updateDirection(x, time) {
	direction = x;
	lastTime = time;
}

function scroll(direction, distance, time) {
	if (lastTime + delay < time) {
		window.scrollBy({
			top: direction * distance,
			behavior: 'smooth'
		});
		
		updateDirection(0, time)
	}
}



let pageCount = 1
let delay = 1500; // 1.5 second
let timeLooking = Number.POSITIVE_INFINITY
let lookDirection = null
const turnLeft = window.innerWidth / 4
const turnRight = window.innerWidth - window.innerWidth / 4

let pageElement = getNewPage();
let nextPageElement = getNewPage(true);

function getNewPage(next = false) {
	const page = document.createElement('iframe')
	//document.body.append(page)
	page.src="book_1-1/" + "book_" + pageCount + "-" + pageCount + ".pdf"
	if (next) {
		page.classList.add("next")
		pageCount++
	}
	document.body.append(page)
	return page


} 

webgazer.setGazeListener((data, timestamp) => {
	if (data.y > window.innerHeight/2 + threshold && direction != 1) updateDirection(1, timestamp);
	else if (data.y < window.innerHeight/2 - threshold && direction != -1) updateDirection(-1, timestamp);
	else if (data < (window.innerHeight/2 + threshold) && data > (window.innerHeight/2 - threshold)) updateDirection(0, 0);

	scroll(direction, distance, timestamp);


	if (data == null || lookDirection === 'stop') return

	if(data.x < turnLeft && lookDirection !== "left" && lookDirection !== 'reset') {
		timeLooking = timestamp
		lookDirection = "left"

	}

	else if (data.x > turnRight && lookDirection !== "right" && lookDirection !== 'reset') {
		timeLooking = timestamp
		lookDirection = "right"

	}

	else if (data.x >= turnLeft && data.x <= turnRight) {
		timeLooking = Number.POSITIVE_INFINITY
		lookDirection = "null"

	}

	if (timeLooking + delay < timestamp) {
		if (lookDirection === "left") {
			pageElement.classList.add("left")
			//pageCount = pageCount + 1
		}
		else {
			pageElement.classList.add("right")
			//pageCount = pageCount - 1
		}

		timeLooking = Number.POSITIVE_INFINITY
		lookDirection = 'stop'
		setTimeout(() => {
			pageElement.remove()
			nextPageElement.classList.remove('next')
			pageElement = nextPageElement
			nextPageElement = getNewPage(true)
			lookDirection = 'reset'

		}, 400)

	}

	console.log(data);
}).begin();