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
// function getOpacity() {

//   header.classList.add("header-background__image");

// }
// const header = document.querySelector(".header");
// setTimeout("getOpacity()", 1000);
// const header = document.querySelector(".header");
// window.addEventListener('load', function () {
//   setTimeout(function () {
//     header.style.backgroundImage = "url('../img/WEB_final-01.png')";
//     header.style.transition = "background-image 1s ease-in-out";
//   }, 1000); // 1000 миллисекунд = 1 секунда
// });




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


// // Создаем портфолио
// const portfolioBox = document.querySelector(".portfolio-box");

// function portfolio() {
//   let i = 1;

//   const data = {
//     1: "portfolio/computer/computer.html",
//     2: "portfolio/organic/index.html",
//   }

//   let y = setInterval(() => {
//     const div = document.createElement("div");
//     const link = document.createElement("a");

//     link.setAttribute("href", `${data[i]}`);

//     const img = document.createElement("img");

//     img.setAttribute("src", `assets/img/${i}.jpg`);
//     img.style = `opacity: 0.0`;
//     img.classList.add("portfolio-box__image");
//     link.append(img);
//     div.append(link);

//     portfolioBox.append(div);

//     let n = 0.1;
//     let x = setInterval(() => {
//       img.style = `opacity: ${n}`;
//       n += 0.02;
//       if (n > 1.01) clearInterval(x);
//     }, 10);

//     i += 1;
//     if (i === 13) clearInterval(y);
//   }, 200);
// };

// const height2 = screen.height;
// const height1 = portfolioBox.getBoundingClientRect()
// const heightPortfolio = height1.top - height2 + 400;
// let tr = false;
// window.addEventListener('scroll', function () {
//   if (scrollY > heightPortfolio && tr === false) {
//     portfolio()
//     tr = true;
//   };
// });


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



// Кнопка пульс

$('.pulse-button, .header-black').on('click', function () {
  $('.pulse-button-image').toggleClass('rotate opacity-image');
  $('.pulse-button-image2').toggleClass('rotate opacity-image');
  $('.pulse-button-icon').toggleClass('pulse-button-icon_bottom opacity-image');
  $('.header-black').toggleClass(' active');
});


// меняем положение иконок в последовательности работы
const height2 = screen.height;
const work = document.querySelector('.work');

const workHeight = work.getBoundingClientRect()

const heightWork = workHeight.top - height2 + 800;
let flagOne = false;
let flagTwo = false;
let flagThree = false;
let flagFour = false;
let flagFive = false;
let flagSix = false;

window.addEventListener('scroll', function () {
  if (scrollY > heightWork && flagOne === false) {
    $("#work-one").addClass('work-one');
    $("#work-text1").hide().css({ fontSize: 0 });
    $("#work-image1").fadeOut(200, function () {
      $(this).attr("src", "assets/img/work-icon-color1.png");
      $(this).fadeIn(200);
      $("#work-text1").show().animate({ fontSize: "18px" }, 200);
    });
    flagOne = true;
  };
  if (scrollY > (heightWork + 200) && flagTwo === false) {
    $("#work-two").addClass('work-two');
    $("#work-text2").hide().css({ fontSize: 0 });
    $("#work-image2").fadeOut(200, function () {
      $(this).attr("src", "assets/img/work-icon-color2.png");
      $(this).fadeIn(200);
      $("#work-text2").show().animate({ fontSize: "18px" }, 200);
    });
    flagTwo = true;
  }
  if (scrollY > (heightWork + 300) && flagThree === false) {
    $("#work-three").addClass('work-three');
    $("#work-text3").hide().css({ fontSize: 0 });
    $("#work-image3").fadeOut(200, function () {
      $(this).attr("src", "assets/img/work-icon-color3.png");
      $(this).fadeIn(200);
      $("#work-text3").show().animate({ fontSize: "18px" }, 200);
    });
    flagThree = true;
  }
  if (scrollY > (heightWork + 400) && flagFour === false) {
    $("#work-four").addClass('work-four');
    $("#work-text4").hide().css({ fontSize: 0 });
    $("#work-image4").fadeOut(200, function () {
      $(this).attr("src", "assets/img/work-icon-color4.png");
      $(this).fadeIn(200);
      $("#work-text4").show().animate({ fontSize: "18px" }, 200);
    });
    flagFour = true;
  }
  if (scrollY > (heightWork + 500) && flagFive === false) {
    $("#work-five").addClass('work-five');
    $("#work-text5").hide().css({ fontSize: 0 });
    $("#work-image5").fadeOut(200, function () {
      $(this).attr("src", "assets/img/work-icon-color5.png");
      $(this).fadeIn(200);
      $("#work-text5").show().animate({ fontSize: "18px" }, 200);
    });
    flagFive = true;
  }
  if (scrollY > (heightWork + 700) && flagSix === false) {
    $("#work-six").addClass('work-six');
    $("#work-text6").hide().css({ fontSize: 0 });
    $("#work-image6").fadeOut(200, function () {
      $(this).attr("src", "assets/img/work-icon-color6.png");
      $(this).fadeIn(200);
      $("#work-text6").show().animate({ fontSize: "18px" }, 200);
    });
    flagSix = true;
  }
});



// Технологии открытия куба на мобильной версии

// Получаем текущую ширину окна браузера
var windowWidth = $(window).width();
// переключатель
let cubMobileOn = true;
// Обработчик события для кнопки
$('.wrap').on('click', function () {

  if (windowWidth < 768 && cubMobileOn) {
    $(".front").css({ 'transform': 'translateZ(100px)' });
    $(".back").css({ 'transform': 'translateZ(-100px) rotateY(180deg)' });
    $(".right").css({ 'transform': 'rotateY(-270deg) translateZ(50px) translateX(50px)' });
    $(".left").css({ 'transform': 'rotateY(270deg) translateZ(50px) translateX(-50px)' });
    $(".top").css({ 'transform': 'rotateX(-270deg) translateZ(50px) translateY(-50px)' });
    $(".bottom").css({ 'transform': 'rotateX(270deg) translateZ(50px) translateY(50px)' });
    cubMobileOn = false;

  } else if (windowWidth < 768 && !cubMobileOn) {
    $(".front").css({ 'transform': 'translateZ(50px)' });
    $(".back").css({ 'transform': 'translateZ(-50px) rotateY(180deg)' });
    $(".right").css({ 'transform': 'rotateY(-270deg) translateX(50px)' });
    $(".left").css({ 'transform': 'rotateY(270deg) translateX(-50px)' });
    $(".top").css({ 'transform': 'rotateX(-270deg) translateY(-50px)' });
    $(".bottom").css({ 'transform': 'rotateX(270deg) translateY(50px)' });
    cubMobileOn = true;
  }
});




// Деньги карточки разъезжаются
$(".money").on("mouseover", function () {
  $(".basic").addClass("basicAction");
  $(".medium").addClass("mediumAction");
});

$(".money").on("mouseout", function () {
  $(".basic").removeClass("basicAction");
  $(".medium").removeClass("mediumAction");
});


// Открытие карточки
$('#basic-card__button').on('click', function () {
  const level = "Basic";
  const money = "₴ 10 000";
  openCard(level, money);
});

$('#pro-card__button').on('click', function () {
  const level = "Pro";
  const money = "₴ 25 000";
  openCard(level, money);
});

$('#medium-card__button').on('click', function () {
  const level = "Medium";
  const money = "₴ 17 000";
  openCard(level, money);
});



// моторчик плавного появления карточки
function openCard(level, money) {
  let levelText = $(".money-box-card__title");
  let moneyText = $(".money-box-card__cash");

  levelText.text(level);
  moneyText.text(money);

  $('.money-black').addClass('active');
  $('.money-card').addClass('active');

  // Функция для добавления класса "money-active__form" с задержкой
  function addClassWithDelay(element, className, delay) {
    setTimeout(() => {
      element.classList.add(className);
    }, delay);
  }
  // Перебираем все элементы и добавляем класс "money-active__form" с задержкой
  const elements = document.querySelectorAll(".money-box-card__image, .money-box-card__title, .money-box-card__cash, .money-box-card__description, .money-box-card__form-input, .money-box-card__form-button, .money-box-card__comment");
  elements.forEach((element, index) => {
    addClassWithDelay(element, "money-active__form", 50 * index);
  });
}

// Закрытие карточки
$('.money-box-card__image').on('click', function () {
  $('.money-black').removeClass('active');
  $('.money-card').removeClass('active');
  $('.money-box-card__image, .money-box-card__title, .money-box-card__cash, .money-box-card__description, .money-box-card__form-input, .money-box-card__form-button, .money-box-card__comment').removeClass('money-active__form');
});


// Движение карточек на мобильной версии

let proMedium = false;

$('.pro').on('click', function () {
  if (windowWidth <= 575) {
    setTimeout(function () {
      $(".pro").css({ 'margin-top': '50px', 'z-index': '2' });
      $(".medium").css({ 'margin-top': '0px', 'z-index': '1' });
      setTimeout(function () {
        $(".pro").css({ 'margin-top': '107px', 'z-index': '3' });
        $(".basic").css({ 'margin-top': '50px', 'z-index': '2' });
      }, 500);
    }, 500);
    proMedium = true;
  }
});

$('.basic').on('click', function () {
  if (windowWidth <= 575) {
    $(".pro").css({ 'margin-top': '0px', 'z-index': '1' });
    $(".medium").css({ 'margin-top': '50px', 'z-index': '2' });
    $(".basic").css({ 'margin-top': '107px', 'z-index': '3' });
  }
});

$('.medium').on('click', function () {
  if (windowWidth <= 575) {
    if (proMedium) {
      setTimeout(function () {
        $(".medium").css({ 'margin-top': '50px', 'z-index': '2' });
        $(".basic").css({ 'margin-top': '0px', 'z-index': '1' });
        setTimeout(function () {
          $(".medium").css({ 'margin-top': '107px', 'z-index': '3' });
          $(".pro").css({ 'margin-top': '50px', 'z-index': '2' });
        }, 500);
      }, 500);
      proMedium = false;
    } else {
      $(".pro").css({ 'margin-top': '0px', 'z-index': '1' });
      $(".medium").css({ 'margin-top': '107px', 'z-index': '3' });
      $(".basic").css({ 'margin-top': '50px', 'z-index': '2' });
    }
  }
});

// Контакты
let element = document.getElementById('phone');

element.addEventListener("click", e => {
  let maskOptions = {
    mask: '+38 (000) 000-00-00',
    lazy: false
  }
  let mask = new IMask(element, maskOptions);
});

// Potrfolio

// const time = 5000;
// const step = 1;

// function outNum(num, elem) {
//   let l = document.querySelector('#' + elem);
//   let n = 0;
//   let t = Math.round(time / (num / step));
//   let interval = setInterval(() => {
//     n = n + step;
//     if (n == num) {
//       clearInterval(interval);
//     }
//     l.innerHTML = n;
//   },
//     t);
// }

// outNum(875, 'out-1');


// Портфолио
const cards = [
  {
    name: 'Hillel',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit porro soluta blanditiis.',
    image: 'img/1.jpg',
    link:'https://lms.ithillel.ua/auth',
  },
  {
    name: 'Gramofon',
    description: 'fvnkjnvkrn nvgkrj envr nvkjt nvjt nktj nkvjn jtnjtn ',
    image: 'img/2.jpg',
    link: 'https://gramofon.ua/photocard',
  },
  {
    name: 'Netflix',
    description: 'jrnevkrjnerkjnkejnkjetrnnorfnr frf 4irjf4ifj54 5jf v tnvj rt gbr yj5 6gj65h6',
    image: 'img/3.jpg',
    link: 'https://www.netflix.com/browse',
  },
  {
    name: 'Translate',
    description: 'frkkr fnkjrnkrrfnr frf 4irjf4ifj54 5jf v tnvj rt gbr yj5 6gj65h6',
    image: 'img/4.jpg',
    link: 'https://translate.google.com/?hl=ru',
  },
  {
    name: 'Github',
    description: 'frkkr frfrnfr f rf rfrrf 4irjf4ifj54 5jf v tnvj rt gbr yj5 6gj65h6',
    image: 'img/5.jpg',
    link: 'https://github.com',
  },
  {
    name: 'Docs',
    description: 'frkkr frfrnfr f rf rfccfcfcfnorfnr frf 4irjf4ifj54 5jf v tnvj rt gbr yj5 6gj65h6',
    image: 'img/6.jpg',
    link: 'https://docs.google.com/spreadsheets/u/0/',
  },
  {
    name: 'Revenuebot',
    description: 'frkkr vfvfvfv rfr f rf rfjrfnorfnr frf 4irjf4ifj54 5jf v tnvj rt gbr yj5 6gj65h6',
    image: 'img/7.jpg',
    link: 'https://revenuebot.io',
  }
];

// функция которая собирает 4 карточки
function createCard() {
  cards.forEach((card, index) => {
    if (index === 0) {
      $('.portfolio-wrapper__info-title').text(`${card.name}`);
      $('.portfolio-wrapper__info-description').text(`${card.description}`);
      $('.portfolio-first').css('background-image', `url(assets/${card.image})`);
      $('.portfolio-wrapper__info-button').attr('href', `${card.link}`);
    }
    if (index === 1) $('.portfolio-second').css('background-image', `url(assets/${card.image})`);
    if (index === 2) $('.portfolio-third').css('background-image', `url(assets/${card.image})`);
    if (index === 3) $('.portfolio-fourth').css('background-image', `url(assets/${card.image})`);
  });
};
// вызов функции
createCard()

// появляется кнопка на 3 клике 
let numberCard = 0;
$('.portfolio-click').on("click", () => {
  numberCard += 1;
  if (numberCard === 2) $('.portfolio-wrapper__info-button-all').css('display', 'block');
  
  const firstCard = cards.shift();  // Удаляем первый элемент и сохраняем его в переменной
  cards.push(firstCard);  // Добавляем удаленный элемент в конец массива
  createCard()
});

// кнопка открыть все портфолио
$('.portfolio-wrapper__info-button-all').on("click", () => {
  $('.portfolio-window__image-wrapper').empty();
  $('.money-black').addClass('active');
  $('.portfolio-window').addClass('active');
  $.each(cards, function (index, card) {
    const portfolioWindowLink = $("<a>").attr("href", card.link).attr("target", "_blank");
    const portfolioWindowImg = $("<img>").attr("src", "assets/" + card.image).addClass("portfolio-window__image-link");
    portfolioWindowLink.append(portfolioWindowImg);
    $(".portfolio-window__image-wrapper").append(portfolioWindowLink);
    $('.portfolio-window__image-link').css('filter', 'blur(5px)');
    $('.portfolio-window__image-link').css('opacity', '0.7');
    setTimeout(function () {
      $('.portfolio-window__image-link').css('filter', 'none');
      $('.portfolio-window__image-link').css('opacity', '1');
    }, 1);
  });
});

$('.portfolio-window__image').on('click', function () {
  $('.money-black').removeClass('active');
  $('.portfolio-window').removeClass('active');
});

