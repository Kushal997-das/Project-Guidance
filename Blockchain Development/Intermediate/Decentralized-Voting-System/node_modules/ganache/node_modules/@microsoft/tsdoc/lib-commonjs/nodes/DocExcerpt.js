"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocExcerpt = void 0;
var DocNode_1 = require("./DocNode");
var Token_1 = require("../parser/Token");
/**
 * Represents a parsed token sequence.
 *
 * @remarks
 * When a `DocNode` is created by parsing a doc comment, it will have `DocExcerpt` child nodes corresponding to
 * the parsed syntax elements such as names, keywords, punctuation, and spaces.  These excerpts indicate the original
 * coordinates of the syntax element, and thus can be used for syntax highlighting and precise error reporting.
 * They could also be used to rewrite specific words in a source file (e.g. renaming a parameter) without disturbing
 * any other characters in the file.
 *
 * Every parsed character will correspond to at most one DocExcerpt object.  In other words, excerpts never overlap.
 * A given excerpt can span multiple comment lines, and it may contain gaps, for example to skip the `*` character
 * that starts a new TSDoc comment line.
 */
var DocExcerpt = /** @class */ (function (_super) {
    __extends(DocExcerpt, _super);
    /**
     * Don't call this directly.  Instead use {@link TSDocParser}
     * @internal
     */
    function DocExcerpt(parameters) {
        var _this = _super.call(this, parameters) || this;
        if (parameters.excerptKind === "Spacing" /* Spacing */) {
            for (var _i = 0, _a = parameters.content.tokens; _i < _a.length; _i++) {
                var token = _a[_i];
                switch (token.kind) {
                    case Token_1.TokenKind.Spacing:
                    case Token_1.TokenKind.Newline:
                    case Token_1.TokenKind.EndOfInput:
                        break;
                    default:
                        throw new Error("The excerptKind=Spacing but the range contains a non-whitespace token");
                }
            }
        }
        _this._excerptKind = parameters.excerptKind;
        _this._content = parameters.content;
        return _this;
    }
    Object.defineProperty(DocExcerpt.prototype, "kind", {
        /** @override */
        get: function () {
            return "Excerpt" /* Excerpt */;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocExcerpt.prototype, "excerptKind", {
        /**
         * Indicates the kind of DocExcerpt.
         */
        get: function () {
            return this._excerptKind;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocExcerpt.prototype, "content", {
        /**
         * The input token sequence corresponding to this excerpt.
         * @remarks
         * Note that a token sequence can span multiple input lines and may contain gaps, for example to skip the `*`
         * character that starts a new TSDoc comment line.
         */
        get: function () {
            return this._content;
        },
        enumerable: false,
        configurable: true
    });
    return DocExcerpt;
}(DocNode_1.DocNode));
exports.DocExcerpt = DocExcerpt;
//# sourceMappingURL=DocExcerpt.js.map