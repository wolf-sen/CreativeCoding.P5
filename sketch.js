new p5();
screenMargin = 20;
var flowerICO;

function preload(){
}

function setup() {
createCanvasCustom(874, 1240);
createGraphicsCustom('badge', 80, 220);
drawBadge();
}

function draw() {
  background(200);
  fill(255, 0, 100);
  rect(canvasMarginL, canvasMarginT, 10, 10);
  rect(canvasMarginL, canvasMarginB - 10, 10, 10);
  rect(canvasCenterX - 10, canvasCenterY - 10, 10, 10);
  image(badge, canvasMarginR - badge.width, canvasMarginB - badge.height);
  image(flowerICO, 100, 100, 200, 200);
}

function createCanvasCustom(resX, resY) {
  console.log('createCanvas: ' + resX, resY);
  createCanvas(resX, resY);
  noStroke();
  noFill();
  canvasMarginT = screenMargin;
  canvasMarginL = screenMargin;
  canvasMarginB = resY - screenMargin;
  canvasMarginR = resX - screenMargin;
  canvasCenterY = resY / 2;
  canvasCenterX = resX / 2;  
}

function createGraphicsCustom(graphicName, resX, resY) {
  console.log('createGraphic: ' + graphicName, resX, resY);
  eval(graphicName + ' = createGraphics(resX, resY);');
  eval(graphicName + '.noStroke();');
  eval(graphicName + '.noFill();');
  eval(graphicName + 'MarginT = screenMargin;');
  eval(graphicName + 'MarginL = screenMargin;');
  eval(graphicName + 'MarginB = resY - screenMargin;');
  eval(graphicName + 'MarginR = resX - screenMargin;');
  eval(graphicName + 'CenterY = resY / 2;');
  eval(graphicName + 'CenterX = resX / 2;');
}

function drawBadge(){
  badge.background(255, 0, 0, 30);
  //badge.image(flowerICO, 0, 0);
}