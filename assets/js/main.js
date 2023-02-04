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


// // левая стрелочка в портфолио
// const leftImage = document.querySelector(".portfolio-box__left-image");
// const left = document.querySelector(".portfolio-box__left")
// left.onmouseenter = () => leftImage.setAttribute("src", `assets/img/arrow_left_2.png`);
// left.onmouseleave = () => leftImage.setAttribute("src", `assets/img/arrow_left_1.png`);


// // правая стрелочка в портфолио
// const rightImage = document.querySelector(".portfolio-box__right-image");
// const right = document.querySelector(".portfolio-box__right")
// right.onmouseenter = () => rightImage.setAttribute("src", `assets/img/arrow_right_2.png`);
// right.onmouseleave = () => rightImage.setAttribute("src", `assets/img/arrow_right_1.png`);


// // листает портфолио
// const image = document.querySelector(".portfolio-box__picture")

// let y = 1;

// // setInterval(() => {
// //   image.setAttribute("src", `assets/img/${y}.jpg`);
// //   y += 1;
// //   if (y === 12) y = 1;
// // }, 2000);

// right.addEventListener("click", () => {
//   if (y > 10) y = 0;

//   y += 1;
//   image.setAttribute("src", `assets/img/${y}.jpg`);
//   clearInterval(1);
// });

// left.addEventListener("click", () => {
//   if (y < 2) y = 12;

//   y -= 1;
//   image.setAttribute("src", `assets/img/${y}.jpg`);
//   clearInterval(1);
// });

// Первая заставка черного
let i = 0.9
function getOpacity() {
  const clearBlack = setInterval(() => {
    i -= 0.02
    if (i > 0.000001 && i < 0.02) {
      clearInterval(clearBlack);
      fix__black.style = "display: none";
    } else {
      fix__black.style = `opacity: ${i}`;
    }
  }, 50);
}
const fix__black = document.querySelector(".fix__black");
setTimeout("getOpacity()", 1000);



// Убираем title and description
const headerNavbarBtn = document.querySelector(".header-navbar__btn");
const headerContentTitle = document.querySelector(".header-content__title");
const headerContentDescription = document.querySelector(".header-content__description");

headerNavbarBtn.addEventListener("click", () => {
  headerContentTitle.classList.toggle("none");
  headerContentDescription.classList.toggle("none");
});


// Убираем зв`язатися
const headerContentAction = document.querySelector(".header-content__action");
headerNavbarBtn.addEventListener("click", () => {
  headerContentAction.classList.toggle("none");
});


// Создаем портфолио
const portfolioBox = document.querySelector(".portfolio-box");

function portfolio() {
  let i = 1;
  let y = setInterval(() => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("src", `assets/img/${i}.jpg`);
    img.classList.add("portfolio-box__image");
    div.append(img);
    portfolioBox.append(div);
    i += 1;
    if (i === 10) clearInterval(y);
  }, 300);
};

const height2 = screen.height;
const height1 = portfolioBox.getBoundingClientRect()
const height = height1.top - height2;

let tr = false;
window.addEventListener('scroll', function () {
console.log(scrollY);
  if (scrollY > height && tr === false) {
    portfolio()
    tr = true;
  };
});