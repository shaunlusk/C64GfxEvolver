var C64GfxEv = C64GfxEv || {};

/**
* @required populationDisplayer The object that will display the population
* @required pixElementCreator The object that creates pix elements from nets
* @required factory Object factory
* @required netMutator The object that will mutate nets
*/
C64GfxEv.SaveImageScreenManager = function(props) {
  this.screenContext = props.screenContext;
  this._gfxLayer = props.gfxLayer;
};

C64GfxEv.SaveImageScreenManager.prototype.display = function(element) {
  element.setX(0);
  element.setY(0);
  this._gfxLayer.addElement(element);
};

C64GfxEv.SaveImageScreenManager.prototype.clear = function() {
  this._gfxLayer.removeAllElements();
};
