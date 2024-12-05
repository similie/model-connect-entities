"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveConnection = exports.LiveConnectConfig = void 0;
const global_connect_1 = require("../global-connect");
const utils_1 = require("../utils");
class LiveConnectConfig {
    constructor() {
        this._name = '';
    }
    get modelname() {
        return this._name;
    }
    set modelname(modelname) {
        this._name = modelname;
    }
}
exports.LiveConnectConfig = LiveConnectConfig;
/**
 * @class
 * @name LiveConnection
 *
 * @description The purpose of live connect is so that a single class
 * can manage the start instance. Also, the child classes can safely
 * choose to NOT implement certain functions such as init or teardown
 * if they are not required. Additionally, for future functionality
 * we can use this class to implement parent logic that all the child classes
 * can extend without changing the structure of the child class. Finally,
 * to create a new connector, you simply copy this class and populate the
 * public functions with the desired logic
 */
class LiveConnection {
    constructor(global) {
        if (global === global_connect_1.GlobalConnection.SET_GLOBAL) {
            global_connect_1.GlobalConnection.startInstance(this);
        }
    }
    getId(query) {
        return (0, utils_1.getId)(query);
    }
    get modelConfig() {
        return new LiveConnectConfig();
    }
}
exports.LiveConnection = LiveConnection;
