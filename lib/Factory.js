var C64GfxEv = C64GfxEv || {};

/**
*/
C64GfxEv.Factory = function(props) {
  props = props || {};
  this._props = props;
};

C64GfxEv.Factory.prototype.getProps = function() {return this._props;};

C64GfxEv.Factory.prototype.getPixElementCreator = function(pixElementCreatorProps) {
  var pec = null;
  switch(this._props.pixElementCreatorType) {
    case "C64ColorPixElementCreator":
      pec = new C64GfxEv.C64ColorPixElementCreator(pixElementCreatorProps);
      break;
    case "GreyscalePixElementCreator":
      pec = new C64GfxEv.GreyscalePixElementCreator(pixElementCreatorProps);
      break;
    default:
      throw new Error("Unknown PixElementCreator type: " + this._props.pixElementCreatorType);
  }

  return pec;
};
