//SETUP Stuff
function preload() {
    initConfig();
    initResposive();
    initColor();
    // song = loadSound('Ceremonial Library - Asher Fulero.mp3')
  
  }
  
  function setup() {
    createCanvasCustom(874, 1240);
    createGraphicsCustom('layout', width, height);
    createGraphicsCustom('spectrum', 800, 800);
  
    // song.play()
    // song.loop()
    // song.setVolume(0.2)
  
    //config
    frameRate(60);
    angleMode(DEGREES);
    spectrum.angleMode(DEGREES);
  
  
    spectrum.colorMode(HSB);
    //init microphone
    window.mic = new p5.AudioIn();
    mic.start();
    //init FFT analyzer
    window.micFFT = new p5.FFT(0.8, 64);
    micFFT.setInput(mic);
  }
  
  
  //drawing functions
  //main canvas
  function draw() {
    updateMicrophone();
    background(colorBG);
  
    //drawSpectrum
    drawSpectrum();
    image(spectrum, 30, 160)
  
    //draw layout buffer on main canvas
    drawLayout();
    image(layout, 0, 0);
  }
  //layout overlay
  function drawLayout() {
    layout.clear();
    layout.fill(colorAccent1);
    layout.rect(canvasMarginL, canvasMarginT, inputVolume * 80, 5);
  }
  //spectrum Buffer
  function drawSpectrum() {
    spectrum.clear();
    spectrum.strokeWeight(2);
    hueSpectrum = hueSpectrumStart;
  
    //spectrum.background(255, 0, 0, 10) for debugging
    spectrum.push();
    spectrum.translate(spectrum.width/2, spectrum.height/2);
    spectrum.rotate(-90);
    for (let index = 0; index < inputSpectrum.length; index++) {
      spectrum.stroke(hueSpectrum, 80, 100);
      spectrum.line(100, 0, 70 + inputSpectrum[index]* 1.2, 0);
  
      //spectrum.line(20, 0, 20 + index, 0);
      spectrum.rotate(spectrumAngle/2);
      hueSpectrum += hueSpectrumFactor
    }
    /*for (let index = inputSpectrum.length; index > 0; index--) {
      spectrum.stroke(hueSpectrum, 80, 100);
      spectrum.line(100, 0, 70 + inputSpectrum[index]* 1.2, 0);
      //spectrum.line(20, 0, 20 + index, 0);
      spectrum.rotate(spectrumAngle/2);
      hueSpectrum -= hueSpectrumFactor
    }*/
    spectrum.pop();
  }
  
  //technical functions
  function updateMicrophone() {
    //console.log(mic.getLevel());
    window.inputVolume = map(mic.getLevel(), 0, 0.01, 0, 1);
    window.inputSpectrum = micFFT.analyze();
    let vol = mic.getLevel();
    vol = lerp(vol, vol, 0.9);  // slow down the change in volume
    
  
  
  }
  function keyPressed() {
    //save function with scaling
    if (key == 's' || key == 'S'){
      pixelDensity(exportScale);
      draw();
      let fileName = 
          "LOOMEYsP5project_" + year() + "_" + month() +
          "_" + day() + "_" + hour() + "_" + minute() + 
          "_" + second() + ".png";
      saveCanvas(fileName);
      pixelDensity(1);
    }
  }
  
  
  //initalisation
  //Color variables
  function initColor() {
    window.colorBG = color(25);
    window.colorAccent1 = color(210, 235, 250)
    window.colorAccent2 = color(210, 235, 250);
    window.hueSpectrumStart = 140;
    window.hueSpectrumFactor = 1;
  }
  
  //visual settings
  function initResposive() {
    window.screenMargin = 50;
    window.spectrumResolution = 32; //needs to be a power of Two!!
    window.spectrumAngle = 360 / 32;
  }
  
  //technical settings
  function initConfig() {
    window.exportScale = 10;
    window.micSensitivity =200;
    window.spectrumSenitivity = 5;
  }
  
  
  //Utils. (just no touchy here !)
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