"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledEvents = void 0;
const model_structures_1 = require("../model-structures");
class ScheduledEvents extends model_structures_1.Model {
    constructor(connector) {
        super(connector);
        this.modelname = 'scheduledevents';
    }
}
exports.ScheduledEvents = ScheduledEvents;
