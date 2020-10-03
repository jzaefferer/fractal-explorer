This is an experiment to make fractals explorable, with a tap to zoom in (and timer to zoom out).

Currently this only includes some fragments shaders copied from shadertoy, rendered with P5.

## References

This example with leftlet.js renders zoomable fractals: https://github.com/aparshin/leaflet-fractal
Overall its great, though the rendering with canvas and WebWorkers is still rather slow.
The color palette is pretty bad.

Finding and implementing better colors would be a nice improvement for that setup. Maybe based on https://moonblink.info/FracTest/man/palettes or https://moonblink.info/FracTest/man/usage#Palette

## TODOs

1. replace iTime, maybe make it static for now
2. try to use iMouse instead (one axis); maybe drop the cos() so it keeps zooming

See also https://www.shadertoy.com/view/Mss3zH
