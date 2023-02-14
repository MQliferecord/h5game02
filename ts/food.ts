class Food{
    private el:HTMLElement
    constructor(){
        this.el=document.getElementById('food')!
    }
    get X(){
        return this.el.offsetLeft
    }
    get Y(){
        return this.el.offsetTop
    }
    //随机生成食物
    randBirth(){
        let left = Math.floor(Math.random()*29)*10;
        let top = Math.floor(Math.random()*29)*10;
        this.el.style.left = left + 'px'
        console.log(this.el.style.left)
        this.el.style.top = top + 'px'
    }
}

export default Food

