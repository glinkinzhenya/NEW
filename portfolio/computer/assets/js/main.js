// !для информации значек $ это начит вызов библиотеки jquery

$(document).ready(function () {
	// !заменили ID на наш клас .header-navbar__btn
	$('.header-navbar__btn').click(function(){
		$(this).toggleClass('open');
		// способ 1
		// $('.header-navbar__list').toggleClass('header-navbar__list--active');
		// способ 2
		$('.header-navbar__list').stop(true,true).slideToggle(500);
	});
});


// Часы
const sec = document.getElementById("sec");
const minutes = document.getElementById("minutes");

let time = 60
let time2 = 59

sec.innerText = time
setInterval(() => {
	time -= 1;
	sec.innerText = time
	if (time === 0) {
		time = 60;
	}
}, 1000);

setInterval(() => {
	time2 -= 1;
	minutes.innerText = time2
}, 60000);


// Кнопка
const listWrapp = document.querySelector(".header-menu__btn");
const div = document.querySelector(".div");
const black = document.querySelector(".black");
const form = document.querySelector(".form-header");

listWrapp.addEventListener("click", () => {
	div.classList.remove("none");
	black.classList.remove("none");

	let width = 0;
	let height = 0;

	let h = setInterval(() => {
		if (height < 250) height += 10;
		if (width < 450) {
			width += 10;
		} else {
			clearTimeout(h);
			form.classList.remove("none");
		}
		div.style = `width: ${width}px; height: ${height}px`;
	}, 5);
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