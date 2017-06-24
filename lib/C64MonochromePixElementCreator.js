var C64GfxEv = C64GfxEv || {};

/**
* @class Creates a Pix Element using a NeuralNet.
* Assumes 1 output; if greater than threshold, use fg color; otherwise, bgColor
* @required screenContext - the C64Screen
* @required layer - the layer to assign the pix element to.
*/
C64GfxEv.C64MonochromePixElementCreator = function(props) {
  props = props || {};
  C64GfxEv.AbstractPixElementCreator.call(this, props);
  this._threshold = props.threshold || 0.5;
  this._fgColor = props.fgColor || C64Style.Color.LIGHTBLUE;
  this._bgColor = props.bgColor || C64Style.Color.BLUE;
};

C64GfxEv.C64MonochromePixElementCreator.prototype = new C64GfxEv.AbstractPixElementCreator();
C64GfxEv.C64MonochromePixElementCreator.prototype.constructor = C64GfxEv.C64MonochromePixElementCreator;

/**
* @override
*/
C64GfxEv.C64MonochromePixElementCreator.prototype.outputsToColor = function(outputs) {
  var val = outputs[0];
  val = val < 0 ? 0 : val;
  val = val > 1 ? 1 : val;

  return val < this._threshold ? this._fgColor : this._bgColor;
};
