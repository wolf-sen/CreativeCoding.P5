//new p5();
//misc.
var incrementTimeline = 0;
//General
var exportScale = 4;
var projectVesion = '0.6';
//midi
var midiDeviceName = 'Launchkey 61';
var myInput;
var midiDataCH1 = {
  data: [0, 0, 0], 
}
//Image
var screenMargin = 25;
var tick = 1;

function preload(){
  textureGrain = loadImage('./assets/grain_overlay_matrix_hard.png');
  flowerICO = loadImage('assets/flower_white.png');
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
  loadColors();
  overlayL.angleMode(DEGREES);
  // enable p5.grain.min library
  p5grain.setup();

  // enable webMIDI.iife library
  WebMidi
  .enable()
  .then(console.log("WebMidi enabled!"))
  .then(onEnabled)
  .catch(err => alert(err));
}

//Render functions
function draw() {
  currentFPS = round(frameRate());
  background(colorBG);
  
  //drawBadge
  push();
  glow(0, 0);
  tint(colorA1);
  drawBadge();
  image(badge, canvasMarginR - badge.width, canvasMarginB - badge.height);
  pop();

  //drawTimeline
  drawTimeline();
  push();
  blendMode(ADD);
  glow(0, 0);
  //color split for timeline
  tint(255, 0, 0, 110)
  image(timeline, width * 0.22 - 1, 0);
  tint(0, 255, 0, 110)
  image(timeline, width * 0.22, 0);
  tint(0, 0, 255, 110)
  image(timeline, width * 0.22 + 1, 0);
  pop();

  //drawOverlayLayout
  drawOverlayL();
  //color abebration
  push();
  glow(colorA2, 30);
  translate(2, 4);
  tint(0, 0, 255, 70);
  image(overlayL, 0, 0);
  pop();
  //main
  push();
  glow(colorA1, 10);
  tint(colorA1);
  image(overlayL, 0, 0);
  pop();

  //drawOverlayGrain
  push();
  glow(0, 0);
  drawFilmGrain();
  pop();
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
  overlayL.stroke(255);
  overlayL.strokeWeight(2);
  overlayL.line(overlayLMarginR, overlayLMarginT, overlayLMarginR, height * 0.6);
  overlayL.line(overlayLMarginR, overlayLMarginT, overlayLMarginR - screenMargin, 0);
  overlayL.line(overlayLMarginR, height * 0.6, overlayLMarginR + screenMargin, height * 0.6 + screenMargin);
  overlayL.noStroke();
  overlayL.fill(255);
  overlayL.rect(overlayLMarginL, overlayLMarginT, 10, 10);
  overlayL.push();
  overlayL.translate(overlayLMarginR - 5, overlayLMarginT + 700, 0);
  overlayL.rotate(-90);
  overlayL.textFont(mNineFont);
  overlayL.textSize(12);
  overlayL.text("mouseX: " + mouseX + "   mouseY: " + mouseY + "   FrameRate: " + currentFPS, 0, 0);
  overlayL.pop();
  overlayL.textFont(mNineFont);
  overlayL.textSize(11);
  overlayL.textAlign(LEFT, BOTTOM);
  overlayL.text("//P5.JS Project - version " + projectVesion + " - created by SEN. (Max W.)",overlayLMarginL, overlayLMarginB);
}
function drawBadge(){
  updateRandom = round(random(10, 20));
  if(frameCount%updateRandom == 0){
    badge.clear();
    badgeMargin = 5;
    badge.pixelDensity(5)
    //badge.background(0, 0, 255, 100);
    glowBadge(colorG1, 20);
    badge.image(flowerICO, badgeMargin/2, badge.height - 0.95 *badge.width, badge.width - 1* badgeMargin, badge.width - 1* badgeMargin);
    glowBadge(colorG1, 10);
    badge.fill(255);
    badge.rect(0, badge.height * 0.70, 80, 5);
    //random binary pattern
    badgeCodeChance = 1;
    for (let incrementY = 0; incrementY < (badge.height * 0.68); incrementY += 5) {
      for (let incrementX = 0; incrementX < badge.width; incrementX += 5) {
        if(random(0, 100) < badgeCodeChance) badgeCodeState = 255;
        else badgeCodeState = 0;
        badge.fill(255, badgeCodeState);
        badge.rect(incrementX, incrementY, 5, 5);
      }
      badgeCodeChance += 2.7 ;
    }
  }
}
function drawFilmGrain(){
  textureOverlay(textureGrain, {
    width: textureGrain.width/2,
    height: textureGrain.height/2,
    animate: true,
});
}

//MidiListener
function onEnabled() {
  WebMidi.inputs.forEach(input => 
    console.log("webMIDI: ", input.state, input.name));

  myInput = WebMidi.getInputByName(midiDeviceName);
  console.log("webMIDI: selected input id, ", myInput.id);

  myInput.channels[1].addListener("noteon", listenCH1 => {
    midiDataCH1 = listenCH1;
    console.log("midiDataCH1: ", midiDataCH1.data);
  });

  myInput.channels[1].addListener("noteoff", listenCH1 => {
    midiDataCH1 = listenCH1;
    console.log("midiDataCH1: ",midiDataCH1.data);
  });
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
//hotkey mapping
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
    saveCanvas(fileName);
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
//all color variables
function loadColors() {
  window.colorBG = color(35);
  window.colorA1 = color(255, 59, 107);
  window.colorA2 = color(0, 40, 255);
  window.colorG1 = color(255, 0, 90);
}
//Glow/Blur Effect
function glow(glowColor, blurriness){
  drawingContext.shadowBlur = blurriness;
  drawingContext.shadowColor = glowColor;
}
function glowBadge(glowColor, blurriness){
  badge.drawingContext.shadowBlur = blurriness;
  badge.drawingContext.shadowColor = glowColor;
}
function glowTimeline(glowColor, blurriness){
  timeline.drawingContext.shadowBlur = blurriness;
  timeline.drawingContext.shadowColor = glowColor;
}