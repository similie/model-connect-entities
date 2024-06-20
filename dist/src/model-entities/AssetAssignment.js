"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetAssignment = void 0;
const model_structures_1 = require("../model-structures");
class AssetAssignment extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'assetassignments';
    }
}
exports.AssetAssignment = AssetAssignment;
