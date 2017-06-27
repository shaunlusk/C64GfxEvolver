var C64GfxEv = C64GfxEv || {};

/**
*/
C64GfxEv.Factory = function(props) {
  props = props || {};
  this._props = props;
  this._layerConfig = props.layerConfig || {input: 3, output: {size:16,activationType:"sigmoid"},};
  this._netMutatorProps = props.netMutatorProps;
};

C64GfxEv.Factory.prototype.getProps = function() {return this._props;};

C64GfxEv.NetFactory.prototype.createRandomNet = function() {
  return new C64GfxEv.Net({layerConfig:this._layerConfig, fillRandomWeights:true});
};

C64GfxEv.NetFactory.prototype.createNet = function() {
  return new C64GfxEv.Net({layerConfig:this._layerConfig});
};

C64GfxEv.Factory.prototype.getPopulationDisplayer = function(populationDisplayerProps) {
  return new C64GfxEv.PopulationDisplayer(populationDisplayerProps);
};

C64GfxEv.Factory.prototype.getNetMutator = function() {
  return new C64GfxEv.NetMutator(this._netMutatorProps);
};

C64GfxEv.Factory.prototype.getPixElementCreator = function(pixElementCreatorProps) {
  var pec = null;
  switch(this._props.pixElementCreatorType) {
    case "C64ColorPixElementCreator":
      pec = new C64GfxEv.C64ColorPixElementCreator(pixElementCreatorProps);
      break;
    case "GreyscalePixElementCreator":
      pec = new C64GfxEv.GreyscalePixElementCreator(pixElementCreatorProps);
      break;
    case "RgbPixElementCreator":
      pec = new C64GfxEv.RgbPixElementCreator(pixElementCreatorProps);
      break;
    case "C64MonochromePixElementCreator":
      pec = new C64GfxEv.C64MonochromePixElementCreator(pixElementCreatorProps);
      break;
    case "C64NearestNeighborColorPixElementCreator":
      pec = new C64GfxEv.C64NearestNeighborColorPixElementCreator(pixElementCreatorProps);
      break;
    default:
      throw new Error("Unknown PixElementCreator type: " + this._props.pixElementCreatorType);
  }

  return pec;
};
