var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1;

var ground;

var gameOver, restart;

var bird,birdImage;

function preload(){
  trex_running =   loadAnimation("trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1Image = loadImage("obstacle1.jpg");
    
  
  gameOverImg = loadImage("gameover.jpg");
  restartImg = loadImage("restart2.jpg");
  
  birdImage = loadImage("bird.jpg");
  
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  
  trex = createSprite(50,300,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.6;
  
  ground = createSprite(580,300,3000,20);
  ground.shapeColor="brown";
  
  gameOver = createSprite(700,85);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(700,195);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,300,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  birdsGroup = new Group();
  
}

function draw() {
  background(255);
  
  if (gameState===PLAY){
    ground.velocityX = -6;
  
    if(keyDown("space") && trex.y >= 250) {
      trex.velocityY = -20;
    }
  
    trex.velocityY = trex.velocityY + 1
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    
    spawnClouds();
    spawnObstacles();
    spawnBirds();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
    
    if(birdsGroup.isTouching(trex)){
        gameState = END;
    }
    
    
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    birdsGroup.setVelocityXEach(0);

    
    trex.changeAnimation("collided",trex_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    birdsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(displayWidth - 20,30);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.3;
    cloud.velocityX = -5;
    cloud.depth=-1;
    
    cloud.lifetime = 250;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
  }
  
}

function spawnBirds() {
  if (frameCount % 80 === 0) {
    var bird = createSprite(displayWidth - 20, displayHeight-30);
    bird.y = Math.round(random(80,120));
    bird.addImage(birdImage);
    bird.scale = 0.3;
    bird.velocityX = -5;
    bird.depth=-1;
    
    bird.lifetime = 270;
   
    birdsGroup.add(bird);
  }
  
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle1 = createSprite(displayWidth - 20,265);
    obstacle1.velocityX = -6;
    obstacle1.addImage(obstacle1Image);
    obstacle1.scale =0.3;
    obstacle1.lifetime = 250;
    obstacle1.depth=1;    
    obstaclesGroup.add(obstacle1);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  birdsGroup.destroyEach();

  
  trex.changeAnimation("running",trex_running);
  
  
}