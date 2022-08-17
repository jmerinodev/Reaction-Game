var btn = document.getElementById('btn');

var timer = 0;
var timeout;
var interval;

btn.addEventListener('click', startGame, false);

function startGame() {
    btn.removeEventListener('click', startGame);
    waitingForGreen();
}

function waitingForGreen() {
    btn.addEventListener('click', userClick, false);
    btn.classList.add("in-progress");
    btn.innerHTML = "<h1>... <br/> Wait for Green</h1>";
    var miliseconds = Math.floor(Math.random() * (15 - 10 + 10) + 10) * 100;
    timeout = setTimeout(function() {
        btn.classList.add("press-now");
        btn.innerHTML = "<h1>... <br/> Click!</h1>";
        interval = setInterval(function() {
            timer++;
        }, 1);
    }, miliseconds);
}

function userClick() {
    clearInterval(interval);
    clearTimeout(timeout);
    btn.removeAttribute('class');
    if (timer == 0) {
        btn.classList.add('primary');
        btn.innerHTML = "<h1>Too soon!</h1><p>Click to try again.</p>"
    }
    else {
        btn.classList.add('primary');
        btn.innerHTML = "<h1>" + (timer * 10) + " ms</h1>" + "<p>Click to keep going.</p>";
    }
    btn.removeEventListener('click', userClick, false);
    btn.addEventListener('click', restartGame, false);
}

function restartGame() {
    timer = 0;
    btn.removeAttribute('class');
    btn.removeEventListener('click', restartGame, false);
    waitingForGreen();
}