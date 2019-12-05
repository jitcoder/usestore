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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var lodash_1 = __importDefault(require("lodash"));
var Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    function Store() {
        var _this = _super.call(this) || this;
        _this.store = {};
        if (window.__INITIAL_STATE__) {
            _this.store = typeof window.__INITIAL_STATE__ === 'string' ? JSON.parse(window.__INITIAL_STATE__) : window.__INITIAL_STATE__;
        }
        return _this;
    }
    Store.prototype.set = function (key, value) {
        lodash_1.default.set(this.store, key, value);
        var event = new CustomEvent(key, {
            detail: value
        });
        this.dispatchEvent(event);
    };
    Store.prototype.get = function (key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = {}; }
        return lodash_1.default.get(this.store, key, defaultValue);
    };
    return Store;
}(EventTarget));
var store = new Store();
exports.useStore = function (key, initialState) {
    if (initialState === void 0) { initialState = {}; }
    if (store.get(key, null) === null) {
        store.set(key, initialState);
    }
    var stateSetter = react_1.useState()[1];
    react_1.useEffect(function () {
        var setStateCallBack = function (e) {
            stateSetter(e.detail);
        };
        store.addEventListener(key, setStateCallBack);
        return function () { return store.removeEventListener(key, setStateCallBack); };
    }, [key, stateSetter]);
    return [store.get(key), store.set.bind(store, key)];
};
if (window) {
    window.__STATE__ = store.store;
}
exports.default = store;
