//ctx
let canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "10px solid black";
canvas.style.background = "rgb(56,52,92)"

//Dom
let startBtn = document.querySelector("#start")
let restartBtn = document.querySelector("#restart")
let menuBtn = document.querySelector("#menu")
let instructions = document.querySelector("#instructions")
let gameScreen = document.querySelector("#game")
let scoreTxt = document.querySelector("#scoreTxt")
let insultTxt = document.querySelector("#insultTxt")
let gameOverScreen = document.querySelector("#gameOver")

//variables
let intervalId = 0
let isGameOver = false
let isVictory = false
let score = 0
let isRight = false
let isLeft = false

//char vars
let charX = 300
let charY = 300
let charWidth = 50
let charHeight = 50

// char coordinates
let charTopL = charX
let charBotR = charY + charHeight + charWidth
let charBot = charY + charHeight

//obstacle vars
let obsGap = 600
let obsSpeed = 3

let obs1X = 0
let obs1Length = 300
let obs1Y = 300
let obs1Gap = 50

let obs2X = 0
let obs2Length = 450
let obs2Y = obs1Y + obsGap
let obs2Gap = 100

let obs3X = 0
let obs3Length = 150
let obs3Y = obs1Y + 2 * obsGap
let obs3Gap = 100

let obs4Length = 500
let obs4Height = 60
let obs4X = 65
let obs4Y = obs1Y + 3 * obsGap

//opacity var
let opacity = 0.0

//bg vars
let bgY = 0
let bg1Speed = 1

//images
let dog = new Image()
dog.src = "./images/perro.png"

let dogR = new Image()
dogR.src = "./images/perroR.png"

let startBg = new Image()
startBg.src = ".images/fondo-start.jpg"

let gameBg = new Image()
gameBg.src = "./images/caveBackground.gif"

let bg1 = new Image()
bg1.src = "./images/purple_L1.png"

let bg2 = new Image()
bg2.src = "./images/purple_L2.png"

let bg3 = new Image()
bg3.src = "./images/purple_L3.png"

let bg4 = new Image()
bg4.src = "./images/purple_L4.png"

//audio
let audio = new Audio()
audio.src = "./music/POL-the-hordes-advance-short.wav"
audio.volume = 0.1
audio.loop = true

//============== OBSTACLES ==================================================

function drawObstacle1(x,y,length,height){
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "grey"
    ctx.fillStyle = "rgba(44,49,66,255)"
    ctx.fillRect(x, y, length, height)
    ctx.strokeRect(x, y, length, height)
    ctx.closePath()

    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "grey"
    ctx.fillStyle = "rgba(44,49,66,255)"
    ctx.fillRect(x + length + obs1Gap, y, length, height)
    ctx.strokeRect(x + length + obs1Gap, y, length, height)
    ctx.closePath()
}

function drawObstacle2(x,y,length,height){
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "grey"
    ctx.fillStyle = "rgba(44,49,66,255)"
    ctx.fillRect(x , y, length, height)
    ctx.strokeRect(x, y, length, height)
    ctx.closePath()

    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "grey"
    ctx.fillStyle = "rgba(44,49,66,255)"
    ctx.fillRect(x + obs2Gap + length, y, length, height)
    ctx.strokeRect(x + obs2Gap + length, y, length, height)
    ctx.closePath()
}

function drawObstacle3(x,y,length,height){
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "grey"
    ctx.fillStyle = "rgba(44,49,66,255)"
    ctx.fillRect(x , y, length, height)
    ctx.strokeRect(x, y, length, height)
    ctx.closePath

    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "grey"
    ctx.fillStyle = "rgba(44,49,66,255)"
    ctx.fillRect(x + length + 100 , y, length, height)
    ctx.strokeRect(x + length + 100 , y, length, height)
    ctx.closePath

    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "grey"
    ctx.fillStyle = "rgba(44,49,66,255)"
    ctx.fillRect(x + (length + 100)*2 , y, length, height)
    ctx.strokeRect(x + (length + 100)*2 , y, length, height)
    ctx.closePath

    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "grey"
    ctx.fillStyle = "rgba(44,49,66,255)"
    ctx.fillRect(x + (length + 100)*3 , y, length, height)
    ctx.strokeRect(x + (length + 100)*3 , y, length, height)
    ctx.closePath
}

function drawObstacle4(x,y,length, height){
    ctx.beginPath()
    ctx.lineWidth = 5
    ctx.strokeStyle = "grey"
    ctx.fillStyle = "rgba(44,49,66,255)"
    ctx.fillRect(x , y, length, height)
    ctx.strokeRect(x, y, length, height)
    ctx.closePath
}

//Objects
let obst1Arr = {
    x: 0,
    y: 900
}

let obst2Random = [-650, -420, -175, 0, 200]
let obst2Arr = {
    x: obst2Random[Math.floor(Math.random() * obst2Random.length)],
    y: obst1Arr.y + obsGap
}

let obst3Random = [0, -75, -120 ,-190, 150]
let obst3Arr = {
    x: obst3Random[Math.floor(Math.random() * obst3Random.length)],
    y: obst2Arr.y + obsGap
}

let obst4Random = [65, 0, 150]
let obst4Arr = {
    x: obst4Random[Math.floor(Math.random() * obst4Random.length)],
    y: obst3Arr.y + obsGap
}

//Obstacle Movement
function moveObst(){
    drawObstacle1(obst1Arr.x, obst1Arr.y, obs1Length, 300)
    obst1Arr.y -= obsSpeed
    
    drawObstacle2(obst2Arr.x, obst2Arr.y, obs2Length, 40)
    obst2Arr.y -= obsSpeed
    if(obst2Arr.y + 40 < 0){
        obst2Arr.y = obst4Arr.y + obsGap
        obst2Arr.x = obst2Random[Math.floor(Math.random() * obst2Random.length)]
        score++
        obsSpeed = obsSpeed + 0.035
        opacityIncrease()
    }

    drawObstacle3(obst3Arr.x, obst3Arr.y, obs3Length, 40)
    obst3Arr.y -= obsSpeed
    if(obst3Arr.y + 40 < 0){
        obst3Arr.y = obst2Arr.y + obsGap
        obst3Arr.x = obst3Random[Math.floor(Math.random() * obst3Random.length)]
        score++
        obsSpeed = obsSpeed + 0.035
        opacityIncrease()
    }

    drawObstacle4(obst4Arr.x, obst4Arr.y, obs4Length, obs4Height)
    obst4Arr.y -= obsSpeed
    if(obst4Arr.y + obs4Height < 0){
        obst4Arr.y = obst3Arr.y + obsGap
        obst4Arr.x = obst4Random[Math.floor(Math.random() * obst4Random.length)]
        score++
        obsSpeed = obsSpeed + 0.035
        opacityIncrease()
    }
    
}   

//======================BACKGROUND==============================================


let bgImg = [
    {x:0, y: 0, img:bg1},
    {x:0, y: canvas.height , img:bg1},
    {x:0, y: 0, img:bg2},
    {x:0, y: canvas.height, img:bg2},
    {x:0, y: 0, img:bg3},
    {x:0, y: canvas.height, img:bg3},
    {x:0, y: 0, img:bg4},
    {x:0, y: canvas.height, img:bg4}

]

function background(){
    for(let i = 0; i < bgImg.length; i++){
        ctx.drawImage(bgImg[i].img, bgImg[i].x, bgImg[i].y,canvas.width, canvas.height)
        if(bgImg[i].img == bg1){
            bgImg[i].y -= 2
        }
        else if(bgImg[i].img == bg2){
            bgImg[i].y -= 3
        }
        else if(bgImg[i].img == bg3){
            bgImg[i].y -= 4
        }
        else if(bgImg[i].img == bg4){
            bgImg[i].y -= 5
        }
        if(bgImg[i].y + canvas.height < 0){
            bgImg[i].y = canvas.height
        }
    }
}

function moveBg(){
    background()
}
//======================CHARACTER MOVEMENT=================================

function moveChar(){
    if(isRight && charX + charWidth < canvas.width){
        charX = charX + 10
    }
    if(isLeft && charX > 0){
        charX = charX - 10
    }
}


function charDirection(){
    let charDirection = dog
    if(isRight){
        charDirection = dogR
        return ctx.drawImage(charDirection, charX,charY,charWidth,charHeight)
    }
    if(isLeft){
        charDirection = dogR
        return ctx.drawImage(charDirection, charX,charY,charWidth,charHeight)
    }
    if(!isLeft && !isRight){
        return ctx.drawImage(charDirection, charX,charY,charWidth,charHeight)
    }
}

//========================COLLISIONS===========================================

function checkCollision1(){
    if(charBot > obst1Arr.y && charBot < obst1Arr.y + 300 || charTopL > obst1Arr.y && charTopL < obst1Arr.y + 300){
        if(charX < obst1Arr.x + obs1Length || charX + charWidth > obst1Arr.x + obs1Length + obs1Gap){
            isGameOver = true
        }
    }
}

function checkCollision2(){
    if(charBot > obst2Arr.y && charBot < obst2Arr.y + 40 || charTopL > obst2Arr.y && charTopL < obst2Arr.y + 40){
        if(charX < obst2Arr.x + obs2Length && charX + charWidth > obst2Arr.x || charX + charWidth > obst2Arr.x + obs2Length + obs2Gap && charX < obst2Arr.x + (obs2Length * 2) + obs2Gap){
            isGameOver = true
        }
    }
}

function checkCollision3(){
    if(charBot > obst3Arr.y && charBot < obst3Arr.y + 40 || charTopL > obst3Arr.y && charTopL < obst3Arr.y + 40){
        if(charX < obst3Arr.x + obs3Length && charX + charWidth > obst3Arr.x || charX + charWidth > obst3Arr.x + obs3Length + obs3Gap && charX < obst3Arr.x + (obs3Length * 2) + obs3Gap || charX + charWidth > obst3Arr.x + (obs3Length * 2) + (obs3Gap * 2) && charX < obst3Arr.x + (obs3Length * 3) + (obs3Gap * 2) || charX + charWidth > obst3Arr.x + (obs3Length * 3) + (obs3Gap * 3)){
            isGameOver = true
        }
    }
}

function checkCollision4(){
    if(charBot > obst4Arr.y && charBot < obst4Arr.y + obs4Height || charY > obst4Arr.y && charY < obst4Arr.y + obs4Height){
        if(charX > obst4Arr.x && charX < obst4Arr.x + obs4Length || charX + charWidth > obst4Arr.x && charX + charWidth < obst4Arr.x + obs4Length){
            isGameOver = true
        }
    }
}

function checkCollisions(){
    checkCollision1()
    checkCollision2()
    checkCollision3()
    checkCollision4()
}
//============================FILTER==============================================


function drawFilter(){
    ctx.fillStyle = `rgba(0,0,0,${opacity})`
    ctx.fillRect(0,0,canvas.width,canvas.height)
}
 function opacityIncrease(){
    if(opacity < 0.6){
        opacity += 0.01
    }
 }

//=========================SCORE=====================================

function printScore(){

    scoreTxt.innerHTML = `Your score: ${score}`

}

function printLosingStatement (){
    if(score < 10){
        insultTxt.innerHTML = "Did you even try?"
    }
    else if(score >= 10 && score < 25){
        insultTxt.innerHTML = "How sad..."
    }
    else if(score >= 25 && score < 50){
        insultTxt.innerHTML = "So close and yet so far"
    } 
    else if(score >= 50){
        insultTxt.innerHTML = "Go touch some grass dude"
    }
}

//=========================ANIMATION================================

function animation(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    

    moveBg()
    charDirection()
    moveChar()
    moveObst()
    checkCollisions()
    drawFilter()
    

    ctx.font = "24px Verdana"
    ctx.fillStyle = "white"
    ctx.fillText(`Score: ${score}`, 30, 70)


    if (isGameOver){
        cancelAnimationFrame(intervalId)
        audio.pause()
        restart()
        
    }
    else {
        intervalId = requestAnimationFrame(animation)
    }
}

//=========================START & RESTART================================

function start(){

    gameScreen.style.display = "block"
    startBtn.style.display = "none"
    canvas.style.display = "block"
    instructions.style.display = "none"
    gameOverScreen.style.display ="none"
    isGameOver = false
    score = 0
    charX = 300
    charY = 300
    obst1Arr.y = 900
    opacity = 0.0
    obsSpeed = 3
    obst2Arr.y = obst1Arr.y + obsGap
    obst3Arr.y = obst2Arr.y + obsGap
    obst4Arr.y = obst3Arr.y + obsGap
    audio.play()
    animation()
}

function restart(){
    
    gameOverScreen.style.display = "block"
    restartBtn.style.display = "block"
    menuBtn.style.display = "block"
    canvas.style.display = "none"
    printScore()
    printLosingStatement()
}


//====================EVENT LISTENERS================================

window.addEventListener("load", () => {
    
    gameScreen.style.display = "none"
    canvas.style.display = "none"
    restartBtn.style.display = "none"
    menuBtn.style.display = "none"

    document.addEventListener("keydown", (event) => {
        if(event.key === "ArrowLeft" || event.key === "a"){
            isLeft = true
            isRight = false
        }
        if(event.key === "ArrowRight" || event.key === "d"){
            isRight = true
            isLeft = false
        }
    })

    document.addEventListener("keyup", (event) => {
        isRight = false
        isLeft = false
    })

    startBtn.addEventListener("click", () => {
        start()
    })

    restartBtn.addEventListener("click", () => {
        start()
        menuBtn.style.display = "none"
        restartBtn.style.display = "none"
    })

    menuBtn.addEventListener("click", () => {
        document.body.style.background = "url('.images/fondo-start.jpg') no-repeat"
        instructions.style.display = "block"
        menuBtn.style.display = "none"
        restartBtn.style.display = "none"
        startBtn.style.display = "block"
        gameScreen.style.display = "none"
    })
})