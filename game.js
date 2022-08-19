var container = document.getElementById('container');
var elapsedTime = 0;
var timeout;
var interval;

container.addEventListener('click', startGame, false);

function startGame() {
    container.removeEventListener('click', startGame);
    waitForGreen();
}

function waitForGreen() {
    container.addEventListener('click', captureUserClick, false);
    container.classList.add("in-progress");
    container.innerHTML = "<h1>... <br/> Wait for Green</h1>";
    timeout = setTimeout(function() {
        container.classList.add("press-now");
        container.innerHTML = "<h1>... <br/> Click!</h1>";
        var start = new Date().getTime();
        interval = setInterval(function() {
            var now = new Date().getTime();
            elapsedTime = (now - start);
        }, 40);
    }, getRandomMiliseconds());
}

function getRandomMiliseconds() {
    return Math.floor(Math.random() * (20 - 10 + 10) + 10) * 100;
}

function captureUserClick() {
    clearInterval(interval);
    clearTimeout(timeout);
    container.removeAttribute('class');
    if (elapsedTime == 0) {
        container.classList.add('primary');
        container.innerHTML = "<h1>Too soon!</h1><p>Click to try again.</p>"
    }
    else {
        container.classList.add('primary');
        container.innerHTML = "<h1>" + elapsedTime + " ms</h1>" + "<p>Click to keep going.</p>";
    }
    container.removeEventListener('click', captureUserClick, false);
    container.addEventListener('click', restartGame, false);
}

function restartGame() {
    elapsedTime = 0;
    container.removeAttribute('class');
    container.removeEventListener('click', restartGame, false);
    waitForGreen();
}