
var cloudsgroup
var obstacles
var gamestate="start"
var trex, trex_running, ground, grounding
var obs
var trexcollide
var gameover, gameoverimg
var restart, restartimg
function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png")
    grounding = loadImage("ground2.png")
    obstacle1 = loadImage("obstacle1.png")
    obstacle2 = loadImage("obstacle2.png")
    obstacle3 = loadImage("obstacle3.png")
    obstacle4 = loadImage("obstacle4.png")
    obstacle5 = loadImage("obstacle5.png")
    obstacle6 = loadImage("obstacle6.png")
    cloudImg=loadImage("cloud.png")
    trexcollide=loadImage("trex_collided.png")
    gameoverimg=loadImage("gameOver.png")
    restartimg=loadImage("restart.png")
}
function setup() {
    createCanvas(600, 200)
    trex = createSprite(30, 170, 20, 100)
    trex.addAnimation("trexrunning", trex_running)
    trex.addImage("trex_collided",trexcollide)
    trex.scale = 0.5
    ground = createSprite(300, 190, 600, 5)
    ground.addImage("ground", grounding)
    obstacles=createGroup()
    cloudgroup=createGroup()
    trex.debug=true
    trex.setCollider("circle",0,0,20)
    gameover=createSprite(300,100,20,20)
    gameover.addImage("gamepicture",gameoverimg)
    gameover.scale=1.5
    gameover.visible=false
    restart=createSprite(300, 70,20,20)
    restart.addImage("restartbutton",restartimg)
    restart.scale=0.7
    restart.visible=false

}
//main function
function draw() {
    background("White")
    if (ground.x < 0) {
            ground.x = 300
    }

    if(gamestate=="start"){
        trex.changeImage("trex_collided")
        ground.velocityX =0
        fill("pink")
        textSize(14)
        text("Please press space to start the game!",100,50)
        if(keyDown("space")){
            gamestate="play"
        }
    }

    else if(gamestate=="play"){
        gameover.visible=false
        restart.visible=false
        trex.changeAnimation("trexrunning")
        spawnobstacles()
        spawncloud()
        if (keyWentDown("Space") && trex.y > 160) {
            trex.velocityY = -16
        }
        trex.velocityY += 0.9
        
        ground.velocityX=-11
        if(trex.collide(obstacles)){
            gamestate="end"
        }
    }

    else if(gamestate=="end"){
        ground.velocityX=0
        trex.velocityY=0
        trex.velocityX=0
        obstacles.setVelocityXEach(0)
        cloudgroup.setVelocityXEach(0)
        obstacles.setLifetimeEach(-1)
        cloudgroup.setLifetimeEach(-1)
        trex.velocityY=0
        gameover.visible=true 
        restart.visible=true 
        trex.changeImage("trex_collided") 
        if(mousePressedOver(restart)){
        obstacles.destroyEach()
        cloudgroup.destroyEach()
            gamestate="play"
        }
    }
    
    trex.collide(ground)
    drawSprites()
}

function spawnobstacles() {
    if (frameCount % 70 == 0) {
        obs = createSprite(620, 170, 20, 50)
        obs.scale=0.5
        obs.velocityX = -3
        obstacles.add(obs)
        obs.lifetime=225
        var r=Math.round(random(1,6))
        switch(r){
            case 1:obs.addImage("ob1",obstacle1)
            break
            case 2:obs.addImage("ob2",obstacle2)
            break
            case 3:obs.addImage("ob3",obstacle3)
            break
            case 4:obs.addImage("ob4",obstacle4)
            break
            case 5:obs.addImage("ob5",obstacle5)
            break
            case 6:obs.addImage("ob6",obstacle6)
            break
        }
        
    }
}

function spawncloud(){
    if (frameCount % 90 == 0){
        cloud=createSprite(500, 50, 30, 55)
        cloudgroup.add(cloud)
        cloud.lifetime=190
        cloud.y=Math.round(random(30,70))
        cloud.velocityX=-3
        cloud.addImage("cloud",cloudImg)
    }
}
