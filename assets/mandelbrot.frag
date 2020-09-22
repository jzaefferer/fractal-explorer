// Created by inigo quilez - iq/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

// This shader computes the distance to the Mandelbrot Set for everypixel, and colorizes
// it accoringly.
//
// Z -> Z²+c, Z0 = 0.
// therefore Z' -> 2·Z·Z' + 1
//
// The Hubbard-Douady potential G(c) is G(c) = log Z/2^n
// G'(c) = Z'/Z/2^n
//
// So the distance is |G(c)|/|G'(c)| = |Z|·log|Z|/|Z'|
//
// More info here: http://www.iquilezles.org/www/articles/distancefractals/distancefractals.htm

precision highp float;

uniform vec3      iResolution;           // viewport resolution (in pixels)
uniform float     iTime;                 // shader playback time (in seconds)

float distanceToMandelbrot(in vec2 c)
{
  #if 1
  {
    float c2=dot(c,c);
    // skip computation inside M1 - http://iquilezles.org/www/articles/mset_1bulb/mset1bulb.htm
    if(256.*c2*c2-96.*c2+32.*c.x-3.<0.)return 0.;
    // skip computation inside M2 - http://iquilezles.org/www/articles/mset_2bulb/mset2bulb.htm
    if(16.*(c2+2.*c.x+1.)-1.<0.)return 0.;
  }
  #endif
  
  // iterate
  float di=1.;
  vec2 z=vec2(0.);
  float m2=0.;
  vec2 dz=vec2(0.);
  for(int i=0;i<300;i++)
  {
    if(m2>1024.){di=0.;break;}
    
    // Z' -> 2·Z·Z' + 1
    dz=2.*vec2(z.x*dz.x-z.y*dz.y,z.x*dz.y+z.y*dz.x)+vec2(1.,0.);
    
    // Z -> Z² + c
    z=vec2(z.x*z.x-z.y*z.y,2.*z.x*z.y)+c;
    
    m2=dot(z,z);
  }
  
  // distance
  // d(c) = |Z|·log|Z|/|Z'|
  float d=.5*sqrt(dot(z,z)/dot(dz,dz))*log(dot(z,z));
  if(di>.5)d=0.;
  
  return d;
}

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
  vec2 p=(2.*fragCoord-iResolution.xy)/iResolution.y;
  
  // animation
  float tz=.5-.5*cos(.225*iTime);
  float zoo=pow(.5,13.*tz);
  vec2 c=vec2(-.05,.6805)+p*zoo;
  
  // distance to Mandelbrot
  float d=distanceToMandelbrot(c);
  
  // do some soft coloring based on distance
  d=clamp(pow(4.*d/zoo,.2),0.,1.);
  
  vec3 col=vec3(d);
  
  fragColor=vec4(col,1.);
}

// shadertoy defines this implicitly
// based on https://github.com/n1ckfg/PShaderToy/blob/master/p5jsShaderToy/js/shaders/snow.frag#L137-L139
void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
