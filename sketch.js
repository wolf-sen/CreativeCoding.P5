//new p5();
//General
let exportScale = 2;
let projectVesion = '0.07';
//Image
let screenMargin = 25;
let tick = 1;
//midi
let midiDeviceName = 'Launchkey 61';
let myInput;
let midiDataCH1 = {
  data: [0, 0, 0], 
}
//misc.
let incrementTimeline = 0;


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
  frameRate(1200);

  // enable webMIDI.js library
  WebMidi
  .enable()
  .then(console.log("WebMidi enabled!"))
  .then(onEnabled)
  .catch(err => alert(err));
}

function onEnabled() {
  WebMidi.inputs.forEach(input => 
    console.log(input.state, input.name));

  myInput = WebMidi.getInputByName(midiDeviceName);
  console.log("selected InputID: ", myInput.id);

  myInput.channels[1].addListener("noteon", listenCH1 => {
    midiDataCH1 = listenCH1;
    console.log(midiDataCH1.data);
  });

  myInput.channels[1].addListener("noteoff", listenCH1 => {
    midiDataCH1 = listenCH1;
    console.log(midiDataCH1.data);
  });
}

function draw() {
  background(200, 200, 200);
  drawBadge();
  image(badge, canvasMarginR - badge.width, canvasMarginB - badge.height);
  drawTimeline();
  image(timeline, width * 0.22, 0);
  drawOverlayL();
  image(overlayL, 0, 0)
}

function drawTimeline(){
  timeline.colorMode(HSB);
  if(midiDataCH1.data[0] == 144)
  timeline.fill(map(midiDataCH1.data[1], 36, 51, 0, 360), 100, 100);
  if(midiDataCH1.data[0] == 128)
  timeline.fill(0, 0, 0, 0);
  if(frameCount%tick == 0){
    incrementTimeline += 2;
    timeline.rect(0,incrementTimeline,timeline.width, 2);}
  if(incrementTimeline > timeline.height)incrementTimeline = 0;

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
  overlayL.text("mouseX: " + mouseX + "   mouseY: " + mouseY + "   tickRate: " + updateRandom, 0, 0);
  overlayL.pop();
}

function drawBadge(){
  updateRandom = round(random(10, 20));
  if(frameCount%updateRandom == 0){
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

function keyPressed() {
  // rezizeCanvas to "posterSize"
  if (key == '0'){
    resizeCanvas(874, 1240);
    }
  // reziseCanvas to "fullSize"
  if (key == '9'){
    resizeCanvas(windowWidth, windowHeight);
    }
  // save current state to PNG
  if (key == 's' || key == 'S'){
    pixelDensity(exportScale);
    draw();
    let fileName = 
        "P5Project_" + projectVesion + "_" + year() + "_" + month() +
        "_" + day() + "_" + hour() + "_" + minute() + "_" + second() + ".png";
    save(fileName);
    pixelDensity(1);
  }
  // toggle settingsOverlay
  if (key == '1'){
    background(ColorBG);
    showSettingsOverlay = !showSettingsOverlay;
  }
  // toggle debugOverlay
  if (key == '2'){
    background(ColorBG);
    showDebugMenu = !showDebugMenu;
  }
}