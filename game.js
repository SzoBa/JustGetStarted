initGame();

let generalObject = {
    velocity: 0.05,
    speed: 0
}


function initGame() {
    document.getElementById('bird').style.top = '30%';
    document.addEventListener('mousedown', birdUp);
    document.addEventListener('mouseup', birdDown);
    gravity();
    pipeHandler();
}

function gravity() {
    let actualBird = document.getElementById('bird');
    let timer = setInterval(function () {
        let y_position = parseFloat(actualBird.style.top);
        if (actualBird.style.top >= '91%') {
            actualBird.style.top = '93%';
            generalObject.speed = 0;
            lose();
            clearInterval(timer);
        }
        if (actualBird.style.top <= '1%') {
            actualBird.style.top = '1%';
            generalObject.speed = 0;
        }
        generalObject.speed = generalObject.speed + generalObject.velocity;
        y_position = y_position + generalObject.speed;
        actualBird.style.top = y_position + '%';

        pipeCheck();
        collisionDetection();

        let bird = document.getElementById('bird');
        if (generalObject.speed > 1 && !bird.classList.contains('birdUp')) {
        bird.classList.add('birdDown');
        }
    }, 40);
}

function accelerate(n) {
    generalObject.velocity = n;
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
    let pipes = document.getElementsByClassName('pipe');
    for (let pipe of pipes) {
        if (pipe.getBoundingClientRect().x < gameArea.getBoundingClientRect().x) {
            pipe.classList.add('hidden');
        } else if (pipe.classList.contains('hidden')) {
            pipe.classList.remove('hidden');
        }
    }
}

function pipeHandler() {
    let gameArea = document.getElementById('container');
    let pipeNorth1 = document.createElement('div');
    pipeNorth1.classList.add('pipe');
    pipeNorth1.setAttribute('id', 'pipeNorth1');
    let pipeSouth1 = document.createElement('div');
    pipeSouth1.classList.add('pipe');
    pipeSouth1.setAttribute('id', 'pipeSouth1');
    gameArea.appendChild(pipeNorth1);
    gameArea.appendChild(pipeSouth1);
    setTimeout(function () {
        let pipeNorth2 = document.createElement('div');
        pipeNorth2.classList.add('pipe');
        pipeNorth2.setAttribute('id', 'pipeNorth2');
        let pipeSouth2 = document.createElement('div');
        pipeSouth2.classList.add('pipe');
        pipeSouth2.setAttribute('id', 'pipeSouth2');
        gameArea.appendChild(pipeNorth2);
        gameArea.appendChild(pipeSouth2);
    }, 3000);
    setTimeout(function () {
        let pipeNorth3 = document.createElement('div');
        pipeNorth3.classList.add('pipe');
        pipeNorth3.setAttribute('id', 'pipeNorth3');
        let pipeSouth3 = document.createElement('div');
        pipeSouth3.classList.add('pipe');
        pipeSouth3.setAttribute('id', 'pipeSouth3');
        gameArea.appendChild(pipeNorth3);
        gameArea.appendChild(pipeSouth3);
    }, 6000);
}

function collisionDetection() {
    let birdPositions = document.getElementById('bird').getBoundingClientRect();
    let pipes = document.getElementsByClassName('pipe');
    for (let pipe of pipes) {
        let pipePosition = pipe.getBoundingClientRect();
        if (pipe.id.includes('North')) {
            if (birdPositions.right >= pipePosition.x && (birdPositions.top < pipePosition.bottom) && birdPositions.x < pipePosition.right) {
                lose();
            }
        } else if (pipe.id.includes('South')){
            if (birdPositions.right >= pipePosition.x && (birdPositions.bottom > pipePosition.top) && birdPositions.x < pipePosition.right) {
                lose();
            }
        }
    }
}

function lose() {
    let loseScreen = document.createElement('div');
    loseScreen.innerHTML = 'YOU LOST';
    loseScreen.classList.add('loseScreen');
    document.getElementById('container').remove();
    document.getElementsByTagName('main')[0].appendChild(loseScreen);
}