initGame();

let gravityObject = {
    velocity: 0.05,
    speed: 0
}

function initGame() {
    document.getElementById('bird').style.top = '30%';
    document.addEventListener('mousedown', birdUp);
    document.addEventListener('mouseup', birdDown);
    gravity();
}

function gravity() {
    let actualBird = document.getElementById('bird');
    let timer = setInterval(function () {
        let y_position = parseFloat(actualBird.style.top);
        if (actualBird.style.top >= '91%') {
            actualBird.style.top = '93%';
            gravityObject.speed = 0;
            clearInterval(timer);
        }
        if (actualBird.style.top <= '1%') {
            actualBird.style.top = '1%';
            gravityObject.speed = 0;
        }
        gravityObject.speed = gravityObject.speed + gravityObject.velocity;
        y_position = y_position + gravityObject.speed;
        actualBird.style.top = y_position + '%';

        pipeCheck();


        let bird = document.getElementById('bird');
        if (gravityObject.speed > 1 && !bird.classList.contains('birdUp')) {
        bird.classList.add('birdDown');
        }
    }, 40);
}

function accelerate(n) {
    gravityObject.velocity = n;
}

function birdUp() {
    accelerate(-0.2);
    let bird = document.getElementById('bird');
    bird.classList.remove('birdDown');
    bird.classList.add('birdUp');
}


function birdDown() {
    accelerate(0.05);
    let bird = document.getElementById('bird');
    bird.classList.remove('birdUp');
}


function pipeCheck() {
    let gameArea = document.getElementById('container');
    let northPipes = document.getElementsByClassName('pipeNorth');
    let southPipes = document.getElementsByClassName('pipeSouth')
    for (let northPipe of northPipes) {
        if (northPipe.getBoundingClientRect().x < gameArea.getBoundingClientRect().x) {
            northPipe.classList.add('hidden');
        } else if (northPipe.classList.contains('hidden')) {
            northPipe.classList.remove('hidden');
        }
    }
    for (let southPipe of southPipes) {
        if (southPipe.getBoundingClientRect().x < gameArea.getBoundingClientRect().x) {
            southPipe.classList.add('hidden');
        } else if (southPipe.classList.contains('hidden')) {
            southPipe.classList.remove('hidden');
        }
    }
}