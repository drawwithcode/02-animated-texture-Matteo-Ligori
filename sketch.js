var cols, rows;
//aggiungere una terza dimensione al perlin noise che corrisponde al tempo, in queso modo non lo renderemo più statico, ma in movimento
var zoff = 0;
let sliderPix;
let slidNoise;
let slidSat;
let slidBright;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255);
  background(51);
  //creo quattro slider che modificano le proprietà della texture
  //grandezza pixel
  sliderPix = createSlider(5, 50, 10, 0);
  sliderPix.position(10, height - 50);
  sliderPix.style("width", "100px");
  //valore del noise
  slidNoise = createSlider(0.01, 0.5, 0.05, 0);
  slidNoise.position(10, height - 100);
  slidNoise.style("width", "100px");
  //saturazione colore
  slidSat = createSlider(0, 255, 255, 0);
  slidSat.position(width - 150, height - 100);
  slidSat.style("width", "100px");
  //luminosità
  slidBright = createSlider(0, 255, 255, 0);
  slidBright.position(width - 150, height - 50);
  slidBright.style("width", "100px");
}

function draw() {
  var yoff = 0;
  var scl = sliderPix.value();
  var inc = slidNoise.value();
  var sat = slidSat.value();
  var brg = slidBright.value();

  noStroke();
  // creo una griglia la cui scala è indicata dalla variabile scl

  cols = floor(width / scl);
  rows = floor(height / scl);
  //creo texture usando i valori di cols e rows
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      //il perlin noise è una variabile che può esistere in qualsisi dimensione, in questo la userò con i valori x, y, e z che corrisponde al tempo
      //se non ci fosse z il disegno rimarrebbe fermo in quanto il noise a differenza del random non ha uin refresh in tempo con il framerate
      var g = noise(xoff, yoff, zoff / 360) * 360;
      xoff += inc;
      fill(g, sat, brg);
      rect(x * scl, y * scl, scl);
    }
    yoff += inc;
    //non utilizzo la variabile inc che definisce il valore del noise perchè sarebbe troppo veloce
    zoff += 0.1;
  }
  textSize(20);
  textStyle(BOLD);
  fill("white");
  text("Saturation", width - 150, height - 110);
  text("Brightnes", width - 150, height - 60);
  text("Smoothnes", 10, height - 110);
  text("Resolution", 10, height - 60);
}

// refering to: https://www.youtube.com/watch?v=BjoM9oKOAKY&t=714s
