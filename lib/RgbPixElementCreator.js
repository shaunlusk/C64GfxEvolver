var C64GfxEv = C64GfxEv || {};

/**
* @class Creates a Pix Element using a NeuralNet.
* Assumes 3 outputs (RGB)
* @required screenContext - the C64Screen
* @required layer - the layer to assign the pix element to.
*/
C64GfxEv.RgbPixElementCreator = function(props) {
  props = props || {};
  C64GfxEv.AbstractPixElementCreator.call(this, props);
};

C64GfxEv.RgbPixElementCreator.prototype = new C64GfxEv.AbstractPixElementCreator();
C64GfxEv.RgbPixElementCreator.prototype.constructor = C64GfxEv.RgbPixElementCreator;

/**
* @override
*/
C64GfxEv.RgbPixElementCreator.prototype.outputsToColor = function(outputs) {
  var values = outputs.map(function(value) {
    value = value < 0 ? 0 : value;
    value = value > 1 ? 1 : value;
    value *= 255;
    return value;
  });

  return "rgb(" + values[0] + ", " + values[1] + ", " + values[2] + ")";
};
