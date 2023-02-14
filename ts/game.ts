import Snake from "./snake"
import ScorePanel from "./scorePanel"
import Food from "./food"
class Game{
    snake:Snake
    food:Food
    scorePanel:ScorePanel
    direction:string = ''
    timer:number = 300
    isLive:Boolean = true 
    dialog:HTMLDialogElement
    constructor(){
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()
        this.dialog = document.getElementsByTagName('dialog')[0]
        this.init()
    }
    init(){
        document.addEventListener('keydown',this.keydownHandler.bind(this))
        this.run()
    }
    keydownHandler(event:KeyboardEvent){
        this.direction = event.key
    }
    checkEat(X:number,Y:number){
        if(X === this.food.X&&Y === this.food.Y){
            this.food.randBirth()
            this.scorePanel.addScore()
            this.snake.addBody()
        }
    }
    run(){
        let X = this.snake.X
        let Y = this.snake.Y
        switch(this.direction){
            case "ArrowUp":
            case "Up":
                Y -= 10
                break
            case "ArrowDown":
            case "Down":
                Y += 10
                break
            case "ArrowLeft":
            case "Left":
                X -= 10
                break
            case "ArrowRight":
            case "Right":
                X += 10
                break
        }

        this.checkEat(X,Y)

        try{
            this.snake.X = X
            this.snake.Y = Y
        }catch(e:any){
            let dialogtext = this.dialog.getElementsByTagName('h2')[0]
            dialogtext.innerText = e.message+"GAME OVER"
            this.dialog.showModal();
            this.isLive = false
            let restart = this.dialog.getElementsByTagName('button')[0]
            restart.addEventListener("click",()=>{
                document.location.reload()
                this.dialog.close()
            })
        }
        this.timer = 300 - (this.scorePanel.level - 1) * 30
        //开启轮询
        this.isLive&&setTimeout(this.run.bind(this),this.timer)
    }
}
export default Game