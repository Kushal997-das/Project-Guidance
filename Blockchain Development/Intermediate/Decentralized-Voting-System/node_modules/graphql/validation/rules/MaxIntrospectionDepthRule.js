"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaxIntrospectionDepthRule = MaxIntrospectionDepthRule;

var _GraphQLError = require("../../error/GraphQLError.js");

var _kinds = require("../../language/kinds.js");

var MAX_LISTS_DEPTH = 3;

function MaxIntrospectionDepthRule(context) {
  /**
   * Counts the depth of list fields in "__Type" recursively and
   * returns `true` if the limit has been reached.
   */
  function checkDepth(node) {
    var visitedFragments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object.create(null);
    var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    if (node.kind === _kinds.Kind.FRAGMENT_SPREAD) {
      var _fragmentName = node.name.value;

      if (visitedFragments[_fragmentName] === true) {
        // Fragment cycles are handled by `NoFragmentCyclesRule`.
        return false;
      }

      var fragment = context.getFragment(_fragmentName);

      if (!fragment) {
        // Missing fragments checks are handled by `KnownFragmentNamesRule`.
        return false;
      } // Rather than following an immutable programming pattern which has
      // significant memory and garbage collection overhead, we've opted to
      // take a mutable approach for efficiency's sake. Importantly visiting a
      // fragment twice is fine, so long as you don't do one visit inside the
      // other.


      try {
        visitedFragments[_fragmentName] = true;
        return checkDepth(fragment, visitedFragments, depth);
      } finally {
        visitedFragments[_fragmentName] = null;
      }
    }

    if (node.kind === _kinds.Kind.FIELD && ( // check all introspection lists
    node.name.value === 'fields' || node.name.value === 'interfaces' || node.name.value === 'possibleTypes' || node.name.value === 'inputFields')) {
      // $FlowFixMe[reassign-const] why are argument parameters treated as const in flow?
      depth++; // eslint-disable-line no-param-reassign

      if (depth >= MAX_LISTS_DEPTH) {
        return true;
      }
    } // handles fields and inline fragments


    if ('selectionSet' in node && node.selectionSet) {
      for (var _i2 = 0, _node$selectionSet$se2 = node.selectionSet.selections; _i2 < _node$selectionSet$se2.length; _i2++) {
        var child = _node$selectionSet$se2[_i2];

        if (checkDepth(child, visitedFragments, depth)) {
          return true;
        }
      }
    }

    return false;
  }

  return {
    Field: function Field(node) {
      if (node.name.value === '__schema' || node.name.value === '__type') {
        if (checkDepth(node)) {
          context.reportError(new _GraphQLError.GraphQLError('Maximum introspection depth exceeded', [node]));
          return false;
        }
      }
    }
  };
}
