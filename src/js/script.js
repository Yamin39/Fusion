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

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
const posValueX = document.querySelector(".valueOfX");
const posValueY = document.querySelector(".valueOfY");
let isMouseMoving = false;
let timeoutId;

document.addEventListener("mousemove", function (e) {
  if (!isMouseMoving) {
    gsap.to(circles, {
      opacity: 0.25,
    });
  }

  isMouseMoving = true;
  coords.x = e.clientX;
  coords.y = e.clientY;

  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    isMouseMoving = false;
    gsap.to(circles, {
      opacity: 0,
    });
  }, 500); // 0.5 seconds delay
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);

  posValueX.innerHTML = x;
  posValueY.innerHTML = y;
}

animateCircles();

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