let start = false;
let count = 0;
let cards = [...Array(16).keys()];
let game = [[0,1], [2,3], [4,5], [6,7], 
[8,9], [10,11], [12,13], [14,15]]
let current;

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



function init() {

    button.addEventListener('click', handleButtonClick);

    images.forEach((img) => {
        img.addEventListener('click', handleImageClick);
    });

    count = 0
    button.innerHTML = 'start';
    current = [-1, -1];

    cards.forEach( card => {
        const rng = Math.floor(Math.random() * 16)
        const temp = cards[card]
        cards[card] = cards[rng]
        cards[rng] = temp
    })

    console.log(cards);

    images.forEach((img, i) => {
         if (i == cards[0] || i == cards[1]) {
            img.style.backgroundImage = bannerImg
         }
         if (i == cards[2] || i == cards[3]) {
            img.style.backgroundImage = circleImg;
         }
         if (i == cards[4] || i == cards[5]) {
            img.style.backgroundImage = heartImg;
         }
         if (i == cards[6] || i == cards[7]) {
            img.style.backgroundImage = octagonImg;
         }
         if (i == cards[8] || i == cards[9]) {
            img.style.backgroundImage = ovalImg;
         }
         if (i == cards[10] || i == cards[11]) {
            img.style.backgroundImage = rectangleImg;
         }
         if (i == cards[12] || i == cards[13]) {
            img.style.backgroundImage = squareImg;
         }
         if (i == cards[14] || i == cards[15]) {
            img.style.backgroundImage = wavyImg;
         }
        img.style.opacity = '0';
    });
}


function handleButtonClick() {
    if (button.innerHTML == 'start') {
        button.innerHTML = 'restart';
    } else {
        init();
    }
}

function handleImageClick(evt) {
    if (button.innerHTML == 'restart') {
        console.log('click')
        if (count < 2) {
            count++;
            evt.target.style.opacity = '100%';
            const background = Array.prototype.slice.call(
                document.querySelector('main').children
            );
            current[count - 1] = background.indexOf(evt.target.parentElement);
        }
        if (count == 2) {
            setTimeout(() => {
                let match = false;
                game.forEach((combo) => {
                    let matchingCombo = Array(cards[combo[0]], cards[combo[1]]);
                    if (
                        current.sort().toString() ==
                        matchingCombo.sort().toString()
                    ) {
                        match = true;
                        images[current[0]].removeEventListener('click', handleImageClick)
                        images[current[1]].removeEventListener(
                            'click',
                            handleImageClick
                        );
                    }
                });
                if (match == false) {
                    images[current[0]].style.opacity = '0';
                    images[current[1]].style.opacity = '0';
                } else {
                    let gameOver = true;
                    images.forEach((img) => {
                        if (img.style.opacity == '0') gameOver = false;
                    });
                    if (gameOver) {
                        setTimeout(() => {
                            init();
                        }, 1000);
                    }
                }
                count = 0;
            }, 500);
        }
    }
}

init()
