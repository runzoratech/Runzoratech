/* MOBILE MENU */

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click",()=>{
  navMenu.classList.toggle("active");
});

/*logo*/

const siteLogo = document.getElementById("siteLogo");

function updateLogo(){
  if(document.body.classList.contains("dark")){
    siteLogo.src = "RUNZORATECH logo black no bg.png";
  } else {
    siteLogo.src = "RUNZORATECH logo white no bg.png";
  }
}

/*ROPE PHYSICS*/

const svg = document.getElementById("ropeSvg");
const path = document.createElementNS("http://www.w3.org/2000/svg","path");
svg.appendChild(path);

const ball = document.getElementById("ropeBall");

const segments = 12;
let ropeLength = window.innerWidth <= 768 ? 4 : 10;
function setRopeSettings(){

  if(window.innerWidth <= 768){
    /*mobile rope*/
    ropeLength = 5;  
  } else {
    /*desktop rope*/
    ropeLength = 9;  
  }

}

setRopeSettings();

window.addEventListener("resize", () => {
  setRopeSettings();
});
let points = [];

for(let i=0;i<segments;i++){
 points.push({
  x:20,
  y:i*ropeLength,
  oldx:20,
  oldy:i*ropeLength
});
}
/*ball physics*/
let dragging=false;

ball.addEventListener("mousedown",()=>dragging=true);

document.addEventListener("mouseup",()=>{
  if(dragging){
    document.body.classList.toggle("dark");
    updateLogo();
  }
  dragging=false;
});

document.addEventListener("mousemove",(e)=>{
  if(!dragging) return;

  const rect = svg.getBoundingClientRect();
  points[segments-1].x = e.clientX - rect.left;
  points[segments-1].y = e.clientY - rect.top;
});

function update(){

  for(let i=1;i<segments;i++){
    let p = points[i];

    let vx = (p.x - p.oldx) * 0.995;
    let vy = (p.y - p.oldy) * 0.995;

    p.oldx = p.x;
    p.oldy = p.y;

    p.x += vx;
    p.y += vy + 0.3;
  }

  for(let k=0;k<5;k++){
    points[0].x = 30;
    points[0].y = 0;

    for(let i=0;i<segments-1;i++){
      let p1 = points[i];
      let p2 = points[i+1];

      let dx = p2.x - p1.x;
      let dy = p2.y - p1.y;
      let dist = Math.hypot(dx,dy);
      let diff = (dist - ropeLength)/dist;

      if(i>0){
        p1.x += dx*0.5*diff;
        p1.y += dy*0.5*diff;
      }

      p2.x -= dx*0.5*diff;
      p2.y -= dy*0.5*diff;
    }
  }

  let d = `M ${points[0].x} ${points[0].y}`;
  for(let i=1;i<segments;i++){
    d += ` L ${points[i].x} ${points[i].y}`;
  }
  path.setAttribute("d", d);

  const end = points[segments-1];

const ballSize = window.innerWidth <= 768 ? 10 : 14;

ball.style.left = (end.x - ballSize/2) + "px";
ball.style.top  = (end.y - ballSize/2) + "px";
  requestAnimationFrame(update);
}
/* MOBILE TOUCH */
/*Touch start*/
ball.addEventListener("touchstart", (e) => {
  dragging = true;
  e.preventDefault();
}, { passive: false });

/*Touch move*/
document.addEventListener("touchmove", (e) => {
  if (!dragging) return;

  const touch = e.touches[0];
  const rect = svg.getBoundingClientRect();

  points[segments - 1].x = touch.clientX - rect.left;
  points[segments - 1].y = touch.clientY - rect.top;

}, { passive: false });

/*Touch end*/
document.addEventListener("touchend", () => {
  if (dragging) {
    document.body.classList.toggle("dark");
    updateLogo(); 
  }
  dragging = false;
});

update();

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

/*open project link*/
function openSite(url){
  window.open(url, "_blank");
}
/*counter*/
const counters = document.querySelectorAll('.counter');

const startCounter = (counter) => {
  const target = +counter.getAttribute('data-target');
  let count = 0;

  const updateCounter = () => {
    const increment = target / 80;

    if(count < target){
      count += increment;
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      startCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

counters.forEach(counter => observer.observe(counter));

/*FAQ*/
const items = document.querySelectorAll(".faq-item");

items.forEach(item => {

const question = item.querySelector(".faq-question");
const rocket = item.querySelector(".rocket");

question.addEventListener("click", () => {

const open = item.classList.contains("active");
rocket.classList.remove("fly");
void rocket.offsetWidth;
rocket.classList.add("fly");

if(open){
item.classList.remove("active");
}else{

items.forEach(el => el.classList.remove("active"));
item.classList.add("active");

}

});

});

document.addEventListener("DOMContentLoaded", function(){

(function(){
emailjs.init("tMxaYo2Amlv5IQoeh");
})();

document.getElementById("contactForm").addEventListener("submit", function(e){

e.preventDefault();

var params = {
name: document.getElementById("name").value,
contact: document.getElementById("contact").value,
message: document.getElementById("message").value
};

emailjs.send("service_rsgdj93","template_d2ph0wn",params)

.then(function(){

alert("Message Sent Successfully!");
document.getElementById("contactForm").reset();

}, function(error){

alert("Failed to send message");

});

});

});
