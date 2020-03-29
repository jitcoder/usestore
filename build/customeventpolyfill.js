"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomEvent {
    constructor(key, options) {
        this.type = 'Custom';
        this.type = key;
        this.detail = options.detail;
    }
}
exports.default = CustomEvent;
