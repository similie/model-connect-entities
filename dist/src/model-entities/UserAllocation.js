"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAllocation = void 0;
const model_structures_1 = require("../model-structures");
class UserAllocation extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'userallocations';
    }
}
exports.UserAllocation = UserAllocation;