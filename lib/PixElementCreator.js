var C64GfxEv = C64GfxEv || {};

/**
* @required screenContext - the C64Screen
* @required layer - the layer to assign the pix element to.
*/
C64GfxEv.PixElementCreator = function(props) {
  props = props || {};
  this._screenContext = props.screenContext;
  this._layer = props.layer;
  this._elementWidth = props.elementWidth;
  this._elementHeight = props.elementHeight;
};

C64GfxEv.PixElementCreator.prototype.create = function(net) {
  var pixPathArray = [];
  for (var y = 0; y < this._elementHeight; y++) {
    for (var x = 0; x < this._elementWidth; x++) {
      var inputs = [x, y, 1];
      var outputs = net.activate(inputs);
      var color = this._outputsToColor(outputs);
      pixPathArray.push(this._newPixMap(x, y, color));
    }
  }
  var props = {
    pixPathArray:pixPathArray
  };
  var pixElement = new C64Style.PixElement(this._screenContext, this._layer, props);
  return pixElement;
};

C64GfxEv.PixElementCreator.prototype._outputsToColor = function(outputs) {
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


C64GfxEv.PixElementCreator.prototype._newPixMap = function(x, y, color) {
  return {
    "type":"PIXEL",
    "x":x,
    "y":y,
    "color":color
  };
};
