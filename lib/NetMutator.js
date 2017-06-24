var C64GfxEv = C64GfxEv || {};

C64GfxEv.NetMutator = function(props) {
  props = props || {};
  this._netFactory = props.netFactory;
  this._mutationMax = props.mutationMax || 1;
  /* Mutation Rates
  * Array[4]
  * [0] - % chance to generate a single mutation
  * [1] - % chance to generate 2-4 mutations
  * [2] - % chance to generate 5-10 mutations
  * [3] - % chance to generate a new chromosome
  */
  this._mutationRates = props.mutationRates || [0.4, 0.2, 0.2, 0.2];
  this._validateConfig();
};


C64GfxEv.NetMutator.prototype.mutate = function(net) {
  var mutationType = this._getMutationType();
  var mutationCount = 1;
  switch(mutationType) {
    case 0:
      mutationCount = Math.floor(Math.random() * 5) + 4;
      this._applyRandomMutations(net, mutationCount);
      break;
    case 1:
      this._mutateRandomWeightsLayer(net);
      break;
    case 2:
      this._mutateAllWeights(net);
      break;
    default:
      break;
  }

  return net;
};

C64GfxEv.NetMutator.prototype._getMutationType = function() {
  var acc = this._mutationRates[0];
  var idx = 0;
  var roll = Math.random();
  while (roll > acc) {
    acc += this._mutationRates[++idx];
  }
  return idx;
};

C64GfxEv.NetMutator.prototype._applyRandomMutations = function(net, mutationCount) {
  for (var i = 0; i < mutationCount; i++) {
    this._applyRandomMutationToRandomWeight(net);
  }
};

C64GfxEv.NetMutator.prototype._applyRandomMutationToRandomWeight = function(net) {
  // pick random weight on network
  var weightCoords = net.getRandomWeightCoords();
  this._applyRandomMutation(net,weightCoords);
};

C64GfxEv.NetMutator.prototype._applyRandomMutation = function(net, weightCoords) {
  // generate random number between 0-mutationMax and mutationMax
  var mutation = this._mutationMax - (Math.random() * 2 * this._mutationMax);
  // add mutation to weight
  net.setWeightAt( weightCoords[0],weightCoords[1], weightCoords[2],  mutation + net.getWeightAt(weightCoords[0],weightCoords[1], weightCoords[2]) );
};

C64GfxEv.NetMutator.prototype._mutateRandomWeightsLayer = function(net) {
  var layerIdx = this._pickRandomWeightsLayer(net);
  this._mutateLayer(net, layerIdx);
};

C64GfxEv.NetMutator.prototype._pickRandomWeightsLayer = function(net) {
  var idx = Math.floor(Math.random() * net.getWeights().length);
  return idx;
};

C64GfxEv.NetMutator.prototype._mutateAllWeights = function(net) {
  var layers = net.getWeights();
  for (var i = 0; i < layers.length; i++) {
    this._mutateLayer(net, i);
  }
};

C64GfxEv.NetMutator.prototype._mutateLayer = function(net, layerIdx) {
  var layer = net.getWeights()[layerIdx];
  for (var tgtIdx = 0; tgtIdx < layer.length; tgtIdx++) {
    for (var srcIdx = 0; srcIdx < layer[tgtIdx].length; srcIdx++) {
      var coords = [layerIdx, tgtIdx, srcIdx];
      this._applyRandomMutation(net, coords);
    }
  }
};

C64GfxEv.NetMutator.prototype._validateConfig = function() {
  if (this._mutationRates.length !== 3) {
    throw new Error("Mutation Rates array must be length 3");
  }
  var sum = this._mutationRates.reduce(function(acc, val) {return acc + val;});
  if (sum !== 1) {
    throw new Error("Mutation Rates array values must sum up to 1.");
  }

};
