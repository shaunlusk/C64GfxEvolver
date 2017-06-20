var C64GfxEv = C64GfxEv || {};

/**
* @required screenContext - the C64Screen
* @required layer - the layer to assign the pix element to.
*/
C64GfxEv.NetFactory = function(props) {
  props = props || {};
  this._layerSize = props.layerSize || [3,10,1];
};

C64GfxEv.NetFactory.prototype.createRandomNet = function() {
  return new C64GfxEv.Net({layerSize:this._layerSize, fillRandomWeights:true});
};

C64GfxEv.NetFactory.prototype.createNet = function() {
  return new C64GfxEv.Net({layerSize:this._layerSize});
};
