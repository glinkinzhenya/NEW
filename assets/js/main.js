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
    img.style = `opacity: 0.0`;
    img.classList.add("portfolio-box__image");
    div.append(img);
    portfolioBox.append(div);

    let n = 0.1;
    let x = setInterval(() => {
      img.style = `opacity: ${n}`;
      n += 0.02;
      if (n > 1.1) clearInterval(x);
    }, 10);

    i += 1;
    if (i === 10) clearInterval(y);
  }, 200);
};

const height2 = screen.height;
const height1 = portfolioBox.getBoundingClientRect()
const height = height1.top - height2 + 400;

let tr = false;
window.addEventListener('scroll', function () {
  if (scrollY > height && tr === false) {
    portfolio()
    tr = true;
  };
});