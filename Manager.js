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
    
    click(coordinates){
        for(let i = 0; i < this.heartsArray.length; i++){
            if(coordinates.x >= this.heartsArray[i].x && coordinates.x <= this.heartsArray[i].x + this.heartsArray[i].img.width){
                if(coordinates.y >= this.heartsArray[i].y && coordinates.y <= this.heartsArray[i].y + this.heartsArray[i].img.width){
                    this.createChildrens(this.heartsArray[i]);
                    this.heartsArray[i].reposition(this.getHeart());
                    return;
                }
            }
        }
    }
    
    createChildrens(parent){
        let quantity = random(4,10);
        for(let i = 0; i < quantity; i++){
            let size = random(30, parent.img.width/2);
            this.size -= size;
            if(size < 30){
                size = 30;
            }
            this.heartsArray.push(new Heart(this.getHeart(), size, parent.x, parent.y, 10,10, true));
        }
    }
    
    draw(){
        ctx.clearRect(0, 0, w, h);
        if(this.heartsArray.length < config.quantity.heartsOnScreen){
            this.heartsArray.push(new Heart(this.getHeart()));
        }
        
        for(let i = 0; i < this.heartsArray.length; i++){
            this.heartsArray[i].setPos();
            ctx.drawImage(this.heartsArray[i].image.img, this.heartsArray[i].image.x, this.heartsArray[i].image.y);
            if(this.heartsArray[i].y < 0 - this.heartsArray[i].img.height){
                if(this.heartsArray[i].children == false){
                    this.heartsArray[i].reposition(this.getHeart());
                }else{
                    this.heartsArray.splice(i,1);
                }
            }
            
            
        }
    }
}