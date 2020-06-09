initGame();

let gravityObject = {
    gravity: 0.05,
    gravitySpeed: 0
}

function initGame() {
    document.getElementById('bird').style.top = '30%';
    // document.addEventListener('keypress', birdMove);
    gravity();
}

function gravity() {
    let pos = document.getElementById('bird');
    let timer = setInterval(function () {
    let y_position = parseFloat(pos.style.top);
        if (pos.style.top >= '91%') {
            pos.style.top = '93%';
            gravityObject.gravitySpeed = 0;
        }
        if (pos.style.top <= '1%') {
            pos.style.top = '0%';
            gravityObject.gravitySpeed = 0;
        }
        gravityObject.gravitySpeed = gravityObject.gravitySpeed + gravityObject.gravity;
        y_position = y_position + gravityObject.gravitySpeed;
        pos.style.top = y_position + '%';
    }, 40);
}

function accelerate(n) {
    gravityObject.gravity = n;
}