"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemVariance = void 0;
const model_structures_1 = require("../model-structures");
class ItemVariance extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'itemvariances';
    }
}
exports.ItemVariance = ItemVariance;
