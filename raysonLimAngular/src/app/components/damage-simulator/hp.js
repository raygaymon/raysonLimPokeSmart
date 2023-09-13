const hp = new HealthBar(20, 20, 50, 30, "green")

const frame = function(){
    context.clearRect
}

export class HealthBar {

    constructor (x , y , w , h , maxHealth, color){
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.maxWidth= w;
        this.color = color
    }

    show(context){
        context.strokeStyle = "#333";
        context.lineWith = "5";
        context.fillStyle = this.color;
        context.fillRect(this.xy, this.y, this.w, this.h);
        context.strokeRect(this.x, this.y, this.maxWidth, this.h);
    }

    
    
}