let canvas;
let exportScaleSlider;
let backgroundColorSlider;
//project settings
let exportScale = 2;
let projectVesion = 0.02;
let showSettingsOverlay = false;
let showDebugMenu = false;
//image variables
let screenMargin = 25;
let ColorBG = 20;


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  noStroke();
  initalizeSettings();
}

function draw() {
  background(ColorBG);

  debugOverlay();
  settingsOverlay();
}







//initialisation settings objects
function initalizeSettings() {
  exportScaleSlider = createSlider(1, 10, exportScale, 1);
  exportScaleSlider.position(screenMargin + 15, screenMargin + 15);
  exportScaleSlider.hide();
  
  backgroundColorSlider = createSlider(10, 100, ColorBG, 1);
  backgroundColorSlider.position(screenMargin + 15, screenMargin + 15 + 60);
  backgroundColorSlider.hide();
  }
// draw SettingsOverlay function
function settingsOverlay() {
    if (showSettingsOverlay == true){
      push();
      // settings container
      stroke(90);
      strokeWeight(2);
      fill(25);
      settingsContainer = rect(screenMargin, screenMargin, width - 2*screenMargin, height * 0.2, 5);
      
      // settings objects
      noStroke();
      fill(180);
      // draw exportScale Slider
      exportScaleSlider.show();
      exportScale = exportScaleSlider.value();
      text('exportScale: ' + exportScale, screenMargin + 17,70,200,200);
      // draw backbroundColor Slider
      backgroundColorSlider.show();
      ColorBG = backgroundColorSlider.value();
      text('ColorBG: ' + ColorBG, screenMargin + 17,70+60,200,200);
      pop();
    }
    if (showSettingsOverlay == false){
      if (exportScaleSlider.show()){
        exportScaleSlider.hide();
      }
      if (backgroundColorSlider.show()){
        backgroundColorSlider.hide();
      }
    }
  }
  
function debugOverlay() {
    if (showDebugMenu == true){
      fill(0, 0, 255);
      ellipse(screenMargin, screenMargin, 20, 20);
    }
  }

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