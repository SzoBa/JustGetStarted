let generalObject = {
    velocity: 0.05,
    speed: 0,
    points: 0,
    collision: false
}


function initGame() {
    document.getElementById('startButton').remove();
    document.getElementById('flapLabel').remove();
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
        if (generalObject.collision) {
            clearInterval(timer);
        } else {
            if (actualBird.style.top >= '91%') {
                actualBird.style.top = '93%';
                generalObject.speed = 0;
                generalObject.collision = true;
                lose();
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
        }
    }, 40);
}

function accelerate(n) {
    generalObject.velocity = n;
}

function birdUp(event) {
    event.preventDefault();
    accelerate(-0.2);
    let bird = document.getElementById('bird');
    bird.classList.remove('birdDown');
    bird.classList.add('birdUp');
}


function birdDown(event) {
    event.preventDefault();
    accelerate(0.05);
    let bird = document.getElementById('bird');
    bird.classList.remove('birdUp');
}


function pipeCheck() {
    let gameArea = document.getElementById('container');
    let pipes = document.getElementsByClassName('pipe');
    for (let pipe of pipes) {
        if (pipe.getBoundingClientRect().x <= (gameArea.getBoundingClientRect().x + 12)) {
            pipe.remove();
            increaseScore();
        }
    }
}

function pipeHandler() {
    let pipePool = [['pipeNorth1', 'pipeSouth1'], ['pipeNorth2', 'pipeSouth2'], ['pipeNorth3', 'pipeSouth3'],
                    ['pipeNorth4', 'pipeSouth4'], ['pipeNorth5', 'pipeSouth5']];
    let gameArea = document.getElementById('container');
    let pipeTimer = setInterval(function () {
        if (generalObject.collision) {
            clearInterval(pipeTimer);
        } else {
            let randomChoice = Math.floor(Math.random() * pipePool.length);
            let actualPipeNorth = pipePool[randomChoice][0];
            let actualPipeSouth = pipePool[randomChoice][1];
            let pipeNorth1 = document.createElement('div');
            pipeNorth1.classList.add('pipe');
            pipeNorth1.setAttribute('id', actualPipeNorth);
            let pipeSouth1 = document.createElement('div');
            pipeSouth1.classList.add('pipe');
            pipeSouth1.setAttribute('id', actualPipeSouth);
            gameArea.appendChild(pipeNorth1);
            gameArea.appendChild(pipeSouth1);
        }
    }, 2000);
    automaticStop();
}

function collisionDetection() {
    let birdPositions = document.getElementById('bird').getBoundingClientRect();
    let pipes = document.getElementsByClassName('pipe');
    for (let pipe of pipes) {
        let pipePosition = pipe.getBoundingClientRect();
        if (pipe.id.includes('North')) {
            if (birdPositions.right >= pipePosition.x && (birdPositions.top < pipePosition.bottom)
                && birdPositions.x < pipePosition.right) {
                lose();
                generalObject.collision = true;
            }
        } else if (pipe.id.includes('South')){
            if (birdPositions.right >= pipePosition.x && (birdPositions.bottom > pipePosition.top)
                && birdPositions.x < pipePosition.right) {
                lose();
                generalObject.collision = true;
            }
        }
    }
}

function lose() {
    document.removeEventListener('mousedown', birdUp);
    document.removeEventListener('mouseup', birdDown);
    let gameOver = document.createElement('div');
    gameOver.innerHTML = 'Game Over';
    gameOver.setAttribute('id', 'game-over');
    let restartMessage = document.createElement('div');
    restartMessage.innerHTML = 'Click to Restart';
    restartMessage.setAttribute('id', 'restart-message');
    document.getElementById('container').appendChild(gameOver);
    document.getElementById('container').appendChild(restartMessage);
    document.getElementById('container').addEventListener('mousedown', restart);
}


function increaseScore() {
    let score = generalObject.points;
    score++;
    generalObject.points = score;
    document.getElementById('score').innerHTML = score;
}

function automaticStop() {
    let autoStop = setInterval(function () {
        if (generalObject.collision) {
            let pipes = document.getElementsByClassName('pipe');
            for (let pipe of pipes) {
                pipe.style.animationPlayState = "paused";
                pipe.classList.remove('pipe');
            }
            if (pipes.length === 0) {
                clearInterval(autoStop);
            }
        }
    },20);
}


function restart() {
    location.reload();

}