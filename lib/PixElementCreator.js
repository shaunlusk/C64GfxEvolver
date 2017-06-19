var C64GfxEv = C64GfxEv || {};

/**
* @required screenContext - the C64Screen
* @required layer - the layer to assign the pix element to.
*/
C64GfxEv.PixElementCreator = function(props) {
  props = props || {};
  this._screenContext = props.screenContext;
  this._layer = props.layer;
};

C64GfxEv.PixElementCreator.prototype.create = function(net) {
  var props = {
    
  };
  var pixElement = new C64Style.PixElement(this._screenContext, this._layer, props);
  return pixElement;
}
