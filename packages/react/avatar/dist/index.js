var $6FDFN$react = require("react");

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
var $94437fed6c1d6d8a$exports = {};

$parcel$export($94437fed6c1d6d8a$exports, "Avatar", () => $94437fed6c1d6d8a$export$e2255cf6045e8d47);

function $94437fed6c1d6d8a$export$e2255cf6045e8d47() {
    return /*#__PURE__*/ (0, ($parcel$interopDefault($6FDFN$react))).createElement("div", null, "Avatar");
}


$parcel$exportWildcard(module.exports, $94437fed6c1d6d8a$exports);


//# sourceMappingURL=index.js.map
