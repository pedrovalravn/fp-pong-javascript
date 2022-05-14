//ball variables
let xBall = 300;
let yBall = 200;
let diameter = 16;
let radius = diameter / 2 ;


//velocity variables
let velocityXball = 6;
let velocityYball = 6;

//racket variables
let xRacket = 5;
let yRacket = 150;
let lengthRacket = 10;
let heightRacket = 90;

//enemy racket variables
let xEnemyRacket = 585;
let yEnemyRacket = 150;
let yEnemyVelocity;
let chanceToMiss = 0;

//collision

let collision = false;

//score variables

let myScore = 0;
let enemyScore = 0;

//game sounds

let racket;
let score;
let soundtrack;


function preload(){
  soundtrack = loadSound("soundtrack.mp3");
  score = loadSound("score.mp3");
  racket = loadSound("racket.mp3");  
}

function setup() {
  createCanvas(600, 400);
  soundtrack.loop();
}


function draw() {
  background(0);
  showBall();
  ballMovement(); 
  borderCollision();
  showRacket(xRacket, yRacket);
  showRacket(xEnemyRacket, yEnemyRacket);
  movementRacket();
  //movementEnemyRacket();
  collisionRacketLibrary(xRacket, yRacket);
  collisionRacketLibrary(xEnemyRacket,yEnemyRacket); 
  enemyRacketMovement();
  insertScore();
  goal();
  ballGettingStuck();
  calculateChanceToMiss();
}


function ballGettingStuck(){
    if (xBall - radius < 0){
    xBall = 23
    }
}

function showBall(){
  circle(xBall, yBall, diameter);  
}

function ballMovement(){
  xBall += velocityXball;
  yBall += velocityYball; 
}

function borderCollision(){
   
  if (xBall + radius> width  ||
      xBall - radius < 0){
    velocityXball *= -1;  
  }
   
  if(yBall + radius> height  ||
    yBall - radius< 0){
    velocityYball *= -1
  }
}

function showRacket(x,y){
    rect(x, y, lengthRacket, heightRacket);
}

function movementRacket(){
  if(keyIsDown(UP_ARROW)){
    yRacket -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRacket += 10;
  }
}

function movementEnemyRacket(){
  if(keyIsDown(87)){
    yEnemyRacket -= 10;
  }
  if(keyIsDown(83)){
    yEnemyRacket += 10;
  }
}

function enemyRacketMovement(){
  yEnemyVelocity = yBall - yEnemyRacket - lengthRacket /2 - 30;
  yEnemyRacket += yEnemyVelocity + chanceToMiss
  calculateChanceToMiss()
}

function calculateChanceToMiss(){
  if (enemyScore >= myScore){
      chanceToMiss += 1
  if (chanceToMiss >= 39){
      chanceToMiss = 40
  } 
  } else {
    chanceToMiss -= 1
    if (chanceToMiss <= 35){
        chanceToMiss = 35
      
    }
  }
}


function collisionRacketLibrary(x,y){
  collision = 
  collideRectCircle(x, y, lengthRacket, heightRacket, xBall, yBall, radius);
  
  if(collision){
     velocityXball *= -1;
     racket.play();
  }
}


function insertScore(){
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(myScore, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(enemyScore, 470, 26);
}
function goal(){
   if(xBall > 590) {
     myScore += 1;
     score.play();
   }
   
   if(xBall < 10){
     enemyScore += 1;
     score.play();
   }
}
