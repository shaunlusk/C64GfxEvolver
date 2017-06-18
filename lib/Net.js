var C64GfxEv = C64GfxEv || {};

C64GfxEv.Net = function(props) {
  props = props || {};
  this._layerCount = props.layerCount || 3;
  this._layerSize = props.layerSize || [3,10,1];
  this._layers = [];
  this._weights = [];
  this.initialize(props.fillRandomWeights);
};


C64GfxEv.Net.prototype.initialize = function(fillRandomWeights) {
  var i, n, w;
  // nodes
  for (i = 0; i < this._layerCount; i++) {
    var layer = [];
    for (n = 0; n < this._layerSize[i]; n++) {
      layer.push(0);
    }
    this._layers.push(layer);
  }

  // weights - tgt x src
  // for each layer of weights...
  for (i = 1; i < this._layerCount; i++) {
    var weights = [];
    // for each target node...
    for (n = 0; n < this._layerSize[i]; n++) {
      var tgtNodeInboundWgts = [];
      // ... add a weight for each source node
      for (w = 0; w < this._layerSize[i-1]; w++) {
        tgtNodeInboundWgts.push(fillRandomWeights ? this.getRandomWeight() : 0);
      }
      weights.push(tgtNodeInboundWgts);
    }
    this._weights.push(weights);
  }
};

C64GfxEv.Net.prototype.getRandomWeight = function() {

};

C64GfxEv.Net.prototype.activate = function(input) {

};

C64GfxEv.Net.prototype.getOutputs = function() {

};

C64GfxEv.Net.prototype.clone = function() {
  var props = {};
  var net = new C64GfxEv.Net(props);
  // TODO fill in weights
  return net;
};
