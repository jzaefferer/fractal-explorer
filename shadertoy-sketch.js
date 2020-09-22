// Click within the image to toggle
// the shader used by the quad shape
// Note: for an alternative approach to the same example,
// involving changing uniforms please refer to:
// https://p5js.org/reference/#/p5.Shader/setUniform

let starnest;
let snow;
let mandelbrot;
let active;
let time = 0.0;

function preload() {
  // note that we are using two instances
  // of the same vertex and fragment shaders
  starnest = loadShader("assets/blank.vert", "assets/starnest.frag");
  snow = loadShader("assets/blank.vert", "assets/snow.frag");
  mandelbrot = loadShader("assets/blank.vert", "assets/mandelbrot.frag");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  active = mandelbrot;
  noStroke();

  document.querySelector("select").addEventListener("change", (event) => {
    active = {
      mandelbrot,
      snow,
      starnest,
    }[/** @type HTMLSelectElement */ (event.target).value];
  });
}

function draw() {
  // update the offset values for each shader,
  // moving orangeBlue in vertical and redGreen
  // in horizontal direction
  time += 0.01;
  active.setUniform("iResolution", [window.innerWidth, window.innerHeight]);
  active.setUniform("iTime", [time]);
  active.setUniform("iGlobalTime", millis() / 1000.0);
  active.setUniform("iMouse", [
    mouseX,
    mouseY,
    mouseIsPressed ? 1.0 : 0.0,
    mouseIsPressed ? 1.0 : 0.0,
  ]);

  shader(active);
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
