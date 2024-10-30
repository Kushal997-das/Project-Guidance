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
exports.DocMemberSelector = void 0;
var DocNode_1 = require("./DocNode");
var StringChecks_1 = require("../parser/StringChecks");
var DocExcerpt_1 = require("./DocExcerpt");
/**
 */
var DocMemberSelector = /** @class */ (function (_super) {
    __extends(DocMemberSelector, _super);
    /**
     * Don't call this directly.  Instead use {@link TSDocParser}
     * @internal
     */
    function DocMemberSelector(parameters) {
        var _this = _super.call(this, parameters) || this;
        if (DocNode_1.DocNode.isParsedParameters(parameters)) {
            _this._selectorExcerpt = new DocExcerpt_1.DocExcerpt({
                configuration: _this.configuration,
                excerptKind: "MemberSelector" /* MemberSelector */,
                content: parameters.selectorExcerpt
            });
            _this._selector = parameters.selectorExcerpt.toString();
        }
        else {
            _this._selector = parameters.selector;
        }
        _this._selectorKind = "error" /* Error */;
        _this._errorMessage = undefined;
        // The logic below will always either (1) assign selectorKind or (2) else assign an errorMessage
        if (_this._selector.length === 0) {
            _this._errorMessage = 'The selector cannot be an empty string';
        }
        else if (DocMemberSelector._likeIndexSelectorRegExp.test(_this._selector)) {
            // It looks like an index selector
            if (DocMemberSelector._indexSelectorRegExp.test(_this._selector)) {
                _this._selectorKind = "index" /* Index */;
            }
            else {
                _this._errorMessage = 'If the selector begins with a number, it must be a positive integer value';
            }
        }
        else if (DocMemberSelector._likeLabelSelectorRegExp.test(_this._selector)) {
            // It looks like a label selector
            if (DocMemberSelector._labelSelectorRegExp.test(_this._selector)) {
                _this._selectorKind = "label" /* Label */;
            }
            else {
                _this._errorMessage =
                    'A label selector must be comprised of upper case letters, numbers,' +
                        ' and underscores and must not start with a number';
            }
        }
        else {
            if (StringChecks_1.StringChecks.isSystemSelector(_this._selector)) {
                _this._selectorKind = "system" /* System */;
            }
            else if (DocMemberSelector._likeSystemSelectorRegExp.test(_this._selector)) {
                // It looks like a system selector, but is not
                _this._errorMessage =
                    "The selector " + JSON.stringify(_this._selector) +
                        " is not a recognized TSDoc system selector name";
            }
            else {
                // It doesn't look like anything we recognize
                _this._errorMessage = 'Invalid syntax for selector';
            }
        }
        return _this;
    }
    Object.defineProperty(DocMemberSelector.prototype, "kind", {
        /** @override */
        get: function () {
            return "MemberSelector" /* MemberSelector */;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocMemberSelector.prototype, "selector", {
        /**
         * The text representation of the selector.
         *
         * @remarks
         * For system selectors, it will be a predefined lower case name.
         * For label selectors, it will be an upper case name defined using the `{@label}` tag.
         * For index selectors, it will be a positive integer.
         */
        get: function () {
            return this._selector;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocMemberSelector.prototype, "selectorKind", {
        /**
         * Indicates the kind of selector.
         */
        get: function () {
            return this._selectorKind;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DocMemberSelector.prototype, "errorMessage", {
        /**
         * If the `selectorKind` is `SelectorKind.Error`, this string will be defined and provide
         * more detail about why the string was not valid.
         */
        get: function () {
            return this._errorMessage;
        },
        enumerable: false,
        configurable: true
    });
    /** @override */
    DocMemberSelector.prototype.onGetChildNodes = function () {
        return [this._selectorExcerpt];
    };
    DocMemberSelector._likeIndexSelectorRegExp = /^[0-9]/;
    DocMemberSelector._indexSelectorRegExp = /^[1-9][0-9]*$/;
    DocMemberSelector._likeLabelSelectorRegExp = /^[A-Z_]/u;
    DocMemberSelector._labelSelectorRegExp = /^[A-Z_][A-Z0-9_]+$/;
    DocMemberSelector._likeSystemSelectorRegExp = /^[a-z]+$/u;
    return DocMemberSelector;
}(DocNode_1.DocNode));
exports.DocMemberSelector = DocMemberSelector;
//# sourceMappingURL=DocMemberSelector.js.map