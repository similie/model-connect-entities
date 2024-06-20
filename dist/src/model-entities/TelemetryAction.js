"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryAction = void 0;
const model_structures_1 = require("../model-structures");
class TelemetryAction extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'telemetryactions';
    }
}
exports.TelemetryAction = TelemetryAction;
