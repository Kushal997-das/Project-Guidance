"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocNode = void 0;
/**
 * The base class for the parser's Abstract Syntax Tree nodes.
 */
var DocNode = /** @class */ (function () {
    function DocNode(parameters) {
        this.configuration = parameters.configuration;
    }
    /**
     * Returns the list of child nodes for this node.  This is useful for visitors that want
     * to scan the tree looking for nodes of a specific type, without having to process
     * intermediary nodes.
     */
    DocNode.prototype.getChildNodes = function () {
        // Do this sanity check here, since the constructor cannot access abstract members
        this.configuration.docNodeManager.throwIfNotRegisteredKind(this.kind);
        return this.onGetChildNodes().filter(function (x) { return x !== undefined; });
    };
    /**
     * Overridden by child classes to implement {@link DocNode.getChildNodes}.
     * @virtual
     */
    DocNode.prototype.onGetChildNodes = function () {
        return [];
    };
    /**
     * A type guard that returns true if the input uses the `IDocNodeParsedParameters` (parser scenario).
     *
     * @remarks
     * There are two scenarios for constructing `DocNode` objects.  The "builder scenario" constructs the object based on
     * literal strings, does NOT create DocExcerpt child nodes, and generally uses the {@link IDocNodeParameters}
     * hierarchy for its constructor parameters.  The "parser scenario" constructs the object by parsing a TypeScript
     * source file, does create DocExcerpt child nodes, and generally uses the {@link IDocNodeParsedParameters} hierarchy.
     */
    DocNode.isParsedParameters = function (parameters) {
        return parameters.parsed === true;
    };
    return DocNode;
}());
exports.DocNode = DocNode;
//# sourceMappingURL=DocNode.js.map