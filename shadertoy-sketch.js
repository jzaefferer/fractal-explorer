let starnest;
let snow;
let mandelbrot;
let active;

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
  active.setUniform("iResolution", [window.innerWidth, window.innerHeight]);
  active.setUniform("iTime", frameCount / 50);
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
