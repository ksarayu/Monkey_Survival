var ground, groundImage;
var monkey, monkeyAnimation;
var rand, banana, bananaImage, BananaGroup;
var obstacle, obstacleImage, ObstacleGroup;
var background;
var survivalTime, score;

function preload() {
  monkeyAnimation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("stone.png");
  
  groundImage = loadImage("jungle.jpg");
  
}

function setup() {
  createCanvas(600, 600);
  
  ground = createSprite(300,300,1000,600);
  ground.x = ground.width/2;
  ground.velocityX = -3;
  ground.addImage(groundImage);

  monkey = createSprite(65,600,25,25);
  monkey.addAnimation("monkeyMoving", monkeyAnimation);
  monkey.scale = 0.3;

  score = 0;
  survivalTime = 0;

  rand = Number(290,340);
  banana = createSprite(600,550,40,40);
  banana.y = rand;
  banana.visible = false;

  obstacle = createSprite(600,525,20,80);
  obstacle.visible = false;

  BananaGroup = new Group();
  ObstacleGroup = new Group();
}

function draw() {
  background(225);
  edges = createEdgeSprites();
  monkey.collide(edges[3]);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
  }
  
  if(keyDown("space")){
      monkey.velocityY = -12;
  }

  monkey.velocityY = monkey.velocityY + 0.8;
  
  Banana();
  Obstacle();
  
  if(BananaGroup.isTouching(monkey)){
    score = score + 2;
    Banana();
  }
  
  if(ObstacleGroup.isTouching(monkey)){
    monkey.scale = 0.2;
  }
  
  switch(score){
    case 150: monkey.scale = 3.12;
      break;
    case 300: monkey.scale = 3.16;
      break;
    case 450: monkey.scale = 3.20;
      break;
    case 600: monkey.scale = 3.24;
      break;
    default: break;
  }
  
  drawSprites();
  
  survivalTime = Math.round(getFrameRate()/50) + survivalTime;
  textSize(20);
  fill("white");
  text("Survival Time: " + survivalTime, 350, 50);
  
  textSize(20);
  fill("white");
  text("Score: " + score, 100, 50) 
}

function Banana(){
  if (frameCount % 180 === 0){
    banana.visible = true;
    banana.x = 600;
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -3;
  }
  BananaGroup.add(banana);
}

function Obstacle(){
  if(frameCount % 300 === 0) {
    obstacle.visible = true;
    obstacle.x = 600;
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.scale = 0.3;
  }
  ObstacleGroup.add(obstacle);
}
