//réglages si Chrome
if (window.chrome) {
  window.addEventListener("wheel", (e) => e.preventDefault(), {
    passive: false,
  });
  document.getElementById("help").classList.add("help-chrome");
  setTimeout(function () {
    document.getElementById("help").classList.remove("help-chrome");
  }, 10000);
}

//init
const sectionMargin = 200;
let currentActive = 0;
let timeouts = [];

//hauteur timeline
const timeline = document.getElementById("timeline");
let style = document.createElement("style");
document.head.appendChild(style);
let sheet = style.sheet
let navHeight = timeline.getElementsByClassName("nav")[0].offsetHeight + timeline.scrollHeight - window.innerHeight;
sheet.addRule('.nav::after','height: '+navHeight+'px');
sheet.insertRule('.nav::after { height: '+navHeight+'px}', 0);


function mute(e) {
  e.muted = true;
  e.pause();
  stopPipeSounds();
}

function stopPipeSounds() {
  for (let i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  timeouts = [];
}

function unmute(e) {
  e.muted = false;
}

function playMusic() {
  let currentSection = document.getElementsByClassName("current");
  let currentNb = currentSection[0].id.substring(7);
  let music = document.getElementById("marioOST" + currentNb);
  music.muted = false;
  music.volume = 0.1;
  music.currentTime = 0;
  music.play();
}

function playPipe() {
  timeouts.push(
    setTimeout(function () {
      let pipeSound = document.getElementById("pipe");
      pipeSound.muted = false;
      pipeSound.volume = 0.1;
      pipeSound.play();
    }, 1000)
  );
  timeouts.push(
    setTimeout(function () {
      let coinSound = document.getElementById("coin");
      coinSound.muted = false;
      coinSound.volume = 0.1;
      coinSound.play();
    }, 3000)
  );
}

//changement classes scrollspy
const sections = document.querySelectorAll(".section");
const menu_links = document.querySelectorAll(".nav li");

const makeActive = (link) => {
  menu_links[link].classList.add("active");
  sections[link].classList.add("current");
};
const removeActive = (link) => {
  menu_links[link].classList.remove("active");
  sections[link].classList.remove("current");
};
const removeAllActive = () =>
  [...Array(sections.length).keys()].forEach((link) => removeActive(link));

//trouve section courante au load et lui ajoute la classe active
document.addEventListener("DOMContentLoaded", function () {
  const current =
    sections.length -
    [...sections]
      .reverse()
      .findIndex(
        (section) => window.scrollY >= section.offsetTop - sectionMargin
      ) -
    1;
  makeActive(current);
});

//audio button
const muteBtn = document.getElementById("muteBtn");
muteBtn.addEventListener("click", function () {
  muteBtn.children[0].classList.toggle("fa-volume-up");
  muteBtn.children[0].classList.toggle("fa-volume-mute");
  if (muteBtn.children[0].classList.contains("fa-volume-mute")) {
    muteBtn.children[1].innerText = "Activer l'audio";
    document.querySelectorAll("audio").forEach((e) => mute(e));
  } else {
    muteBtn.children[1].innerText = "Désactiver l'audio";
    document.querySelectorAll("audio").forEach((e) => unmute(e));
    playMusic();
  }
});

//scrollspy
window.addEventListener("scroll", () => {
  //transform translate timeline on scroll
  timeline.style.transform =
    "translateY(-" +
    ((timeline.scrollHeight - window.innerHeight) * window.pageYOffset) /
      document.body.clientHeight +
    "px)";

  //find current section
  const current =
    sections.length -
    [...sections]
      .reverse()
      .findIndex(
        (section) => window.scrollY >= section.offsetTop - sectionMargin
      ) -
    1;

  //if section change
  if (current !== currentActive) {
    //stop sounds and music
    document.querySelectorAll("audio").forEach((e) => mute(e));
    stopPipeSounds();

    //change active classe
    removeAllActive();
    currentActive = current;
    makeActive(current);

    //play music
    if (muteBtn.children[0].classList.contains("fa-volume-up")) {
      playMusic();
    }

    //play Pipe sounds
    if (muteBtn.children[0].classList.contains("fa-volume-up")) {
      playPipe();
    }
  }

  //3D Effect
  let currentSection = document.getElementsByClassName("current");
  let hover3D = currentSection[0].getElementsByClassName("hover3D")[0];
  if (hover3D) {
    const height = hover3D.clientHeight;
    const width = hover3D.clientWidth;
    hover3D.addEventListener("mousemove", handleMove);

    function handleMove(hover3D) {
      const yRotation = 10 * ((hover3D.layerX - width / 2) / width);

      const xRotation = -10 * ((hover3D.layerY - height / 2) / height);

      const string =
        "perspective(600px) rotateX(" +
        xRotation +
        "deg) rotateY(" +
        yRotation +
        "deg)";

      hover3D.target.style.transform = string;
    }
  }
});
