var C64GfxEv = C64GfxEv || {};

C64GfxEv.Net = function(props) {
  props = props || {};
  this._layerSize = props.layerSize || [3,10,16];
  this._layers = [];
  this._weights = [];
  this._layerWeightCount = [];
  this._totalWeightCount = 0;
  this._idx = -1;
  this.initialize(props.fillRandomWeights);
};

C64GfxEv.Net.prototype.initialize = function(fillRandomWeights) {
  var i, n;
  // nodes
  for (i = 0; i < this._layerSize.length; i++) {
    var layer = [];
    for (n = 0; n < this._layerSize[i]; n++) {
      layer.push(0);
    }
    this._layers.push(layer);
  }

  this._fillWeights(function(layer, target, source) {
    return fillRandomWeights ? this.getRandomWeight() : 0;
  }.bind(this));
};

C64GfxEv.Net.prototype.setIndex = function(idx) {this._idx = idx;};
C64GfxEv.Net.prototype.getIndex = function() {return this._idx;};

C64GfxEv.Net.prototype._fillWeights = function(providerFn) {
  this._layerWeightCount = [];
  this._totalWeightCount = 0;

  this._weights = [];
  // weights - tgt x src
  // for each layer of weights...
  for (var i = 1; i < this._layerSize.length; i++) {
    var layerWeightCount = 0;
    var weights = [];
    // for each target node...
    for (var tgt = 0; tgt < this._layerSize[i]; tgt++) {
      var tgtNodeInboundWgts = [];
      // ... add a weight for each source node
      for (src = 0; src < this._layerSize[i-1]; src++) {
        var val = providerFn(i-1, tgt, src);
        tgtNodeInboundWgts.push(val);
      }
      weights.push(tgtNodeInboundWgts);
      layerWeightCount += tgtNodeInboundWgts.length;
    }
    this._weights.push(weights);
    this._layerWeightCount.push(layerWeightCount);
    this._totalWeightCount += layerWeightCount;
  }
};

C64GfxEv.Net.prototype.getRandomWeight = function() {
  var wgt = 1;
  wgt -= Math.random() * 2;
  return wgt;
};

C64GfxEv.Net.prototype.activate = function(input) {
  var i, tgt, src, layer, nodeVal;
  for (i = 0; i < input.length; i++) {
    this._layers[0][i] = input[i];
  }

  for (i = 1; i < this._layers.length; i++) {
    tgtlayer = this._layers[i];
    srclayer = this._layers[i-1];
    for (tgt = 0; tgt < tgtlayer.length; tgt++) {
      nodeVal = 0;
      for (src = 0; src < srclayer.length; src++) {
        nodeVal += srclayer[src] * this._weights[i-1][tgt][src];
      }
      tgtlayer[tgt] = this.sigmoidFn(nodeVal);
    }
  }
  return this.getOutputs();
};

C64GfxEv.Net.prototype.sigmoidFn = function(val) {
  var outVal = 1 / (1 + Math.pow(Math.E, 0-val));
  return outVal;
};

C64GfxEv.Net.prototype.getOutputs = function() {
  return this._layers[this._layers.length - 1];
};

C64GfxEv.Net.prototype.getWeights = function(layerIdx) {
  return this._weight[layerIdx];
};

C64GfxEv.Net.prototype.getWeightAt = function(layerIdx, tgtIdx, srcIdx) {
  return this._weights[layerIdx][tgtIdx][srcIdx];
};

C64GfxEv.Net.prototype.setWeightAt = function(layerIdx, tgtIdx, srcIdx, newVal) {
  this._weights[layerIdx][tgtIdx][srcIdx] = newVal;
};

C64GfxEv.Net.prototype.getRandomWeightCoords = function() {
  var wgtIdx = Math.floor(Math.random() * this._totalWeightCount);
  var layerIdx = 0;
  while (wgtIdx >= this._layerWeightCount[layerIdx]) {
    wgtIdx -= this._layerWeightCount[layerIdx];
    layerIdx++;
  }
  var tgtIdx = 0;
  while (wgtIdx >= this._weights[layerIdx][tgtIdx].length) {
    wgtIdx -= this._weights[layerIdx][tgtIdx].length;
    tgtIdx++;
  }

  return [layerIdx, tgtIdx, wgtIdx];
};

C64GfxEv.Net.prototype.clone = function() {
  var props = {};
  var net = new C64GfxEv.Net(props);
  var me = this;
  net._fillWeights(function(layer, target, source){
    return me._weights[layer][target][source];
  }.bind(net));
  return net;
};
