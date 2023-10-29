let start = false;
let count = 0;
let cards = [...Array(16).keys()];
let game = [[0,1], [2,3], [4,5], [6,7], 
[8,9], [10,11], [12,13], [14,15]]
let current, attempts, timer, seconds;

const bannerImg = 'url(media/banner.png)';
const circleImg = 'url(media/circle.png)';
const heartImg = 'url(media/heart.png)';
const octagonImg = 'url(media/octagon.png)';
const ovalImg = 'url(media/oval.png)';
const rectangleImg = 'url(media/rectangle.png)';
const squareImg = 'url(media/square.png)';
const wavyImg = 'url(media/wavy.png)';

const startButton = document.querySelector('#btn-start')
const images = document.querySelectorAll('img');

function init() {
    startButton.addEventListener('click', handleButtonClick);

    images.forEach((img) => {
        img.addEventListener('click', handleImageClick);
    });

    attempts = 0
    count = 0
    seconds = 0
    startButton.innerHTML = 'start';
    current = [-1, -1];

    cards.forEach( card => {
        const rng = Math.floor(Math.random() * 16)
        const temp = cards[card]
        cards[card] = cards[rng]
        cards[rng] = temp
    })

    setAttempts(attempts)
    setTimer(seconds)
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
    if (startButton.innerHTML == 'start') {
        startButton.innerHTML = 'restart';
        seconds = 0;
        timer = setInterval(() => {
            seconds += 1;
            setTimer(seconds);
        }, 1000);
    } else {
        clearInterval(timer);
        init();
    }
}

function handleImageClick(evt) {
    if (startButton.innerHTML == 'restart') {
        attempts++;
        if (count < 2) {
            count++;
            evt.target.style.opacity = '100%';
            const background = Array.prototype.slice.call(
                document.querySelector('#game').children
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
                        images[current[0]].removeEventListener(
                            'click',
                            handleImageClick
                        );
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
                        handleGameOver();
                    }
                }
                count = 0;
            }, 500);
        }
        setAttempts(attempts);
    }
}

init()

function setAttempts(count) {
    document.querySelector('.attempts').innerHTML = count;
}

function setTimer(count) {
    document.querySelector('.time').innerHTML = count + ' s';
}

function handleGameOver() {
    clearInterval(timer);
    const gameOver = document.createElement('div')
    gameOver.setAttribute('id', 'game-over')
    gameOver.innerHTML = `<h3>You Win!</h3>
                          <p>
                              Time: ${seconds} s Attempts: ${attempts}
                          </p>
                          <button id="btn-restart">play again</button>`
    const game = document.querySelector('#game')
    game.appendChild(gameOver)
    const restartButton = document.querySelector('#btn-restart')
    restartButton.addEventListener('click', function () {
        init()
        game.removeChild(gameOver)
    })
}