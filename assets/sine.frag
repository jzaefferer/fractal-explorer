// based on https://www.shadertoy.com/view/llycRR

precision highp float;

uniform vec3      iResolution;           // viewport resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)
uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click

float distanceFromSine(vec2 uv, float time) {
	float yValOfSineAtTheGivenPoint = sin(uv.x * 5.0 + time) * 0.8;
	// return distance from sine
	return abs(uv.y - yValOfSineAtTheGivenPoint);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    uv = uv * 2.0 - 1.0;

    float dis = distanceFromSine(uv, iTime) * 0.5;
    float colorBasedOnDistance = 0.5 - dis;
    if (dis > 0.01) {
        colorBasedOnDistance = 0.0;
    } else {
        colorBasedOnDistance = 1.0;
    }

    vec3 col = vec3(colorBasedOnDistance,0.0,0.0);

    fragColor = vec4(col,1.0);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
