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
    $('.header-menu__left-list').stop(true, true).slideToggle(500);
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
});


// Создаем портфолио
const portfolioBox = document.querySelector(".portfolio-box");

function portfolio() {
  let i = 1;

  const data = {
    1: "../../portfolio/computer/index.html",
    2: "../../portfolio/organic/index.html",
  }

  let y = setInterval(() => {
    const div = document.createElement("div");
    const link = document.createElement("a");

    link.setAttribute("href", `${data[i]}`);
    link.setAttribute("href", `${data[i]}`);
    
    const img = document.createElement("img");

    img.setAttribute("src", `assets/img/${i}.jpg`);
    img.style = `opacity: 0.0`;
    img.classList.add("portfolio-box__image");
    link.append(img);
    div.append(link);

    portfolioBox.append(div);

    let n = 0.1;
    let x = setInterval(() => {
      img.style = `opacity: ${n}`;
      n += 0.02;
      if (n > 1.01) clearInterval(x);
    }, 10);

    i += 1;
    if (i === 9) clearInterval(y);
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


// Медленная прокрутка
document.querySelectorAll('a[href^="#"').forEach(link => {

  link.addEventListener('click', function (e) {
    e.preventDefault();

    let href = this.getAttribute('href').substring(1);

    const scrollTarget = document.getElementById(href);
    // const topOffset = document.querySelector('.scrollto').offsetHeight;
    const topOffset = 0; // если не нужен отступ сверху 
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});


// Меню цен
const priceArrow1 = document.getElementById("price-arrow1");
const priceArrow2 = document.getElementById("price-arrow2");
const priceArrow3 = document.getElementById("price-arrow3");
const contentList1 = document.getElementById("content-list1");
const contentList2 = document.getElementById("content-list2");
const contentList3 = document.getElementById("content-list3");

let Arrow1counter = 0;
let Arrow2counter = 0;
let Arrow3counter = 0;


priceArrow1.addEventListener('click', function (e) {
  contentList1.style = `display: block`; 
  contentList2.style = `display: none`;
  contentList3.style = `display: none`;

  Arrow2counter = 0;
  Arrow3counter = 0;

  Arrow1counter += 1;
  if (Arrow1counter === 2) {
    contentList1.style = `display: none`
    Arrow1counter = 0;
  };
});

priceArrow2.addEventListener('click', function (e) {
  contentList2.style = `display: block`;
  contentList1.style = `display: none`;
  contentList3.style = `display: none`;

  Arrow1counter = 0;
  Arrow3counter = 0;

  Arrow2counter += 1;
  if (Arrow2counter === 2) {
    contentList2.style = `display: none`
    Arrow2counter = 0;
  };
});

priceArrow3.addEventListener('click', function (e) {
  contentList3.style = `display: block`;
  contentList1.style = `display: none`;
  contentList2.style = `display: none`;

  Arrow1counter = 0;
  Arrow2counter = 0;

  Arrow3counter += 1;
  if (Arrow3counter === 2) {
    contentList3.style = `display: none`
    Arrow3counter = 0;
  };
});