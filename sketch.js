//new p5();
screenMargin = 25;
tick = 0;

function preload(){
  flowerICO = loadImage('assets/flower2x.png');
  osdFont = loadFont('assets/fonts/VCR_OSD.ttf');
  mNineFont = loadFont('assets/fonts/MNINE.ttf');
  ibmFont = loadFont('assets/fonts/IBM.ttf');
}

function setup() {
  createCanvasCustom(874, 1240);
  createGraphicsCustom('badge', 70, 280);
  createGraphicsCustom('timeline', 35, height);
  createGraphicsCustom('overlayL', width, height);
  frameRate(60);
}

function draw() {
  background(200, 200, 200);
  drawBadge();
  image(badge, canvasMarginR - badge.width, canvasMarginB - badge.height);
  //drawTimeline();
  image(timeline, width * 0.22, 0);
  drawOverlayL();
  image(overlayL, 0, 0)
}

function drawTimeline(){
  timeline.background(0, 255, 0);
}
function drawOverlayL(){
  overlayL.clear();
  //overlay.background(0, 0, 255, 100)
  overlayL.stroke(0);
  overlayL.strokeWeight(2);
  overlayL.line(overlayLMarginR, overlayLMarginT, overlayLMarginR, height * 0.6);
  overlayL.line(overlayLMarginR, overlayLMarginT, overlayLMarginR - screenMargin, 0);
  overlayL.line(overlayLMarginR, height * 0.6, overlayLMarginR + screenMargin, height * 0.6 + screenMargin);
  overlayL.noStroke();
  overlayL.fill(0);
  overlayL.rect(overlayLMarginL, overlayLMarginT, 10, 10)
  overlayL.push();
  overlayL.translate(overlayLMarginR - 5, overlayLMarginT + 700, 0)
  overlayL.angleMode(DEGREES);
  overlayL.rotate(-90);
  overlayL.textFont(ibmFont);
  overlayL.textSize(13);
  overlayL.text("mouseX: " + mouseX + "  mouseY: " + mouseY, 0, 0);
  overlayL.pop();
}

function drawBadge(){
  if(frameCount%12 == 0){
  badge.clear();
  badgeMargin = 5;
  badge.pixelDensity(5)
  //badge.background(0, 0, 255, 100);
  badge.image(flowerICO, badgeMargin/2, badge.height - 0.95 *badge.width, badge.width - 1* badgeMargin, badge.width - 1* badgeMargin);
  badge.fill(0);
  badge.rect(0, badge.height * 0.70, 80, 5);
  //random binary pattern
  badgeCodeChance = 1;
  for (let incrementY = 0; incrementY < (badge.height * 0.68); incrementY += 5) {
    for (let incrementX = 0; incrementX < badge.width; incrementX += 5) {
      if(random(0, 100) < badgeCodeChance) badgeCodeState = 255;
      else badgeCodeState = 0;
      badge.fill(0, badgeCodeState);
      badge.rect(incrementX, incrementY, 5, 5);
    }
    badgeCodeChance += 2.7 ;
  }}
}

//Utils.
//Creating Canvas w. AlignmentAssists
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
//Creating Graphic w. AlignmentAssists
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