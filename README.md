# SL Gfx Evolver

Run 'yarn install' or 'npm install' to get setup.  Then visit index.html in a browser.

This is a simple application that uses the C64Style graphics framework
and very simple generated neural networks to produce images.

A population of networks is generated randomly to start, and one image is
produced from each. When you click on one of the displayed images, the
network that produced it is used to produce a new population.  The new
population of networks will be cloned from the selected one, and given
random mutations to produce different looking images.  The process
then repeats when another image is selected.  Over time, increasingly
complex images can be "evolved".

Use the form below to select the type of image output to generate,
and the parameters for the networks.  Click the '+' symbol to add additional
'hidden' layers to the networks.  You can configure the number of nodes
and the node activation type for each layer.  When ready to generate the
starting population, click 'Start'.

This is mostly just a toy, have fun!  Enhancements may be coming in the
future.
