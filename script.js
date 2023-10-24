let start = false
let count = 0;

const bannerImg = 'url(media/banner.png)';
const circleImg = 'url(media/circle.png)';
const heartImg = 'url(media/heart.png)';
const octagonImg = 'url(media/octagon.png)';
const ovalImg = 'url(media/oval.png)';
const rectangleImg = 'url(media/rectangle.png)';
const squareImg = 'url(media/square.png)';
const wavyImg = 'url(media/wavy.png)';

const button = document.querySelector('button')
const images = document.querySelectorAll('img');

images.forEach((img) => {
    img.style.backgroundImage = octagonImg;
});


button.addEventListener('click', handleButtonClick)

images.forEach((img) => {
    img.addEventListener('click', handleImageClick);
});

function handleButtonClick() {
    if (button.innerHTML == 'start') {
        button.innerHTML = 'restart';
    } else {
        init();
    }
}

function handleImageClick(evt) {
    count++;
    if (button.innerHTML == 'start') {
        evt.target.style.opacity = '0';
    } else {
        evt.target.style.opacity = '100%';
    }
    if (count > 2) {
        console.log('hello?');
        images.forEach((img) => {
            img.style.opacity = '0';
        });
    }
}

function init() {
    count = 0
    button.innerHTML = 'start';
    images.forEach((img) => {
        img.style.opacity = '0';
    });
}

init()

