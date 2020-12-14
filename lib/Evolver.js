var C64GfxEv = C64GfxEv || {};

/**
* @required populationDisplayer The object that will display the population
* @required pixElementCreator The object that creates pix elements from nets
* @required factory Object factory
* @required netMutator The object that will mutate nets
*/
C64GfxEv.Evolver = function(props) {
  props = props || {};
  this._screenContext = props.screenContext;
  this._currentSeed = props.currentSeed || null;
  this._population = null;
  this._popIdx = 0;
  this._pixElements = [];
  this._populationDisplayer = props.populationDisplayer;
  this._netMutator = props.netMutator;
  this._pixElementCreator = props.pixElementCreator;
  this._factory = props.factory;
  this._populationSize = props.populationSize || 16;
  this._mode = "evolve";
  this._saveImageScreenManager = props.saveImageScreenManager;
};

C64GfxEv.Evolver.prototype.switchToViewMode = function() {this._mode = "view";};
C64GfxEv.Evolver.prototype.switchToEvolveMode = function() {
  this._mode = "evolve";
  this._restorePopulationDisplay();
};
C64GfxEv.Evolver.prototype.getMode = function() {return this._mode;};

C64GfxEv.Evolver.prototype.createPopulation = function(seed) {
  var i;
  this._population = [];
  if (seed) {
    this._currentSeed = seed;
    this.addNetToPopulation( this._currentSeed );
    for (i = 1; i < this._populationSize; i++) {
      this.addNetToPopulation( this.createMutatedNet(seed) );
    }
  } else {
    for (i = 0; i < this._populationSize; i++) {
      this.addNetToPopulation( this._factory.createRandomNet() );
    }
  }

  this.displayPopulation();
};

C64GfxEv.Evolver.prototype.createRandomNet = function() {
  return this._factory.createRandomNet();
};

C64GfxEv.Evolver.prototype.addNetToPopulation = function(net) {
  this._population.push(net);
  net.setIndex(this._popIdx);
  this._popIdx++;
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
  return this._pixElementCreator.create(net);
};

C64GfxEv.Evolver.prototype.cleanupPopulation = function() {
  this._population = [];
  this._popIdx = 0;
  this._populationDisplayer.clear();
  this._pixElements = [];
};

C64GfxEv.Evolver.prototype.handleElementClick = function(event) {
  var net = this._population[event.data.element.getIndex()];
  if (this._mode === "evolve") {
    this._produceNextGeneration(net);
  } else {  // mode === view
    this._enlargeSelected(net);
  }
};

C64GfxEv.Evolver.prototype._enlargeSelected = function(net) {
  this._screenContext.on(SL.EventType.NEXT_FRAME_BEGIN, function() {
    // clear the layer
    this._populationDisplayer.clear();
    this._pixElements = [];

    // create larger version of pix element
    // This is dumb, and I apologize to myself.
    this._pixElementCreator.setElementWidth(128);
    this._pixElementCreator.setElementHeight(128);
    var element = this.createPixElementsFromNet(net);
    var tempScreenContext = this._pixElementCreator.getScreenContext();
    this._pixElementCreator.setScreenContext(this._saveImageScreenManager.screenContext);
    var saveElement = this.createPixElementsFromNet(net);
    this._pixElementCreator.setScreenContext(tempScreenContext);
    this._pixElementCreator.setElementWidth(32);
    this._pixElementCreator.setElementHeight(32);

    // display
    this._populationDisplayer.display([element]);
    this._saveImageScreenManager.display(saveElement);
  }.bind(this));
};

C64GfxEv.Evolver.prototype._restorePopulationDisplay = function() {
  this._populationDisplayer.clear();
  this._saveImageScreenManager.clear();
  this._pixElements = [];
  this.displayPopulation();
};

C64GfxEv.Evolver.prototype._produceNextGeneration = function(seed) {
  this._currentSeed = seed;
  this._screenContext.on(SL.EventType.NEXT_FRAME_BEGIN, function() {
    this.cleanupPopulation();
    this.createPopulation(this._currentSeed);
  }.bind(this));
};
