var C64GfxEv = C64GfxEv || {};

/**
* @required screenContext - the C64Screen
* @required layer - the layer to assign the pix element to.
*/
C64GfxEv.NetFactory = function(props) {
  props = props || {};
  this._layerConfig = props.layerConfig || {input: 3, output: {size:16,activationType:"sigmoid"},};
};

C64GfxEv.NetFactory.prototype.createRandomNet = function() {
  return new C64GfxEv.Net({layerConfig:this._layerConfig, fillRandomWeights:true});
};

C64GfxEv.NetFactory.prototype.createNet = function() {
  return new C64GfxEv.Net({layerConfig:this._layerConfig});
};
