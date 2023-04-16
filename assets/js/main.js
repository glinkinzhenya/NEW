// $('.navbar-hamburger').click(function () {
//   $(this).toggleClass('open');
//   // $('.navbar__list').toggleClass('open');

//   $('.navbar__list').stop(true, true).slideToggle(500);

// });

// Убираем title and description, зв`язатися 
const headerNavbarBtn = document.querySelector(".header-navbar__btn");
const headerContentTitle = document.querySelector(".header-content__title");
const headerContentDescription = document.querySelector(".header-content__description");
const headerContentAction = document.querySelector(".header-content__action");

headerNavbarBtn.addEventListener("click", () => {
  headerContentTitle.classList.toggle("none");
  headerContentDescription.classList.toggle("none");
  headerContentAction.classList.toggle("none");
});


// Бургер 

// // !для информации значек $ это начит вызов библиотеки jquery
// $(document).ready(function () {
//   // !заменили ID на наш клас .header-navbar__btn
//   $('.header-navbar__btn').click(function () {
//     $(this).toggleClass('open');
//     // способ 1
//     // $('.header-navbar__list').toggleClass('header-navbar__list--active');
//     // способ 2
//     $('.header-menu__left-list').stop(true, true).slideToggle(500);
//   });
// });

$(document).ready(function () {
  $(window).scroll(function () {
    var scrollPosition = $(this).scrollTop();
    if (scrollPosition > 0 && headerNavbarBtn.classList.contains('open')) {
      $('.header-navbar__btn').removeClass('open');
      $('.header-menu__left-list').stop(true, true).slideUp(500);

      headerContentTitle.classList.toggle("none");
      headerContentDescription.classList.toggle("none");
      headerContentAction.classList.toggle("none");

    }
  });
  $('.header-navbar__btn').click(function () {
    $(this).toggleClass('open');
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




// // Отключаем прокрутку страницы
// const body = document.querySelector("body");
// headerNavbarBtn.addEventListener("click", () => {
//   body.classList.toggle("body");
// });


// window.addEventListener('scroll', function () {
//   let scrolled = window.scrollY;

//   if (scrolled > 0 && !headerNavbarBtn.classList.contains('clicked')) {
//     headerNavbarBtn.click();
//     button.classList.add('clicked');
//   }
// });


// Создаем портфолио
const portfolioBox = document.querySelector(".portfolio-box");

function portfolio() {
  let i = 1;

  const data = {
    1: "portfolio/computer/computer.html",
    2: "portfolio/organic/index.html",
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
    if (i === 13) clearInterval(y);
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



// Добавление комментариев 

// отправка на сервер

const API = "https://63f0efbb5b7cf4107e299645.mockapi.io";

async function controller(type = "GET", action, body) {
  const params = {
    method: type,
    headers: {
      'Content-Type': "application/json",
    }
  }
  if (body) {
    params.body = JSON.stringify(body);
  }
  const response = await fetch(action, params);
  const data = await response.json();
  return data;
};


// замена фото
// ! IMAGE BASE 64
const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => resolve("");
  });
};

const oldAvatar = document.querySelector(".love-comment__info-image");
const newAvatar = document.querySelector("#newAvatar");
const commentButton = document.querySelector(".love-comment__button");
const infoName = document.querySelector(".love-comment__info-name");
const commentInput = document.querySelector(".love-comment__input");

// подмена на сайте
newAvatar.addEventListener('change', function () {
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      oldAvatar.setAttribute('src', e.target.result);
    };
    reader.readAsDataURL(this.files[0]);
  }
});

// кнопка отправки
commentButton.addEventListener("click", async () => {

  const avatar = await getBase64(newAvatar.files[0]);

  const response = await controller("POST", `${API}/comments`, {
    name: infoName.value,
    comment: commentInput.value,
    avatar: avatar,
  })
});


// показываем стрелочку при прокрутке

var myElement = document.querySelector('#arrowColor');

window.addEventListener('scroll', function () {
  var scrollPosition = window.scrollY;
  var windowHeight = window.innerHeight;

  if (scrollPosition >= windowHeight) {
    myElement.classList.remove('none');
  } else {
    myElement.classList.add('none');
  }
});



// появляющееся окно к комментариям 
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
const collapseExample = document.getElementById('collapseExample')
const myInput = document.querySelector('.love-comment__input');
const loveName = document.querySelector('.love-comment__info-name');
const loveImage = document.querySelector('.love-comment__info-image');



if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
    myInput.value = '';
    loveName.value = '';
    newAvatar.value = '';
    loveImage.setAttribute('src', 'assets/img/foto-icon1.png');

    setTimeout(() => {
      collapseExample.classList.remove('show')
    }, 6000);

  })
}




const pulseButton = document.querySelector('.pulse-button');
const pulseButtonImg = document.querySelector('.pulse-button-image');
const pulseButtonImg2 = document.querySelector('.pulse-button-image2');
const pulseButtonIcon = document.querySelector('.pulse-button-icon');

pulseButton.addEventListener('click', () => {
  pulseButtonImg.classList.toggle('rotate');
  pulseButtonImg.classList.toggle('opacity-image');
  pulseButtonImg2.classList.toggle('rotate');
  pulseButtonImg2.classList.toggle('opacity-image');
  pulseButtonIcon.classList.toggle('pulse-button-icon_bottom');
  pulseButtonIcon.classList.toggle('opacity-image');

  // setTimeout(() => {
  //   // pulseButtonImg.classList.remove('rotate');
  //   // pulseButtonImg.classList.add('cross');
  // }, 500);
});