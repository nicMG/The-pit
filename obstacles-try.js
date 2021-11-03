//function drawObstacle1(x,y,length,height){}
ctx.beginPath()
ctx.fillStyle = "yellow"
ctx.fillRect(obs1X, obs1Y, obs1Length, 200)
ctx.closePath()

ctx.beginPath()
ctx.fillStyle = "yellow"
ctx.fillRect(obs1X + obs1Length + 50, obs1Y, obs1Length, 200)
ctx.closePath()

//function drawObstacle2(x,y,length,height){}
ctx.beginPath()
ctx.fillStyle = "green"
ctx.fillRect(obs2X , obs2Y, obs2Length, 40)
ctx.closePath()

ctx.beginPath()
ctx.fillStyle = "green"
ctx.fillRect(obs2X + 100 + obs2Length, obs2Y, obs2Length, 40)
ctx.closePath()

//function drawObstacle3(x,y,length,height){}
ctx.beginPath()
ctx.fillStyle = "blue"
ctx.fillRect(obs3X , obs3Y, obs3Length, 40)
ctx.closePath

ctx.beginPath()
ctx.fillStyle = "blue"
ctx.fillRect(obs3X + obs3Length + 100 , obs3Y, obs3Length, 40)
ctx.closePath

ctx.beginPath()
ctx.fillStyle = "blue"
ctx.fillRect(obs3X + (obs3Length + 100)*2 , obs3Y, obs3Length, 40)
ctx.closePath

ctx.beginPath()
ctx.fillStyle = "blue"
ctx.fillRect(obs3X + (obs3Length + 100)*3 , obs3Y, obs3Length, 40)
ctx.closePath
