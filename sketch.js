var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0
gameState = "play"

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(500, 400);
  monkey = createSprite(80, 315)
  monkey.addAnimation("runnning", monkey_running)
  monkey.scale = 0.1

  ground = createSprite(400, 350, 900, 10)
  ground.velocityX = -4
  ground.x = ground.width / 2


  obstacleGroup = new Group();
  foodGroup = new Group();
  

}


function draw() {
  background(255);
  if (gameState === "play") {
    if (ground.x > 100) {
      ground.x = 300
    }

    if (keyDown("space")) {
      monkey.velocityY = -12

    }
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground)

    if (foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      score = score + 2

    }

    if (obstacleGroup.isTouching(monkey)) {
      gameState = "end";

    }

    spawnBananas()
    spawnObstacles();
    drawSprites();
    text("Score:" + score, 250, 50)
  }

  if (gameState === "end") {
    stroke("red");
    fill("red");
    textSize(30);
    text("Game Over", 200, 200);


  }
}

function spawnObstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(500, 330)
    obstacle.addImage(obstacleImage)
    obstacle.velocityX = -4
    obstacle.scale = 0.1
    obstacleGroup.add(obstacle)
  }
}

function spawnBananas() {
  if (frameCount % 60 === 0) {
    banana = createSprite(500, 280)
    banana.addImage(bananaImage)
    banana.velocityX = -4
    banana.scale = 0.05
    banana.y = random(150, 200)

    banana.lifetime = 300

    foodGroup.add(banana)

  }

}