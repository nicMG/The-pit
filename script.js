let canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "10px solid black";
canvas.style.background = "grey"


//variables
let intervalId = 0
let isGameOver = false
let score = 0
let isRight = false
let isLeft = false

//char vars
let charX = 100
let charY = 100
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

let dog = new Image()
dog.src = "./images/perro.png"

let dogR = new Image()
dogR.src = "./images/perroR.png"

// let keke = new Image()
// keke.src = "./images/KEKE_0.gif"


//============== OBSTACLES ==================================================

//hacer funciones especificas para cada tipo de obstaculo con parametros correspondientes a la creacion de cada rectangulo

function drawObstacle1(x,y,length,height){
ctx.beginPath()
ctx.lineWidth = 5
// ctx.strokeStyle = "black"
ctx.fillStyle = "white"
ctx.fillRect(x, y, length, height)
// ctx.strokeRect(x, y, length, height)
ctx.closePath()

ctx.beginPath()
ctx.fillStyle = "black"
ctx.fillRect(x + length + obs1Gap, y, length, height)
ctx.closePath()
}

function drawObstacle2(x,y,length,height){
ctx.beginPath()
ctx.fillStyle = "black"
ctx.fillRect(x , y, length, height)
ctx.closePath()

ctx.beginPath()
ctx.fillStyle = "black"
ctx.fillRect(x + obs2Gap + length, y, length, height)
ctx.closePath()
}

function drawObstacle3(x,y,length,height){
ctx.beginPath()
ctx.fillStyle = "black"
ctx.fillRect(x , y, length, height)
ctx.closePath

ctx.beginPath()
ctx.fillStyle = "black"
ctx.fillRect(x + length + 100 , y, length, height)
ctx.closePath

ctx.beginPath()
ctx.fillStyle = "black"
ctx.fillRect(x + (length + 100)*2 , y, length, height)
ctx.closePath

ctx.beginPath()
ctx.fillStyle = "black"
ctx.fillRect(x + (length + 100)*3 , y, length, height)
ctx.closePath
}

function drawObstacle4(x,y,length, height){
    ctx.beginPath()
    ctx.fillStyle = "black"
    ctx.fillRect(x , y, length, height)
    ctx.closePath
}

//arrays para mover todas las partes a la vez
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


function moveObst(){
    drawObstacle1(obst1Arr.x, obst1Arr.y, obs1Length, 300)
    obst1Arr.y -= obsSpeed
    
    drawObstacle2(obst2Arr.x, obst2Arr.y, obs2Length, 40)
    obst2Arr.y -= obsSpeed
    if(obst2Arr.y + 40 < 0){
        obst2Arr.y = obst4Arr.y + obsGap
        obst2Arr.x = obst2Random[Math.floor(Math.random() * obst2Random.length)]
        score++
        // obsSpeed = obsSpeed*1.1
    }

    drawObstacle3(obst3Arr.x, obst3Arr.y, obs3Length, 40)
    obst3Arr.y -= obsSpeed
    if(obst3Arr.y + 40 < 0){
        obst3Arr.y = obst2Arr.y + obsGap
        obst3Arr.x = obst3Random[Math.floor(Math.random() * obst3Random.length)]
        score++
        // obsSpeed = obsSpeed*1.1
    }

    drawObstacle4(obst4Arr.x, obst4Arr.y, obs4Length, obs4Height)
    obst4Arr.y -= obsSpeed
    if(obst4Arr.y + obs4Height < 0){
        obst4Arr.y = obst3Arr.y + obsGap
        obst4Arr.x = obst4Random[Math.floor(Math.random() * obst4Random.length)]
        score++
        // obsSpeed = obsSpeed*1.1
    }
    
}   

//============================================================================
//character Movement

function moveChar(){
    if(isRight && charX + charWidth < canvas.width){
        charX = charX + 10
    }
    if(isLeft && charX > 0){
        charX = charX - 10
    }
}

function charDirection(){
    if(isRight){
        return ctx.drawImage(dogR, charX,charY,charWidth,charHeight)
    }
    if(isLeft){
        return ctx.drawImage(dog, charX,charY,charWidth,charHeight)
    }
    if(!isLeft && !isRight){
        return ctx.drawImage(dog, charX,charY,charWidth,charHeight)
    }
}

//============================================================================
//collisions

function checkCollision1(){
    // if(charBot > obst1Arr.y && charBot < obst1Arr.y + 300 || charTopL > obst1Arr.y && charTopL < obst1Arr.y + 300){
    //     if(charX < obst1Arr.x + obs1Length || charX + charWidth > obst1Arr.x + obs1Length + obs1Gap){
    //         isGameOver = true
    //     }
    // }
}

function checkCollision2(){
    // if(charBot > obst2Arr.y && charBot < obst2Arr.y + 40 || charTopL > obst2Arr.y && charTopL < obst2Arr.y + 40){
    //     if(charX < obst2Arr.x + obs2Length || charX + charWidth > obst2Arr.x + obs2Length + obs2Gap){
    //         isGameOver = true
    //     }
    // }
}

function checkCollision3(){
    // if(charBot > obst3Arr.y && charBot < obst3Arr.y + 40 || charTopL > obst3Arr.y && charTopL < obst3Arr.y + 40){
    //     if(charX < obst3Arr.x + obs3Length || charX + charWidth > obst3Arr.x + obs3Length + obs3Gap && charX < obst3Arr.x + (obs3Length * 2) + obs3Gap || charX + charWidth > obst3Arr.x + (obs3Length * 2) + (obs3Gap * 2) && charX < obst3Arr.x + (obs3Length * 3) + (obs3Gap * 2) || charX + charWidth > obst3Arr.x + (obs3Length * 3) + (obs3Gap * 3)){
    //         isGameOver = true
    //     }
    // }
}

function checkCollision4(){
    // if(charBot > obst4Arr.y && charBot < obst4Arr.y + obs4Height || charY > obst4Arr.y && charY < obst4Arr.y + obs4Height){
    //     if(charX > obst4Arr.x && charX < obst4Arr.x + obs4Length || charX + charWidth > obst4Arr.x && charX + charWidth < obst4Arr.x + obs4Length){
    //         isGameOver = true
    //     }
    // }
}

function checkCollisions(){
    checkCollision1()
    checkCollision2()
    checkCollision3()
    checkCollision4()
}


//===================================================================

function animation(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    
    charDirection()
    moveChar()
    moveObst()
    checkCollisions()
    

    ctx.font = "24px Verdana"
    ctx.fillText(`Score: ${score}`, 30, 70)


    if (isGameOver){
        cancelAnimationFrame(intervalId)
    }
    else {
        intervalId = requestAnimationFrame(animation)
    }
}

//==============================================================================

window.addEventListener("load", () => {
    animation()

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
})