var C64GfxEv = C64GfxEv || {};

/**
* @class Creates a Pix Element using a NeuralNet.
* Assumes 16 outputs (1 for each color value index; highest activation node is chosen)
* @required screenContext - the C64Screen
* @required layer - the layer to assign the pix element to.
*/
C64GfxEv.C64ColorPixElementCreator = function(props) {
  props = props || {};
  C64GfxEv.AbstractPixElementCreator.call(this, props);
};

C64GfxEv.C64ColorPixElementCreator.prototype = new C64GfxEv.AbstractPixElementCreator();
C64GfxEv.C64ColorPixElementCreator.prototype.constructor = C64GfxEv.C64ColorPixElementCreator;

/**
* @override
*/
C64GfxEv.C64ColorPixElementCreator.prototype.outputsToColor = function(outputs) {
  var max = outputs[0];
  var maxIdx = 0;
  for (var i = 1; i < outputs.length; i++) {
    if (outputs[i] > max) {
      max = outputs[i];
      maxIdx = i;
    }
  }
  return C64Style.Color.getByIndex(maxIdx);
};
