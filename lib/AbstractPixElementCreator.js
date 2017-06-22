var C64GfxEv = C64GfxEv || {};

/**
* @required screenContext - the C64Screen
* @required layer - the layer to assign the pix element to.
*/
C64GfxEv.AbstractPixElementCreator = function(props) {
  props = props || {};
  this._screenContext = props.screenContext;
  this._layer = props.layer;
  this._elementWidth = props.elementWidth;
  this._elementHeight = props.elementHeight;
};

C64GfxEv.AbstractPixElementCreator.prototype.getScreenContext = function() {return this._screenContext;};
C64GfxEv.AbstractPixElementCreator.prototype.setScreenContext = function(screenContext) {this._screenContext = screenContext;};
C64GfxEv.AbstractPixElementCreator.prototype.getLayer = function() {return this._layer;};
C64GfxEv.AbstractPixElementCreator.prototype.setLayer = function(layer) {this._layer = layer;};
C64GfxEv.AbstractPixElementCreator.prototype.getElementWidth = function() {return this._elementWidth;};
C64GfxEv.AbstractPixElementCreator.prototype.setElementWidth = function(elementWidth) {this._elementWidth = elementWidth;};
C64GfxEv.AbstractPixElementCreator.prototype.getElementHeight = function() {return this._elementWidth;};
C64GfxEv.AbstractPixElementCreator.prototype.setElementHeight = function(elementHeight) {this._elementHeight = elementHeight;};

C64GfxEv.AbstractPixElementCreator.prototype.create = function(net) {
  var pixPathArray = [];
  for (var y = 0; y < this._elementHeight; y++) {
    for (var x = 0; x < this._elementWidth; x++) {
      var inputs = [x/this._elementWidth, y/this._elementHeight, 1];
      var outputs = net.activate(inputs);
      var color = this.outputsToColor(outputs);
      pixPathArray.push(this.newPixMap(x, y, color));
    }
  }
  var props = {
    pixPathArray:pixPathArray,
  };
  var pixElement = new C64Style.PixElement(this._screenContext, this._layer, props);
  pixElement.setIndex(net.getIndex());
  return pixElement;
};

C64GfxEv.AbstractPixElementCreator.prototype.outputsToColor = function(outputs) {
  throw new Error("AbstractPixElementCreator: outputsToColor must be implemented in child class");
};


C64GfxEv.AbstractPixElementCreator.prototype.newPixMap = function(x, y, color) {
  return {
    "type":"PIXEL",
    "x":x,
    "y":y,
    "color":color
  };
};
