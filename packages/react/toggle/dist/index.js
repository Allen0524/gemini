var $kLydb$react = require("react");

function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $7d30e3d88c861f40$exports = {};

$parcel$export($7d30e3d88c861f40$exports, "Toggle", () => $7d30e3d88c861f40$export$bea8ebba691c5813);

function $7d30e3d88c861f40$export$bea8ebba691c5813() {
    return /*#__PURE__*/ (0, ($parcel$interopDefault($kLydb$react))).createElement("div", null, "Toggle");
}


$parcel$exportWildcard(module.exports, $7d30e3d88c861f40$exports);


//# sourceMappingURL=index.js.map
