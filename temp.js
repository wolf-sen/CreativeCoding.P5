filmGrain.loadPixels();

for (let y = 0; y < filmGrain.height; y++) {
  for (let x = 0; x < filmGrain.width; x++) {
    // Get the pixel index
    let index = (x + y * filmGrain.width) * 4;

    // Modify the pixel color
    filmGrain.pixels[index] = filmGrain.pixels[index] + random(-5, 5);
    filmGrain.pixels[index + 1] = filmGrain.pixels[index + 1] + random(-5, 5);
    filmGrain.pixels[index + 2] = filmGrain.pixels[index + 2] + random(-5, 5);
  }
}

filmGrain.updatePixels();