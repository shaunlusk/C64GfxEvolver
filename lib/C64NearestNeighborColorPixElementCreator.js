var C64GfxEv = C64GfxEv || {};

/**
* @class Creates a Pix Element using a NeuralNet.
* Assumes 3 outputs (RGB)
* @required screenContext - the C64Screen
* @required layer - the layer to assign the pix element to.
*/
C64GfxEv.C64NearestNeighborColorPixElementCreator = function(props) {
  props = props || {};
  C64GfxEv.AbstractPixElementCreator.call(this, props);
};

C64GfxEv.C64NearestNeighborColorPixElementCreator.prototype = new C64GfxEv.AbstractPixElementCreator();
C64GfxEv.C64NearestNeighborColorPixElementCreator.prototype.constructor = C64GfxEv.C64NearestNeighborColorPixElementCreator;

/**
* @override
*/
C64GfxEv.C64NearestNeighborColorPixElementCreator.prototype.outputsToColor = function(outputs) {
  var values = outputs.map(function(value) {
    value = value < 0 ? 0 : value;
    value = value > 1 ? 1 : value;
    value *= 255;
    return value;
  });

  return this._findNearestC64Color(values);
};

C64GfxEv.C64NearestNeighborColorPixElementCreator.prototype._findNearestC64Color = function(targetRgbValuesArray) {
  var bestColor = C64Style.Color.BLACK;
  var bestDist = Math.sqrt(Math.pow(255,2) * 3) + 1;
  var colorKeys = Object.keys(C64GfxEv.C64NearestNeighborColorPixElementCreator.Color);
  colorKeys.forEach(function(colorKey) {
    var rgbValuesArray = C64GfxEv.C64NearestNeighborColorPixElementCreator.Color[colorKey];
    var dist = 0;
    for (var i = 0; i < targetRgbValuesArray.length; i++) {
      dist += Math.pow(targetRgbValuesArray[i] - rgbValuesArray[i], 2);
    }
    dist = Math.sqrt(dist);
    if (dist < bestDist) {
      bestDist = dist;
      bestColor = C64Style.Color[colorKey];
    }
  });

  return bestColor;
};

C64GfxEv.C64NearestNeighborColorPixElementCreator.Color = {};

C64GfxEv.C64NearestNeighborColorPixElementCreator.initializeColors = function() {
  var colorKeys = Object.keys(C64Style.Color);
  colorKeys.forEach(function(colorKey) {
    if (SL.Utils.isFunction(C64Style.Color[colorKey])) return;
    var colorValueString = C64Style.Color[colorKey].replace("#", "");
    C64GfxEv.C64NearestNeighborColorPixElementCreator.Color[colorKey] = [
      parseInt("0x" + colorValueString.substr(0,2)),
      parseInt("0x" + colorValueString.substr(2,2)),
      parseInt("0x" + colorValueString.substr(4,2))
    ];
  });
};

C64GfxEv.C64NearestNeighborColorPixElementCreator.initializeColors();
