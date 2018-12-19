"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasDecorators = hasDecorators;

function hasDecorators(path) {
  return !!(path.node.decorators && path.node.decorators.length);
}