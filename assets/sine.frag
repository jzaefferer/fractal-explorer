precision highp float;

uniform vec3      iResolution;           // viewport resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)
uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
  // vec2 uv=fragCoord.xy/iResolution.xy-.5;
	// uv.y*=iResolution.y/iResolution.x;
  fragColor = vec4(fragCoord,0.5,1.);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
