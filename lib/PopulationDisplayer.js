var C64GfxEv = C64GfxEv || {};

C64GfxEv.PopulationDisplayer = function(props) {
  props = props || {};
  this._layer = props.layer;
  this._startX = props.startX || 8;
  this._startY = props.startY || 24;
  this._paddingX = props.paddingX || 8;
  this._paddingY = props.paddingY || 8;
  this._screenWidth = props.screenWidth;
};

C64GfxEv.PopulationDisplayer.prototype.display = function(pixElements) {
  var x = this._startX;
  var y = this._startY;
  var len = pixElements.length;

  // add each to layer
  for (var i = 0; i < len; i++) {
    var element = pixElements[i];
    element.setX(x);
    element.setY(y);
    this._layer.addElement(element);

    x += element.getWidth() + this._paddingX;
    if (i < len - 1 && x + pixElements[i + 1].getWidth() + this._paddingX > this._screenWidth) {
      y += element.getHeight() + this._paddingY;
      x = this._startX;
    }
  }

};

C64GfxEv.PopulationDisplayer.prototype.clear = function() {

};
