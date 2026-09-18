const navWrap = document.querySelector(".nav-wrap");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const links = [...document.querySelectorAll(".nav-links a")];
const sections = [...document.querySelectorAll("main section[id]")];
const reveals = document.querySelectorAll(".reveal");

/* -----------------------------------
   NAVIGATION + ACTIVE SECTION
----------------------------------- */

window.addEventListener("scroll", () => {

  navWrap.classList.toggle(
    "scrolled",
    window.scrollY > 20
  );

  const position = window.scrollY + 160;

  let current = "home";

  sections.forEach(section => {

    if(position >= section.offsetTop){
      current = section.id;
    }

  });

  links.forEach(link => {

    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );

  });

}, { passive:true });


/* -----------------------------------
   MOBILE MENU
----------------------------------- */

menuToggle.addEventListener("click", () => {

  const open =
    navLinks.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(open)
  );

});


links.forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


/* -----------------------------------
   SCROLL REVEAL
----------------------------------- */

const observer =
  new IntersectionObserver(
    (entries, obs) => {

      entries.forEach(entry => {

        if(entry.isIntersecting){

          entry.target.classList.add(
            "visible"
          );

          obs.unobserve(entry.target);
        }

      });

    },
    {
      threshold:.12
    }
  );


reveals.forEach(element => {

  observer.observe(element);

});


/* -----------------------------------
   CURRENT YEAR
----------------------------------- */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* -----------------------------------
   INITIALIZE NAVIGATION
----------------------------------- */

window.dispatchEvent(
  new Event("scroll")
);


/* ===================================
   CYBERSECURITY CURSOR EFFECT
=================================== */

const cursorGlow =
  document.createElement("div");

cursorGlow.className =
  "cursor-glow";

document.body.appendChild(
  cursorGlow
);


const cursorRing =
  document.createElement("div");

cursorRing.className =
  "cursor-ring";

document.body.appendChild(
  cursorRing
);


const cursorDot =
  document.createElement("div");

cursorDot.className =
  "cursor-dot";

document.body.appendChild(
  cursorDot
);


/* -----------------------------------
   CURSOR POSITION
----------------------------------- */

let mouseX =
  window.innerWidth / 2;

let mouseY =
  window.innerHeight / 2;

let glowX = mouseX;
let glowY = mouseY;

let ringX = mouseX;
let ringY = mouseY;


/* -----------------------------------
   TRACK MOUSE
----------------------------------- */

window.addEventListener(
  "mousemove",
  event => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    const xPercent =
      (mouseX / window.innerWidth) * 100;

    const yPercent =
      (mouseY / window.innerHeight) * 100;

    document.documentElement.style.setProperty(
      "--mouse-x",
      `${xPercent}%`
    );

    document.documentElement.style.setProperty(
      "--mouse-y",
      `${yPercent}%`
    );

    cursorDot.style.left =
      `${mouseX}px`;

    cursorDot.style.top =
      `${mouseY}px`;

  },
  { passive:true }
);


/* -----------------------------------
   SMOOTH CURSOR MOVEMENT
----------------------------------- */

function animateCursor(){

  glowX +=
    (mouseX - glowX) * 0.07;

  glowY +=
    (mouseY - glowY) * 0.07;

  ringX +=
    (mouseX - ringX) * 0.16;

  ringY +=
    (mouseY - ringY) * 0.16;


  cursorGlow.style.left =
    `${glowX}px`;

  cursorGlow.style.top =
    `${glowY}px`;


  cursorRing.style.left =
    `${ringX}px`;

  cursorRing.style.top =
    `${ringY}px`;


  requestAnimationFrame(
    animateCursor
  );

}

animateCursor();


/* -----------------------------------
   INTERACTIVE CURSOR TARGETING
----------------------------------- */

const interactiveElements =
  document.querySelectorAll(
    "a, button, .skill-card, .project-card, .cert, .hobby, .stat"
  );


interactiveElements.forEach(element => {

  element.addEventListener(
    "mouseenter",
    () => {

      cursorRing.classList.add(
        "hover"
      );

    }
  );

  element.addEventListener(
    "mouseleave",
    () => {

      cursorRing.classList.remove(
        "hover"
      );

    }
  );

});