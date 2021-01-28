//gestion des sons
let timeouts = [];

const muteBtn = document.getElementById("mute");

muteBtn.addEventListener("click", function () {
  console.log(muteBtn.children[0])
  muteBtn.children[0].classList.toggle("fa-volume-up");
  muteBtn.children[0].classList.toggle("fa-volume-mute");
  if (muteBtn.children[0].classList.contains("fa-volume-mute")) {
    muteBtn.children[1].innerText = "Activer l'audio";
    document.querySelectorAll("audio").forEach((e) => mute(e));
  } else {
    muteBtn.children[1].innerText = "Désactiver l'audio";
    document.querySelectorAll("audio").forEach((e) => unmute(e));
  }
});

function mute(e) {
  e.muted = true;
  e.pause();
}
function unmute(e) {
  e.muted = false;
}

//scrollspy
const sections = document.querySelectorAll(".section");
const menu_links = document.querySelectorAll(".nav li");

const makeActive = (link) => {
  menu_links[link].classList.add("active");
  sections[link].classList.add("current");
}
const removeActive = (link) => {
  menu_links[link].classList.remove("active");
  sections[link].classList.remove("current");
}
const removeAllActive = () =>
  [...Array(sections.length).keys()].forEach((link) => removeActive(link));

//marge top scrollspy
const sectionMargin = 200;

let currentActive = 0;

//animation au load
document.addEventListener("DOMContentLoaded", function () {
  //trouve section courante au load et lui ajoute la classe active
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

//gère le scroll
window.addEventListener("scroll", () => {
  //transforme translate le tuyau au scroll
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

  if (current !== currentActive) {
    document.querySelectorAll("audio").forEach((e) => mute(e));
    //supprime bruitages si scroll
    for (var i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i]);
    }
    timeouts = [];

    // supprime classe active sur toutes les sections
    // ajoute classe active sur section active
    removeAllActive();
    currentActive = current;
    makeActive(current);

    //musique
    if (muteBtn.children[0].classList.contains("fa-volume-up")) {
    var currentSection = document.getElementsByClassName('current');
    var currentNb = currentSection[0].id.slice(-1);
    document.getElementById("marioOST"+currentNb).muted = false;
    document.getElementById("marioOST"+currentNb).volume = 0.1;
    document.getElementById("marioOST"+currentNb).currentTime = 0;
    document.getElementById("marioOST"+currentNb).play();
    }

    //bruitage tuyau
    if (muteBtn.children[0].classList.contains("fa-volume-up")) {
      timeouts.push(
        setTimeout(function () {
          document.getElementById("tuyau").muted = false;
          document.getElementById("tuyau").volume = 0.1;
          document.getElementById("tuyau").play();
        }, 1000)
      );
      timeouts.push(
        setTimeout(function () {
          document.getElementById("piece").muted = false;
          document.getElementById("piece").volume = 0.1;
          document.getElementById("piece").play();
        }, 3000)
      );
    }
  }
});
