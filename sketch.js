var canvas, backgroundImage;

var database,height,balloon,b1,b2

function preload(){
  backgroundImage=loadImage("images/bg.png")
  b1=loadImage("images/b1.png")
  b2=loadImage("images/b2.png")
  b3=loadImage("images/b3.png")
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  balloon=createSprite(250,650,150,150)
  balloon.addAnimation("balloon",b1,b2,b3)
  var balloonHeight=database.ref('balloon/height')
  balloonHeight.on("value",readHeight,showError)

}


function draw(){
  background(backgroundImage)
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0)
  }
  if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0)
  }
  if(keyDown(DOWN_ARROW)){
    updateHeight(0,10)
  }
  if(keyDown(UP_ARROW)){
    updateHeight(0,-10)
  }
  drawSprites()
  stroke("white")
  textSize(30)
  text("use arrow keys to move the balloon",50,50)
}
 function updateHeight(x,y){
   database.ref('balloon/height').set({
    x:height.x+x,
    y:height.y+y
   }
   )
 }
function readHeight(data){
  height=data.val()
  balloon.x=height.x
  balloon.y=height.y
}
function showError(){
  console.log("error")
}