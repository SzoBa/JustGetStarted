initGame();

function initGame() {
    gravity();
    // Your game can start here, but define separate functions, don't write everything in here :)

}


function gravity() {
    let speed = 5;
    let y_pos = 0;
    let pos = document.getElementById('bird');
    let timer = setInterval(function () {
        if (pos.style.top === '93%') {
            clearInterval(timer);
        } else {
            speed++;
            pos.style.top = speed + '%';
        }
    }, 50);
}
