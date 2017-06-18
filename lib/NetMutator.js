var C64GfxEv = C64GfxEv || {};

C64GfxEv.NetMutator = function(props) {
  props = props || {};
  this._netConfig = props.netConfig || {};
  this._netConfig.fillRandomWeights = true;
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
  var mutationType = Math.floor(Math.random() * this._mutationRates.length);
  var mutationCount = 1;
  switch(mutationType) {
    case 0:
      break;
    case 1:
      mutationCount = Math.floor(Math.random() * 3) + 2;
      break;
    case 2:
      mutationCount = Math.floor(Math.random() * 6) + 5;
      break;
    case 3:
      return new C64GfxEv.Net(this._netConfig);
  }
  this._applyMutations(net, mutationCount);
  return net;
};

C64GfxEv.NetMutator.prototype._applyMutations = function(net, mutationCount) {
  for (var i = 0; i < mutationCount; i++) {
    this._applyMutation(net);
  }
};

C64GfxEv.NetMutator.prototype._applyMutation = function(net) {
  // TODO pick random weight on network
  // generate random number between 0-mutationMax and mutationMax
  // add mutation to weight
};


C64GfxEv.NetMutator.prototype._validateConfig = function() {
  if (this._mutationRates.length !== 4) {
    throw new Error("Mutation Rates array must be length 4");
  }
  var sum = this._mutationRates.reduce(function(acc, val) {return acc + val;});
  if (sum !== 1) {
    throw new Error("Mutation Rates array values must sum up to 1.");
  }

};
