const $CANVAS = document.createElement('canvas');
$CANVAS.id = 'canvas';
$CANVAS.style.zIndex = '-1000';
$CANVAS.style.position = 'absolute';
$CANVAS.style.top = 0;
$CANVAS.style.left = 0;
document.body.append($CANVAS);

const ctx = $CANVAS.getContext('2d');

let w = $CANVAS.width = window.innerWidth;
let h = $CANVAS.height = window.innerHeight;

$CANVAS.addEventListener('click', function(e){
    manager.click({x: e.clientX, y: e.clientY});
});

let manager = new Manager();

function step() {
    manager.draw();
    window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

function random(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

