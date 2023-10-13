const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
const scoreText = document.getElementById('scoreVal')

const WIDTH = gameBoard.width;
const HIEGHT = gameBoard.height;
const UNIT = 25

let foodX
let foodY
let xVel = 25
let yVel = 0
let score = 0
let active=true;
let started = false;

let snake=[
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
];



starGame()
window.addEventListener('keydown',keyPress);

// startGame funct-1

function starGame(){  
    context.fillStyle='#212121'
    context.fillRect(0,0,WIDTH,HIEGHT);
    creatFood();
    displayFood();
    drawSnake();
    moveSnake();

}



function cleargameBoard(){
    context.fillStyle='#212121'
    context.fillRect(0,0,WIDTH,HIEGHT);

}

// createFood funct-2

function creatFood(){
    foodX= Math.floor(Math.random()*WIDTH/UNIT)*UNIT
    foodY= Math.floor(Math.random()*HIEGHT/UNIT)*UNIT

}

// displayFood funct-3

function displayFood(){
    context.fillStyle="red";
    context.fillRect(foodX,foodY,UNIT,UNIT)
}

// drawSnake funct-4

function drawSnake(){
    context.fillStyle= 'aqua';
    context.strokeStyle = '#212121';
    snake.forEach((snakePart) => {
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT)
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT)
    })
}

// moveSnake funct-5

function moveSnake(){
    const head = {x:snake[0].x+xVel,
                     y:snake[0].y+yVel}
    snake.unshift(head)
    if(snake[0].x==foodX && snake[0].y==foodY){
        score += 1;
        scoreText.textContent = score;
        creatFood()
        
    }
    else
    snake.pop()
    
}

// nextTick funct-6

function nextTick(){
    if(active){
    setTimeout(() => {
        cleargameBoard();
        displayFood();
        moveSnake();
        drawSnake();
        nextTick();
        checkGameOver()
    },600);
}
    else if(!active){
    clearBoard();
    context.font = "bold 50px serif";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Game Over!!",WIDTH/2,HEIGHT/2)
}

}

// keyPress funct-7

function keyPress(event){
    if(!started){
        started = true;
        nextTick();
    
    }
    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40

    switch(true){
        //left key pressed and not going right
        case(event.keyCode==LEFT  && xVel!=UNIT):
            xVel=-UNIT;
            yVel = 0;
            break;
        //right key pressed and not going left
        case(event.keyCode==RIGHT && xVel!=-UNIT):
            xVel=UNIT;
            yVel=0;
            break;
        //Up key pressed and not going down
        case(event.keyCode==UP && yVel!=UNIT):
            xVel=0;
            yVel=-UNIT;
            break;
        //down key pressed and not going up
        case(event.keyCode==DOWN && yVel!=-UNIT):
            xVel=0;
            yVel=UNIT;
            break;

    }
}

// checkGameOver funct-8

function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HIEGHT):
            active=false;
            break;
    }
	
	   for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            active = false;
        }
    }
}