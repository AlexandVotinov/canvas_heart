const $CANVAS = document.getElementById('canvas');
const ctx = $CANVAS.getContext('2d');

const config = {
    maxHeart: 20,
    maxSpeed: 2,
    minSpeed: 0.5,
    maxSize: 200,
    minSize: 80,
}

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
        if(pos.x >= (hearts[i].x - hearts[i].size/2) && pos.x <= (hearts[i].x + hearts[i].size/2)){
            if(pos.y >= (hearts[i].y - hearts[i].size) && pos.y <= (hearts[i].y + hearts[i].size/2)){
                let obj = hearts[i];
                hearts.splice(i, 1);
                let quantity = random(2,6);
                for(let i = 0; i < quantity; i++){
                    let heart = new Heart(obj.size/quantity, random(config.maxSpeed, config.maxSpeed*2), obj.x - random(-20, 20), obj.y - random(-20, 20), random(-10, 10), random(-10, 10));
                    hearts.push(heart);
                }
                return
            }
        }
    }
}

function step() {
    ctx.clearRect(0, 0, w, h);
    if(hearts.length < config.maxHeart){
        let heart = new Heart(random(config.minSize, config.maxSize), random(config.minSpeed, config.maxSpeed), random(0, w), h + config.maxSize);
        hearts.push(heart);
    }
    
    for(let i = 0; i < hearts.length; i++){
        
        hearts[i].setPos();
        
        ctx.font = `${hearts[i].size}px Verdana`; 
        ctx.strokeStyle = 'rgba(100, 10, 30, 1)';
        ctx.textAlign = 'center';
        ctx.strokeText("❤", hearts[i].x, hearts[i].y);      
        

        
        if(hearts[i].y < 0 - config.maxSize){
            hearts.splice(i, 1);
        }
    }
    window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

function random(min, max){
    return Math.random() * (max - min) + min;
}


class Heart{
    constructor(size, speed, x, y, corX, corY){
        this.size  = size;
        this.speed = speed;
        this.x   = x;
        this.y   = y;
        this.corX = Math.floor(corX) || 0;
        this.corY = Math.floor(corY) || 0;
    }
    
    setPos(){
        this.y -= this.speed;
        this.y -= this.corY;
        
        if(this.corY !== 0){
          this.y += this.corY*2;
            if(this.corY < 0){
                this.corY += 0.5;   
            }
            if(this.corY > 0){
                this.corY -= 0.5;   
            }
        }
        
        if(this.corX !== 0){
          this.x += this.corX;
            if(this.corX < 0){
                this.corX += 0.5;   
            }
            if(this.corX > 0){
                this.corX -= 0.5;   
            }
        }
    }
}