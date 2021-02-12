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

function mute(e) {
  e.muted = true;
  e.pause();
  stopTuyauSounds();
}

function stopTuyauSounds() {
  for (let i = 0; i < timeouts.length; i++) {
    clearTimeout(timeouts[i]);
  }
  timeouts = [];
}

function unmute(e) {
  e.muted = false;
}

function playMusique() {
  let currentSection = document.getElementsByClassName("current");
  let currentNb = currentSection[0].id.substring(7);
  let musique = document.getElementById("marioOST" + currentNb);
  musique.muted = false;
  musique.volume = 0.1;
  musique.currentTime = 0;
  musique.play();
}

function playTuyau() {
  timeouts.push(
    setTimeout(function () {
      let bruitageTuyau = document.getElementById("tuyau");
      bruitageTuyau.muted = false;
      bruitageTuyau.volume = 0.1;
      bruitageTuyau.play();
    }, 1000)
  );
  timeouts.push(
    setTimeout(function () {
      let bruitagePiece = document.getElementById("piece");
      bruitagePiece.muted = false;
      bruitagePiece.volume = 0.1;
      bruitagePiece.play();
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

//bouton audio
const muteBtn = document.getElementById("mute");
muteBtn.addEventListener("click", function () {
  muteBtn.children[0].classList.toggle("fa-volume-up");
  muteBtn.children[0].classList.toggle("fa-volume-mute");
  if (muteBtn.children[0].classList.contains("fa-volume-mute")) {
    muteBtn.children[1].innerText = "Activer l'audio";
    document.querySelectorAll("audio").forEach((e) => mute(e));
  } else {
    muteBtn.children[1].innerText = "Désactiver l'audio";
    document.querySelectorAll("audio").forEach((e) => unmute(e));
    playMusique();
  }
});

//scrollspy
window.addEventListener("scroll", () => {
  //transforme translate la timeline au scroll
  const timeline = document.getElementById("timeline");
  timeline.style.transform =
    "translateY(-" +
    ((timeline.scrollHeight - window.innerHeight) * window.pageYOffset) /
      document.body.clientHeight +
    "px)";

  //trouve section courante
  const current =
    sections.length -
    [...sections]
      .reverse()
      .findIndex(
        (section) => window.scrollY >= section.offsetTop - sectionMargin
      ) -
    1;

  //si changement de section
  if (current !== currentActive) {
    //stop bruitages et musique
    document.querySelectorAll("audio").forEach((e) => mute(e));
    stopTuyauSounds();

    // change classe active
    removeAllActive();
    currentActive = current;
    makeActive(current);

    //joue musique
    if (muteBtn.children[0].classList.contains("fa-volume-up")) {
      playMusique();
    }

    //joue bruitage tuyau
    if (muteBtn.children[0].classList.contains("fa-volume-up")) {
      playTuyau();
    }
  }

  let currentSection = document.getElementsByClassName("current");
  let hover3D = currentSection[0].getElementsByClassName("hover3D")[0];
  const height = hover3D.clientHeight;
  const width = hover3D.clientWidth;
  hover3D.addEventListener("mousemove", handleMove);

  function handleMove(hover3D) {
    console.log(hover3D);
    const xVal = hover3D.layerX;
    const yVal = hover3D.layerY;

    const yRotation = 10 * ((xVal - width / 2) / width);

    const xRotation = -10 * ((yVal - height / 2) / height);

    const string =
      "perspective(600px) scale(1) rotateX(" +
      xRotation +
      "deg) rotateY(" +
      yRotation +
      "deg)";

    hover3D.target.style.transform = string;
  }
});
