const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var fruitimg,bg,rabbit

var bunny;

var button;

var idle;
var eat;
var sad;

function preload(){
  bg = loadImage("background.png");
  rabbit = loadImage("Rabbit-01.png");
  fruitimg = loadImage("melon.png");

  idle = loadAnimation("blink_1.png","blink_2.png","blink_3.png","blink_2.png");
  eat = loadAnimation("eat_0.png","eat_2.png","eat_3.png","eat_4.png","eat_3.png","eat_4.png","blink_1.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

   idle.playing = true;
   eat.playing = true;
   sad.playing = true;
  eat.looping = false;
  sad.looping = false;

 
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  rope = new Rope(6,{x:250,y:30});

 var fruit_opt = {
    density: 0.001
  }

  fruit = Bodies.circle(250,100,20, fruit_opt);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);

  textSize(50);

  bunny = createSprite(250,600,100,100);

  idle.frameDelay=15
  eat.frameDelay = 20
  bunny.addAnimation("idle",idle);
  bunny.addAnimation("eat",eat);
  bunny.addAnimation("sad",sad);
  bunny.scale = 0.3

  button = createImg("cut_btn.png");
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
}

function draw() 
{
  background(51);
  
  
  Engine.update(engine);

  ground.show();
 
  
  //background
  image(bg,width/2,height/2,500,700);

  rope.show();


  if(fruit !=null){
    image(fruitimg,fruit.position.x,fruit.position.y,60,60);
  }

  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('sad');
    fruit=null;
     
   }

  if (collide(fruit,bunny)==true){
    bunny.changeAnimation("eat");
  } 
  

    

  drawSprites();
  
   
}

function drop(){
  rope.break();
   fruit_con.detach();
  fruit_con = null;
}

function collide(body,sprite){
  if(body != null){
    var distance = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(distance<= 80){
      World.remove(engine.world,fruit);
      fruit = null;

      return true;
    }else{
      return false;
    }
  }
}
