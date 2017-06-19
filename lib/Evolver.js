var C64GfxEv = C64GfxEv || {};

C64GfxEv.Evolver = function(props) {
  props = props || {};
  this._currentSeed = props.currentSeed || null;
  this._population = null;
  this._pixElements = null;
  this._imageWidth = props.imageWidth || 8;
  this._imageHeight = props.imageHeight || 8;
  this._populationDisplayer = props.populationDisplayer;
  this._netMutator = props.NetMutator || new C64GfxEv.NetMutator();
  this._populationSize = props.populationSize || 16;
  this._netConfig = props.netConfig || {};
  this._netConfig.fillRandomWeights = true;
  this._validateConfig();
};

C64GfxEv.Evolver.prototype.createPopulation = function(seed) {
  seed = seed || this.createRandomNet();
  this._currentSeed = seed;
  this._population = [];
  for (var g = 0; g < this._populationSize; g++) {
    this.addNetToPopulation( this.createMutatedNet(seed) );
  }
};

C64GfxEv.Evolver.prototype.createRandomNet = function() {
  return new C64GfxEv.Net(this._netConfig);
};

C64GfxEv.Evolver.prototype.addNetToPopulation = function(net) {
  this._population.push(net);
};

C64GfxEv.Evolver.prototype.createMutatedNet = function(seed) {
  var mutatedNet = seed.clone();
  return this.mutateNet(mutatedNet);
};

C64GfxEv.Evolver.prototype.mutateNet = function(net) {
  return this._netMutator.mutate(net);
};

C64GfxEv.Evolver.prototype.displayPopulation = function() {
  this.createPixElementsFromPopulation();
  this._populationDisplayer.display(this._pixElements);
};

C64GfxEv.Evolver.prototype.createPixElementsFromPopulation = function() {

};

C64GfxEv.Evolver.prototype.cleanupPopulation = function() {
  this._population = [];
  this._populationDisplayer.clear();
  this._pixElements = [];
};

C64GfxEv.Evolver.prototype._validateConfig = function() {


};

C64GfxEv.Evolver.prototype.handleElementClick = function(event) {

};

C64GfxEv.Evolver.prototype.createNextGeneration = function() {

};
