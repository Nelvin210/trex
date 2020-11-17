var trex, trex_running,trex_collided
var Ground,groundimg,invisibleground,cloudimg,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,gameover,restart,gameoverimg,restartimg
var CloudsGroups
var ObstacleGroups
var play=1
var end=0
var gamestate=play
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadAnimation("trex_collided.png")
  groundimg=loadImage("ground2.png")
  cloudimg=loadImage("cloud.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  gameoverimg=loadImage("gameOver.png")
  restartimg=loadImage("restart.png")
}

function setup() {
  createCanvas(400, 400);
  trex = createSprite(50,380,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  Ground = createSprite(200,380,400,20)
  Ground.addImage(groundimg)
  Ground.velocityX=-3
  invisibleground=createSprite(200,385,400,5)
  invisibleground.visible=false
  CloudsGroups=new Group()
  ObstacleGroups=new Group()
  gameover=createSprite(200,300,30,30)
  restart=createSprite(200,340,30,30) 
  gameover.addImage(gameoverimg)
  restart.addImage(restartimg)
  gameover.scale=0.5
  restart.scale=0.5
  gameover.visible=false
  restart.visible=false
  
}

function draw() {
  background(245);
  if (gamestate==play){
     if (Ground.x<0){
    Ground.x=200
  }
    if (keyDown("space")&&trex.y>358){
   trex.velocityY=-10 
  }
     trex.velocityY= trex.velocityY +0.8
     spawnClouds()
  spawnObstacles()
    if ( ObstacleGroups.isTouching(trex)){
      gamestate=end
      
    }
  }
  
  else if (gamestate==end){
    Ground.velocityX=0
    trex.velocityY=0
    gameover.visible=true
    restart.visible=true
    ObstacleGroups.setVelocityXEach(0)
    CloudsGroups.setVelocityXEach(0)
    ObstacleGroups.setLifetimeEach(-1)
    CloudsGroups.setLifetimeEach(-1)
    trex.changeAnimation("collided",trex_collided) 
  }
  

  trex.collide(invisibleground)
 
 
  //console.log(trex.y)
 
  drawSprites();
  
}
function spawnClouds(){
 
  if (frameCount % 60===0){
  var Cloud = createSprite(400,320,40,10)
  Cloud.y = random(100,20)
  Cloud.addImage(cloudimg)
  Cloud.scale = 0.5
  Cloud.velocityX = -3
  Cloud.lifetime=134
    
  Cloud.depth = trex.depth
    
  CloudsGroups.add(Cloud)
    
    
    
  }

  
  
  
}



function spawnObstacles(){
  
  if (frameCount % 60===0){
    var Obstacle = createSprite(400,365,10,40)
    Obstacle.velocityX = -3
    var rand=Math.round(random(1,6))
    console.log(rand)
    switch(rand){
      case 1:Obstacle.addImage(obstacle1)
        break
         case 2 :Obstacle.addImage(obstacle2)
        break
         case 3:Obstacle.addImage(obstacle3)
        break
         case 4:Obstacle.addImage(obstacle4)
        break
         case 5:Obstacle.addImage(obstacle5)
        break
         case 6:Obstacle.addImage(obstacle6)
        break
    }
        Obstacle.scale=0.5
        Obstacle.lifetime=134
        ObstacleGroups.add(Obstacle)
        
    }
    
  }
  
  
 function reset(){
   gamestate=play
   gameover.visible=false
   restart.visible=false
   ObstaclesGroups.destroyEach()
   CloudsGroups.destroyEach()
   trex.setAnimation("trex")
   count=0
 } 
  
  
  
  
  



