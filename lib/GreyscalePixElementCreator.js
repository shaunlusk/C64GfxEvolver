var C64GfxEv = C64GfxEv || {};

/**
* @class Creates a Pix Element using a NeuralNet.
* Assumes 1 output (0-1 intensity of white)
* @required screenContext - the C64Screen
* @required layer - the layer to assign the pix element to.
*/
C64GfxEv.GreyscalePixElementCreator = function(props) {
  props = props || {};
  C64GfxEv.AbstractPixElementCreator.call(this, props);
};

C64GfxEv.GreyscalePixElementCreator.prototype = new C64GfxEv.AbstractPixElementCreator();
C64GfxEv.GreyscalePixElementCreator.prototype.constructor = C64GfxEv.GreyscalePixElementCreator;

/**
* @override
*/
C64GfxEv.GreyscalePixElementCreator.prototype.outputsToColor = function(outputs) {
  var val = outputs[0];
  val = val < 0 ? 0 : val;
  val = val > 1 ? 1 : val;
  val *= 255;

  return "rgb(" + val + ", " + val + ", " + val + ")";
};
