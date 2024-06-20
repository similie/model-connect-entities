"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkorderTemplateTask = void 0;
const model_structures_1 = require("../model-structures");
class WorkorderTemplateTask extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'workordertemplatetasks';
    }
}
exports.WorkorderTemplateTask = WorkorderTemplateTask;
