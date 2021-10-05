var repair, repairImg, repairGroup;
var petrolImg, petrol, petrolGroup;
var car, carImg;
var score = 0;
var gameState = "play";
var background;
var backgroundImg;
var barrier, barrierImg, barrierGroup, barrier, barrierGroup2, barrier3, barrierGroup3;
var RanOutImg, ranOut;
var overLoad, overLoadImg;


function preload(){

barrierImg = loadImage("barrier.png");
petrolImg = loadImage("feul.png");        
carImg = loadImage("car.png");
repairImg = loadImage("wrench.png");
backgroundImg = loadImage("background.png");
RanOutImg = loadImage("RanOut.png");
overLoadImg = loadImage("OverLoadedFuelTank.png");
carWrecked = loadImage("car wrecked.png");

}

function setup() {
createCanvas(600,600);
  background = createSprite(300,300);
  //background.addImage("road",backgroundImg);
  background.velocityY=10

  car = createSprite(300,500)
  car.addImage(carImg);
  car.scale=0.5

  petrolGroup = new Group()
  repairGroup = new Group()
  barrierGroup = new Group()
  barrierGroup2 = new Group()
  barrierGroup3 = new Group()
  
  feulTank=50;
  carHealth=100;



}

function draw() {

// background(200);
background.addImage("road",backgroundImg);


console.log("Health:"+carHealth);

if(gameState ==="play"){
   
  
  spawnPetrol();
  spawnBarriers();
  spawnRepair();
  spawnBarriers2();
  spawnBarriers3();
    

if(background.y > 400){
    background.y = 300
  }

  if(keyDown("left_arrow")){
    car.x = car.x - 5
    feulTank=feulTank-0.05
  }

  if(keyDown("right_arrow")){
    car.x = car.x + 5
    feulTank=feulTank-0.05
  }

  if(feulTank < 0){
    ranOut = createSprite(300,300)
    ranOut.addImage(RanOutImg);
    gameState="end";
  }
  
  if(car.isTouching(petrolGroup)){
    feulTank=feulTank+2;
    petrolGroup.destroyEach();
  }
   
  if(car.isTouching(barrierGroup)){
    carHealth=carHealth-4
    barrierGroup.destroyEach();
    
   }
   
  if(car.isTouching(barrierGroup3)){
    carHealth=carHealth-90
    barrierGroup3.destroyEach();
  }
if(car.isTouching(barrierGroup2)){
  carHealth=carHealth-4
  barrierGroup2.destroyEach();
}

if(repairGroup.isTouching(car)){
  carHealth = carHealth+2;
  //console.log(carHealth+"Points");
  //feulTank=149
  repairGroup.destroyEach();
}
if(feulTank > 149){
  var overLoad = createSprite(300,300);
  overLoad.addImage(overLoadImg);
  gameState="end"
}
if(carHealth < 1){
  var wrecked = createSprite(300,300);
  wrecked.addImage(carWrecked);
  gameState = "end"
  wrecked.scale = 0.5
}

  
  }

  else if(gameState === "end"){
    console.log("ok")

    car.y = 800;
    petrolGroup.destroyEach();
    barrierGroup.destroyEach();
    repairGroup.destroyEach();
    background.velocityY = 0;
    barrierGroup2.destroyEach();
    barrierGroup3.destroyEach();

    }

    drawSprites();
  textSize(15);
  fill("yellow");
  text("Feul: "+ Math.round(feulTank),50,500);
  text("Health: "+Math.round(carHealth),150,500);
    
}



  




function spawnPetrol(){
   if(frameCount%260 === 0){
       var petrol = createSprite(random(30,580),0)
       petrol.addImage(petrolImg)
       petrol.velocityY=2
       console.log("Spawned");
       petrol.scale=0.3;
       petrolGroup.add(petrol);
   }
   

}

function spawnBarriers(){
  if(frameCount%100 === 0){
    var barrier = createSprite(random(30,230),0)
    barrier.addImage(barrierImg)
    barrier.velocityY=2
    barrier.scale=0.3;
    barrierGroup.add(barrier);
  }
}

function spawnBarriers2(){
  if(frameCount%120 === 0){
    var barrier2 = createSprite(random(240,430),0)
    barrier2.addImage(barrierImg)
    barrier2.velocityY=2
    barrier2.scale=0.3;
    barrierGroup2.add(barrier2);
  }
}

function spawnBarriers3(){
  if(frameCount%130 === 0){
    var barrier3 = createSprite(random(440,580),0)
    barrier3.addImage(barrierImg)
    barrier3.velocityY=2
    barrier3.scale=0.3;
    barrierGroup3.add(barrier3);
  }
}

function spawnRepair(){
  if(frameCount%390 === 0){
    var repair = createSprite(random(30,580),0)
    repair.addImage(repairImg)
    repair.velocityY=2
    repair.scale=0.3
    repairGroup.add(repair);
  }
}