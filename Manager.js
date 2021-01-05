class Manager{
    constructor(){
        this.sizeList    = this.createSizeList();
        this.heartsList  = this.createHeartsList();
        this.heartsArray = [];
    }
    
    createSizeList(){
        let size = (config.size.max - config.size.min) / config.quantity.sizes;
        let sizeList = [config.size.min];
        for(let i = 1; i < config.quantity.sizes; i++){
            sizeList[i] = sizeList[i-1] + size;
        }
        return sizeList;
    }
    
    createHeartsList(){
        let heartsList = [];
        
        for(let i = 0; i < this.sizeList.length; i++){
            let img = document.createElement('canvas');
            img.width = img.height = this.sizeList[i] + 2;
            let context = img.getContext('2d');
            context.font = `${this.sizeList[i]}px Verdana`;
            context.textAlign = 'center';
            context.strokeStyle = config.color.stroke;
            context.strokeText('❤', this.sizeList[i]/2, this.sizeList[i])
            context.fillStyle = config.color.fill;
            context.fillText('❤', this.sizeList[i]/2, this.sizeList[i])
            heartsList.push(img);
        }
        
        return heartsList;
    }
    
    getHeart(){
        return this.heartsList[random(0, this.heartsList.length)];
    }
    
    draw(){
        ctx.clearRect(0, 0, w, h);
        for(let i = 0; i < this.heartsArray.length; i++){
            if(this.heartsArray[i].y < 0 - this.heartsArray[i].size){
                this.heartsArray.splice(i, 1);
                this.heartsArray.push(new Heart());
            }
            this.heartsArray[i].setPos();
            ctx.drawImage(this.heartsArray[i].draw.img, this.heartsArray[i].draw.x, this.heartsArray[i].draw.y);
        }
    }
}