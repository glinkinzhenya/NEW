// $('.navbar-hamburger').click(function () {
//   $(this).toggleClass('open');
//   // $('.navbar__list').toggleClass('open');

//   $('.navbar__list').stop(true, true).slideToggle(500);

// });



// !для информации значек $ это начит вызов библиотеки jquery
$(document).ready(function () {
  // !заменили ID на наш клас .header-navbar__btn
  $('.header-navbar__btn').click(function () {
    $(this).toggleClass('open');
    // способ 1
    // $('.header-navbar__list').toggleClass('header-navbar__list--active');
    // способ 2
    $('.header-menu__left-list, .header-menu__right-list').stop(true, true).slideToggle(500);
  });
});


// Замена логотипа

const logo = document.querySelector(".header-menu__logo-image");

function logoTime() {
  logo.setAttribute("src", "assets/img/logo_2.gif")
  setTimeout(`logo.setAttribute("src", "assets/img/logo_3.png")`, 4000);
};

setTimeout("logoTime()", 4000);

let setStop = setInterval(() => {
  logoTime()
}, 30000);

logo.addEventListener("click", () => logoTime());


// левая стрелочка в портфолио
const leftImage = document.querySelector(".portfolio-box__left-image");
const left = document.querySelector(".portfolio-box__left")
left.onmouseenter = () => leftImage.setAttribute("src", `assets/img/arrow_left_2.png`);
left.onmouseleave = () => leftImage.setAttribute("src", `assets/img/arrow_left_1.png`);


// правая стрелочка в портфолио
const rightImage = document.querySelector(".portfolio-box__right-image");
const right = document.querySelector(".portfolio-box__right")
right.onmouseenter = () => rightImage.setAttribute("src", `assets/img/arrow_right_2.png`);
right.onmouseleave = () => rightImage.setAttribute("src", `assets/img/arrow_right_1.png`);


// листает портфолио
const image = document.querySelector(".portfolio-box__picture")

let y = 1;

// setInterval(() => {
//   image.setAttribute("src", `assets/img/${y}.jpg`);
//   y += 1;
//   if (y === 12) y = 1;
// }, 2000);

right.addEventListener("click", () => {
  if (y > 10) y = 0;

  y += 1;
  image.setAttribute("src", `assets/img/${y}.jpg`);
  clearInterval(1);
});

left.addEventListener("click", () => {
  if (y < 2) y = 12;

  y -= 1;
  image.setAttribute("src", `assets/img/${y}.jpg`);
  clearInterval(1);
});
