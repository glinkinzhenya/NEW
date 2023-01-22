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

