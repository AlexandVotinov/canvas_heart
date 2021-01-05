class Heart{
    constructor(img, x, y, corX, corY){
        this.size  = size || random(config.size.min, config.size.max);
        this.speed = speed || random(config.speed.min, config.speed.max);
        this.x   = x || random(-(this.size/2), w);
        this.y   = y || h + config.size.max;
        this.imgObj = this.drawHeart();
        this.corX = corX || 0;
        this.corY = corY || 0;
    }

    
    get draw(){
        return {
            img: this.imgObj,
            x: this.x,
            y: this.y,
        };
    }
    
    reposition(img){
        
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