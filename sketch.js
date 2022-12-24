new p5();
//project settings
let exportScale = 2;
let projectVesion = 0.06;
let showSettingsOverlay = false;
let showDebugMenu = false;
//image variables
let screenMargin = 25;
let ColorBG = color(210, 10, 0);
let midiStatus = false;
let directionHue = false;
let dotHue = 210;
let dotBrightness = 100;


function preload(){
  fontDigi = loadFont('assets/DigibraReg.otf');
  fontBlue = loadFont('assets/BlueScreen.ttf');
  initalizeVariables();
}
function setup() {
  console.log('running Setup');
  createCanvas(windowWidth, windowHeight);
  noStroke();
  angleMode(DEGREES);
  frameRate(30);
  initalizeSettings();

  // enable webMIDI.js library
  WebMidi
  .enable()
  .then(console.log("WebMidi enabled!"))
  .then(onEnabled)
  .catch(err => alert(err));

  background(ColorBG);
}

function draw() {
  endlessSpiral();
  imageLayout()
  debugOverlay();
  settingsOverlay();
}


function onEnabled() {
  WebMidi.inputs.forEach(input => 
    console.log(input.state, input.name, input.connection));
  midiStatus = true;
  
}

// initialisation variables
function initalizeVariables() {
  let canvas;
  let exportScaleSlider;
  let backgroundColorSlider;
}
// initialisation settings objects
function initalizeSettings() {
  fill(200, 20, 0);
  settingsInterface = createDiv();

  exportScaleSlider = createSlider(1, 10, exportScale, 1);
  exportScaleSlider.position(screenMargin + 15, screenMargin + 15);
  exportScaleSlider.parent(settingsInterface);
  
  //backgroundColorSlider = createSlider(10, 100, ColorBG, 1);
  //backgroundColorSlider.position(screenMargin + 15, screenMargin + 15 + 60);
  //backgroundColorSlider.parent(settingsInterface);

  settingsInterface.hide();
  }
// draw SettingsOverlay function
function settingsOverlay() {
    if (showSettingsOverlay == true){
      push();
      background(ColorBG);
      // settings container
      stroke(90);
      strokeWeight(2);
      fill(25);
      rect(screenMargin, screenMargin, width - 2*screenMargin, height * 0.2, 5);
      
      // settings objects
      noStroke();
      fill(180);
      //Midi Status
      if (midiStatus == true){
        push();
        textAlign(CENTER, CENTER);
        text('Midi Status', width -3.5 *screenMargin, height *0.2 );
        fill(0, 200, 0);
        ellipse(width -2 *screenMargin, height *0.2 , 10, 10);
        pop();
      }
      else{
        push();
        textAlign(CENTER, CENTER);
        text('Midi Status', width -3.5 *screenMargin, height *0.2 );
        fill(200, 0, 0);
        ellipse(width -2 *screenMargin, height *0.2 , 10, 10);
        pop();
      }
      // draw exportScale Slider
      settingsInterface.show();
      exportScale = exportScaleSlider.value();
      text('exportScale: ' + exportScale, screenMargin + 17,70,200,200);
      /*// draw backbroundColor Slider
      ColorBG = backgroundColorSlider.value();
      text('ColorBG: ' + ColorBG, screenMargin + 17,70+60,200,200);*/
      pop();
    }
    if (showSettingsOverlay == false){
      settingsInterface.hide();
    }
  }
// draw debugOverlay function
function debugOverlay() {
    if (showDebugMenu == true){
      fill(0, 0, 255);
      ellipse(screenMargin, screenMargin, 20, 20);
    }
  }
// shortcut list
function keyPressed() {
      // rezizeCanvas to "posterSize"
      if (key == '0'){
        resizeCanvas(750, 1000);
        background(ColorBG);
        }
      // reziseCanvas to "fullSize"
      if (key == '9'){
        resizeCanvas(windowWidth, windowHeight);
        background(ColorBG);
        }
      // save current state to PNG
      if (key == 's' || key == 'S'){
        pixelDensity(exportScale);
        background(ColorBG);
        draw();
        let fileName = 
            "P5Project_" + projectVesion + "_" + year() + "_" + month() +
            "_" + day() + "_" + hour() + "_" + minute() + "_" + second() + ".png";
        save(fileName);
        pixelDensity(1);
        background(ColorBG);
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

function endlessSpiral(){
  let noteSize = 15;
  let vNull = createVector(0, 0);
  let vCenter = createVector(width/2, height/2);
  let vDotPos = createVector(100, 0);
  vDotPos.rotate(frameCount/4);
  vDotPos.x -= 40;
  if(directionHue == true) dotHue += 0.1;
  else dotHue -= 0.1;
  if(dotHue < 0) directionHue = true;
  if(dotHue > 100) directionHue = false;
  //dotBrightness -= 0.1;
  dotColor = color(dotHue, 20, 10);
  fill(dotColor);
  for(let rotation = 0; rotation <= 360; rotation += 10){
        push();
        vDotPos.rotate(15);
        vNoteX = vDotPos.x + vCenter.x;
        vNoteY = vDotPos.y + vCenter.y;
        ellipse(vNoteX, vNoteY, noteSize, noteSize);
        pop();
    }
}

function imageLayout() {
  push();
  stroke(0);
  noFill();
  strokeWeight(2);
  line(screenMargin - 5, screenMargin, screenMargin + 35, screenMargin);
  line(screenMargin, screenMargin - 5, screenMargin, screenMargin + 35);
  line(screenMargin - 5, height - screenMargin, screenMargin + 35, height - screenMargin);
  line(screenMargin, height - screenMargin + 5, screenMargin, height - screenMargin - 35);
  line(width - screenMargin + 5, screenMargin, width - screenMargin - 35, screenMargin);
  line(width - screenMargin + 5, height - screenMargin, width - screenMargin - 35, height - screenMargin);
  line(width - screenMargin, screenMargin - 5, width - screenMargin, screenMargin + 35);
  line(width - screenMargin, height - screenMargin + 5, width - screenMargin, height - screenMargin - 35);
  line(screenMargin, height/2 - 15, screenMargin, height/2 + 15);
  line(width - screenMargin, height/2 - 15, width - screenMargin, height/2 + 15);
  ellipse(width/2, height/2, 350);
  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  textFont(fontDigi);
  textSize(45);
  text("GENERATING THINGS", screenMargin + 20, screenMargin + 10);
  textAlign(RIGHT, TOP);
  textFont('arial');
  textSize(10);
  text(projectVesion, width - screenMargin - 20, screenMargin + 20);
  textAlign(LEFT, TOP);
  text("СОЗДАВАЙТЕ ВЕЩИ", screenMargin + 20, screenMargin + 100);
  pop();
}