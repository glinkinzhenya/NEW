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



const left = document.querySelector(".portfolio-box__left")
const right = document.querySelector(".portfolio-box__right")
const image = document.querySelector(".portfolio-box__picture")

let y = 1;

setInterval(() => {
    image.setAttribute("src", `assets/img/${y}.jpg`);
    y += 1;
    if (y === 12) y = 1;
}, 2000);

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


// левая стрелочка в портфолио

const leftImage = document.querySelector(".portfolio-box__left-image");

left.onmouseenter = () => leftImage.setAttribute("src", `assets/img/arrow_left_2.png`);
left.onmouseleave = () => leftImage.setAttribute("src", `assets/img/arrow_left_1.png`);



const smoothLinks = document.querySelector('a[href="#contacts"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        console.log("huy");
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};


