var stickman, stickman_running;
var ground;

var coinImage, coinsGroup;

var clapIMG, city, clap1, clap2, clap3, clap4, clap5;

var score;

var gameState = "play";

function preload(){
  stickman_running = loadImage("stickman1.png");
  
  coinImage = loadImage("coin.png");

  clapIMG = loadImage("clap.png");

  city = loadImage("city.jpg");
}

function setup() {
  createCanvas(600, 200);
  
  stickman = createSprite(600,150,20,50);
  stickman.addImage("running", stickman_running);
  stickman.scale = 0.5;
  
  ground = createSprite(200,180,100000,20);

  coinsGroup = new Group();

  score = 0;
}

function draw() {
  background(city);

  fill(255);
  text("Score: "+ score, 500,150);  

  if(gameState === "play") {
  
    camera.position.x = displayWidth/2;
    camera.position.x = camera.position.x - 4;
      
    if(keyDown("space")) {
      stickman.velocityY = -10;
    }

    for(i = 300; i > 600; i + 50) {
      clap1 = createSprite(i,200,10,10);
      clap1.addImage(clapIMG);

      clap2 = createSprite(i,200,10,10);
      clap2.addImage(clapIMG);

      clap3 = createSprite(i,200,10,10);
      clap3.addImage(clapIMG);

      clap4 = createSprite(i,200,10,10);
      clap4.addImage(clapIMG);

      clap5 = createSprite(i,200,10,10);
      clap5.addImage(clapIMG);
    }
    
    stickman.velocityY = stickman.velocityY + 0.8

    stickman.collide(ground);

    spawnCoins();

    if(score === 10){
      fill(255);
      gameState = "end";
    }
  }
  if(gameState === "end") {
    fill(255);
    text("GAME OVER", 300, 100);
  }
    
  drawSprites();
}

function spawnCoins() {
  if(World.frameCount % 60 === 0) {
    var coin = createSprite(600,165,10,40);
    coin.y = Math.round(random(0,100));
    
    coin.addImage(coinImage);
    
    //assign scale and lifetime to the obstacle           
    coin.scale = 0.25;
    coin.lifetime = 110;
    coinsGroup.add(coin);

    if(stickman.x ===coin.x) {
      coinsGroup.destroyEach();
      score++;
    }
  }
}
