'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const reveal = function () {
  for (let i = 0; i < sections.length; i++) {

    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }

  }
}

reveal();
addEventOnElem(window, "scroll", reveal);

/* pic change animation for hero & expert */

let slideIndex = 0;
let slideIndex1 = 0;
          showSlides();
          
          function showSlides() {

            /* animation for hero-banner */
            let i;
            let slides = document.getElementsByClassName("mySlides");
            let dots = document.getElementsByClassName("dot");
            for (i = 0; i < slides.length; i++) {
              slides[i].style.display = "none";  
            }
            slideIndex++;
            if (slideIndex > slides.length) {slideIndex = 1}    
            for (i = 0; i < dots.length; i++) {
              dots[i].className = dots[i].className.replace(" activePic", "");
            }
            slides[slideIndex-1].style.display = "block";  
            dots[slideIndex-1].className += " activePic";


            /* animation for expert-banner */

            let slides1 = document.getElementsByClassName("mySlides1");
            let dots1 = document.getElementsByClassName("dot1");
            for (i = 0; i < slides1.length; i++) {
              slides1[i].style.display = "none";  
            }
            slideIndex1++;
            if (slideIndex1 > slides1.length) {slideIndex1 = 1}   
            for (i = 0; i < dots1.length; i++) {
              dots1[i].className = dots1[i].className.replace(" activePic1", "");
            } 
            
            slides1[slideIndex1-1].style.display = "block";  
            dots1[slideIndex1-1].className += " activePic1";


            setTimeout(showSlides, 6500); // Change image every 7 seconds
          }

