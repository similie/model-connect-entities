"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollConfig = void 0;
const model_structures_1 = require("../model-structures");
class PayrollConfig extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'payrollconfigs';
    }
}
exports.PayrollConfig = PayrollConfig;