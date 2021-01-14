//scrollspy

document.addEventListener('DOMContentLoaded', function(){ 
  
  const sections = document.querySelectorAll(".section");
  const menu_links = document.querySelectorAll(".nav li");
  
  //fonction d'ajout/retirer classe
  const makeActive = (link) => menu_links[link].classList.add("active");
  const removeActive = (link) => menu_links[link].classList.remove("active");
  const removeAllActive = () => [...Array(sections.length).keys()].forEach((link) => removeActive(link));

  //marge scrollspy
  const sectionMargin = 200;

  let currentActive = 0;

  window.addEventListener("scroll", () => {
    
    //trouve section courante
    const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin ) - 1

    // supprime classe active sur toutes les sections 
    // ajoute classe active sur section active
    if (current !== currentActive) {
      removeAllActive();
      currentActive = current;
      makeActive(current);
    }
  });
}, false);

/* let elems = document.querySelectorAll('a')
for(var i = 0; i<elems.length; i++) {
  elems[i].addEventListener('click', function(){
    scroll(this.getAttribute("href"));
});
}

 function scroll(href) {
      var target = document.getElementById(href.substring(1));
      $('html,body').animate({
               scrollTop: target.offsetTop
          }, 1000);
};

/* SMOOTH SCROLLING SECTIONS
$('a[href*=#]:not([href=#])').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
      || location.hostname == this.hostname) {

      var target = $(this.hash);
      console.log(target)
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      console.log(target)
         if (target.length) {
           $('html,body').animate({
               scrollTop: target.offset().top
          }, 1000);
          return false;
      }
  }
});
*/