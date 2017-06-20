var C64GfxEv = C64GfxEv || {};

/**
* @required populationDisplayer The object that will display the population
* @required pixElementsCreator The object that creates pix elements from nets
* @required netFactory The object that will construct nets
* @required netMutator The object that will mutate nets
*/
C64GfxEv.Evolver = function(props) {
  props = props || {};
  this._currentSeed = props.currentSeed || null;
  this._population = null;
  this._pixElements = [];
  this._populationDisplayer = props.populationDisplayer;
  this._netMutator = props.netMutator;
  this._pixElementsCreator = props.pixElementsCreator;
  this._netFactory = props.netFactory;
  this._populationSize = props.populationSize || 16;
  this._validateConfig();
};

C64GfxEv.Evolver.prototype.createPopulation = function(seed) {
  seed = seed || this.createRandomNet();
  this._currentSeed = seed;
  this._population = [];
  for (var g = 0; g < this._populationSize; g++) {
    this.addNetToPopulation( this.createMutatedNet(seed) );
  }
  this.displayPopulation();
};

C64GfxEv.Evolver.prototype.createRandomNet = function() {
  return this._netFactory.createRandomNet();
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
  this._population.forEach(function(net) {
    this._pixElements.push(this.createPixElementsFromNet(net));
  }.bind(this));
};

C64GfxEv.Evolver.prototype.createPixElementsFromNet = function(net) {
  return this._pixElementsCreator.create(net);
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
