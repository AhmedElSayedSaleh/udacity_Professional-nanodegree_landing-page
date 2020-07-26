/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const navBarList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
window.addEventListener("load", buildNavbar());

// Add class 'active' to section when near top of viewport && change hash of url
const lazyLoad = (target) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((item) => {
      const sec = item.target;

      if (item.isIntersecting) {
        sec.classList.add("section-active");
        // location.hash = sec.id;              // it's doing error with scroll
        observer.disconnect;
      } else {
        sec.classList.remove("section-active");
      }
    });
  });
  io.observe(target);
};

// Add class 'active' to navbar when scroll
function navLinksActivate() {
    window.onscroll= function(){
        const navLinks = document.querySelectorAll(".menu__link");
        const winScroll = window.scrollY;
        navLinks.forEach((link)=>{
            link.classList.remove("active");
            const linkHref = link.getAttribute("href");
            sections.forEach((sec)=>{
                if(winScroll >= sec.offsetTop && linkHref == `#${sec.id}`){
                    navLinks.forEach((link)=>{
                        link.classList.remove("active");
                    })
                    link.classList.add("active");
                }

            })
        })
    }
}

//  navLinks.forEach((link) => {
//    $(window).scroll(function () {
//      let windowScroll = $(window).scrollTop();
//      let linkHref = $(link).attr("href");
//      let secOffset = $(linkHref).offset().top;
//
//      if (windowScroll >= secOffset - 1) {
//        navLinks.forEach((link) => {
//          link.classList.remove("active");
//        });
//        link.classList.add("active");
//      }
//    });
//  });

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
function buildNavbar() {
  const docFrag = document.createDocumentFragment();

  sections.forEach((element) => {
    let listItem = document.createElement("li");
    let navLinkValue = element.dataset.nav;
    let sectionId = element.getAttribute("id");
    listItem.innerHTML += `<a href='#${sectionId}' class='menu__link'>${navLinkValue}</a>`;
    docFrag.appendChild(listItem);
  });
  navBarList.appendChild(docFrag);
}

// Scroll to section on link click

// Set sections as active
sections.forEach(lazyLoad);
navLinksActivate();

// navbar effect && top button
$(window).scroll(function () {
  let wScroll = $(window).scrollTop();
  if (wScroll > 30) {
      $(".page__header").css("backgroundColor", "#fff");
      $(".menu__link").css("color", "#000");
      $(".top-btn").fadeIn(500);
  } else {
      $(".page__header").css("backgroundColor", "#182653");
      $(".menu__link").css("color", "#fff");
      $(".top-btn").fadeOut(500);
  }
});

$(".top-btn").click(function () {
  $("html,body").animate({
      scrollTop: '0'
  }, 500);
});

