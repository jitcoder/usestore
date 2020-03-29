"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const lodash_1 = __importDefault(require("lodash"));
const eventtarget_1 = require("eventtarget");
class Store extends eventtarget_1.EventTarget {
    constructor() {
        super();
        this.store = {};
        if (window.__INITIAL_STATE__) {
            this.store = typeof window.__INITIAL_STATE__ === 'string' ? JSON.parse(window.__INITIAL_STATE__) : window.__INITIAL_STATE__;
        }
    }
    set(key, value) {
        lodash_1.default.set(this.store, key, value);
        const event = new CustomEvent(key, {
            detail: value
        });
        this.dispatchEvent(event);
    }
    get(key, defaultValue = {}) {
        return lodash_1.default.get(this.store, key, defaultValue);
    }
}
const store = new Store();
exports.useStore = (key, initialState = {}) => {
    if (store.get(key, null) === null) {
        store.set(key, initialState);
    }
    const stateSetter = react_1.useState()[1];
    react_1.useEffect(() => {
        const setStateCallBack = (e) => {
            stateSetter(e.detail);
        };
        store.addEventListener(key, setStateCallBack);
        return () => store.removeEventListener(key, setStateCallBack);
    }, [key, stateSetter]);
    return [store.get(key), store.set.bind(store, key)];
};
if (window) {
    window.__STATE__ = store.store;
}
exports.default = store;
