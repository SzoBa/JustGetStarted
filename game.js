initGame();

function initGame() {
    gravity();
    // Your game can start here, but define separate functions, don't write everything in here :)

}

function gravity() {
    let pos = document.getElementById('bird');
    let y_position = 30;
    let velocity = 0.01;
    let speed = 0.02;
    let timer = setInterval(function () {
        if (pos.style.top >= '91%') {
            clearInterval(timer);
        } else {
            velocity = velocity + 0.002;
            speed = speed + velocity;
            y_position = y_position + speed;
            pos.style.top = y_position + '%';
        }
    }, 40);
}
