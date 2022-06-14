"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connect = void 0;
class Connect {
    constructor(Connector) {
        this.connection = Connector;
    }
    static startInstance(Connector) {
        if (!Connect.instance) {
            Connect.instance = new Connect(Connector);
        }
        return Connect.instance;
    }
    static hasConnection() {
        return !!Connect.instance;
    }
    static getInstance() {
        if (!Connect.instance) {
            throw new Error("A connection has not been initialized");
        }
        return Connect.instance;
    }
    get connector() {
        return this.connection;
    }
}
exports.Connect = Connect;
Connect.SET_GLOBAL = true;
Connect.SET_LOCAL = false;
