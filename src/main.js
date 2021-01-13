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