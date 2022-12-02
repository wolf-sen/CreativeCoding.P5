//Global Variables
  let screenMargin = 40;
  let distanceDrawDot = 100;
  let rotationStep = 10;

  //debug
  let debugCrossSize = 5;
  
function setup() {
  createCanvas(575, 800);
  noStroke();
  angleMode(DEGREES);
}

function draw() {
  //Color Variables
    let colorBG = color(30);
    let colorA1 = color(35);

  //Foundation
    background(colorBG);
    fill(colorA1);
    ellipse(width/2, height/2, width-2*screenMargin, width-2*screenMargin);

  //Vector generation
    let vectorNull = createVector(0, 0)
    let vectorCenter = createVector(width/2, height/2)
    let vectorDrawDot = createVector(0, distanceDrawDot)

    //Darwing vector lines (debbuger test)
      debugVector(vectorNull, vectorCenter);
    //Rotates around center with radius distanceDrawDot
    for(let rotationDot = 0; rotationDot <= 360; rotationDot += rotationStep){
      push();
      vectorDrawDot.add(vectorCenter);
      vectorDrawDot.rotate(rotationDot);
      //Not correct
      //VectorTemp1 = vectorDrawDot + vectorCenter
      debugVector(vectorCenter, vectorDrawDot);
      pop();
    }
  
  //Typography
}

function debugVector (vectorPos1, vectorPos2){
  push();
  strokeWeight(2);
  stroke(255);
  line(vectorPos2.x - debugCrossSize, vectorPos2.y, vectorPos2.x + debugCrossSize, vectorPos2.y);
  line(vectorPos2.x, vectorPos2.y - debugCrossSize, vectorPos2.x, vectorPos2.y + debugCrossSize);
  stroke(200, 0, 0);
  line(vectorPos1.x, vectorPos1.y, vectorPos2.x, vectorPos2.y);
  pop();
}