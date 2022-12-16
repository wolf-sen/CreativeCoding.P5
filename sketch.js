//project settings
let exportScale = 2;
let projectVesion = 0.02;
let showSettingsOverlay = false;
let showDebugMenu = false;
//image variables
let screenMargin = 25;
let ColorBG = 20;


function setup() {
  console.log('running Setup');
  initalizeVariables();
  canvas = createCanvas(windowWidth, windowHeight);
  noStroke();
  initalizeSettings();

  // check for existence of method
  if (navigator.requestMIDIAccess) console.log('This browser supports WebMIDI!');
  else console.log('WebMIDI is not supported in this browser.');
  // ask for MIDI access
  navigator.requestMIDIAccess().then(onMIDISuccess);

  console.log('finished Setup');
}

function draw() {
  background(ColorBG);

  debugOverlay();
  settingsOverlay();
}


// assign midi device
function onMIDISuccess(midiAccess) {
  // console.log(midiAccess)
  const midi = midiAccess
  const inputs = midi.inputs.values()
  const input = inputs.next()
  console.log(input)
  input.value.onmidimessage = onMIDIMessage
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
  
  backgroundColorSlider = createSlider(10, 100, ColorBG, 1);
  backgroundColorSlider.position(screenMargin + 15, screenMargin + 15 + 60);
  backgroundColorSlider.parent(settingsInterface);

  settingsInterface.hide();
  }
// draw SettingsOverlay function
function settingsOverlay() {
    if (showSettingsOverlay == true){
      push();
      // settings container
      stroke(90);
      strokeWeight(2);
      fill(25);
      rect(screenMargin, screenMargin, width - 2*screenMargin, height * 0.2, 5);
      
      // settings objects
      noStroke();
      fill(180);
      // draw exportScale Slider
      settingsInterface.show();
      exportScale = exportScaleSlider.value();
      text('exportScale: ' + exportScale, screenMargin + 17,70,200,200);
      // draw backbroundColor Slider
      ColorBG = backgroundColorSlider.value();
      text('ColorBG: ' + ColorBG, screenMargin + 17,70+60,200,200);
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
        showSettingsOverlay = !showSettingsOverlay;
      }
      // toggle debugOverlay
      if (key == '2'){
        showDebugMenu = !showDebugMenu;
      }
  }