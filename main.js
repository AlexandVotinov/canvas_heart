const $CANVAS = document.createElement('canvas');
$CANVAS.id = 'canvas';
$CANVAS.style.zIndex = '-1000';
$CANVAS.style.position = 'absolute';
$CANVAS.style.top = 0;
$CANVAS.style.left = 0;
document.body.append($CANVAS);
const ctx = $CANVAS.getContext('2d');

let hearts = [];

let w = $CANVAS.width = window.innerWidth;
let h = $CANVAS.height = window.innerHeight;


$CANVAS.addEventListener('click', function(e){
    let pos = {
        x: e.clientX,
        y: e.clientY,
    }
    searchHeart(pos);
})

function searchHeart(pos){
    for(let i = 0; i < hearts.length; i++){
        if(pos.x >= hearts[i].x && pos.x <= hearts[i].x + hearts[i].size){
            if(pos.y >= hearts[i].y && pos.y <= hearts[i].y + hearts[i].size){
                hearts[i].burst();
                hearts.splice(i, 1);
                return;
            }
        }
    }
}

let app = new Manager();

function step() {

    

    app.draw();
    
    

    
    window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);







function random(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

