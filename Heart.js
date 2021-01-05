class Heart{
    constructor(img, x, y, corX, corY, children){
        this.img = img;
        this.x   = x || random(-(img.width/2), w);
        this.y   = y || h + img.height;
        this.corX = corX || 0;
        this.corY = corY || 0;
        this.speed = this.setSpeed();
        this.children = children || false;
    }

    
    get image(){
        return {
            img: this.img,
            x: this.x,
            y: this.y
        };
    }
    
    reposition(img){
        this.img = img;
        this.y = h;
        this.x = random(0, w - img.width);
    }
    
    setSpeed(){
        return random(config.speed.min, config.speed.max);
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
          this.x += this.corX*2;
            if(this.corX < 0){
                this.corX += 0.5;   
            }
            if(this.corX > 0){
                this.corX -= 0.5;   
            }
        }
    }
}