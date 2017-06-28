var C64GfxEv = C64GfxEv || {};

/**
*/
C64GfxEv.Factory = function(props) {
  props = props || {};
  this._props = props;
  this._pixElementCreatorType = props.pixElementCreatorType;
  this._layerConfig = props.layerConfig || {input: 3, output: {size:16,activationType:"sigmoid"},};
  this._netMutatorProps = props.netMutatorProps;
  this._pixElementCreatorProps = props.pixElementCreatorProps;
  this._populationDisplayerProps = props.populationDisplayerProps;
};

C64GfxEv.Factory.prototype.getProps = function() {return this._props;};

C64GfxEv.Factory.prototype.createRandomNet = function() {
  return new C64GfxEv.Net({layerConfig:this._layerConfig, fillRandomWeights:true});
};

C64GfxEv.Factory.prototype.createNet = function() {
  return new C64GfxEv.Net({layerConfig:this._layerConfig});
};

C64GfxEv.Factory.prototype.getPopulationDisplayer = function() {
  return new C64GfxEv.PopulationDisplayer(this._populationDisplayerProps);
};

C64GfxEv.Factory.prototype.getNetMutator = function() {
  return new C64GfxEv.NetMutator(this._netMutatorProps);
};

C64GfxEv.Factory.prototype.getPixElementCreator = function() {
  var pec = null;
  switch(this._pixElementCreatorType) {
    case "C64ColorPixElementCreator":
      pec = new C64GfxEv.C64ColorPixElementCreator(this._pixElementCreatorProps);
      break;
    case "GreyscalePixElementCreator":
      pec = new C64GfxEv.GreyscalePixElementCreator(this._pixElementCreatorProps);
      break;
    case "RgbPixElementCreator":
      pec = new C64GfxEv.RgbPixElementCreator(this._pixElementCreatorProps);
      break;
    case "C64MonochromePixElementCreator":
      pec = new C64GfxEv.C64MonochromePixElementCreator(this._pixElementCreatorProps);
      break;
    case "C64NearestNeighborColorPixElementCreator":
      pec = new C64GfxEv.C64NearestNeighborColorPixElementCreator(this._pixElementCreatorProps);
      break;
    default:
      throw new Error("Unknown PixElementCreator type: " + this._pixElementCreatorType);
  }

  return pec;
};
