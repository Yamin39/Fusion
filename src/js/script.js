// digital clock

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    
    var time = h + ":" + m +  " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

showTime();

// cursor tail

const cursor = document.querySelector(".cursor");
const posValueX = document.querySelector(".valueOfX");
const posValueY = document.querySelector(".valueOfY");
var timeout;

document.addEventListener("mousemove", (e) => {
	let x = e.pageX;
	let y = e.pageY;

	cursor.style.top = y + "px";
	cursor.style.left = x + "px";
	cursor.style.display = "block";
	
    
	// cursor tail will stop while mouse isn't moving  
	function mouseStopped(){
        cursor.style.display = "none";
	}
	// clearTimeout(timeout);
	timeout = setTimeout(mouseStopped, -1);
    posValueX.innerHTML = x;
    posValueY.innerHTML = y;
});

document.addEventListener("mouseout", () => {
	cursor.style.display = "none";
});

// scroll animation

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});


const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));