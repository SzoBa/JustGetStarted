initGame();

function initGame() {
    document.getElementById('bird').style.top = '30%';
    document.addEventListener('keypress', birdMove);
}


function gravity(stopTimer=false) {
    let pos = document.getElementById('bird');
    let velocity = 0.01;
    let speed = 0.02;
    let timer = setInterval(function () {
       let y_position = parseFloat(pos.style.top);
        if (stopTimer) {
            speed = -1;
            velocity = 0;
        }
        velocity = velocity + 0.002;
        speed = speed + velocity;
        y_position = y_position + speed;
        pos.style.top = y_position + '%';
        if (pos.style.top >= '91%') {
            pos.style.top = '93%';
            clearInterval(timer); //lose
        }
        if (pos.style.top <= '0%') {
            pos.style.top = '0%';
            clearInterval(timer);
        }
    }, 40);
}



function birdMove(event) {
    let stopTimer = false;
    if (event.code === 'Space') {
        event.preventDefault();
        stopTimer = true;

    }
    gravity(stopTimer);
}

