"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveConnection = exports.LiveConnectRegister = void 0;
const glabal_connect_1 = require("../glabal-connect");
class LiveConnectRegister {
    constructor() {
        this._name = "";
    }
    get modelname() {
        return this._name;
    }
    set modelname(modelname) {
        this._name = modelname;
    }
}
exports.LiveConnectRegister = LiveConnectRegister;
/**
 * @class
 * @name LiveConnectionConstruct
 *
 * @description The purpose of live connect is so that a single class
 * can manage the start instance. Also, the child classes can safely
 * choose to it NOT implement certain functions such as init or teardown
 * if they are not required. Additonally, for future functionality
 * we can use this class to implement parent logic that all the child classes
 * can extend without changing the structure of the child class. Finally,
 * to create a new connector, you simply copy this class and populate the
 * public functions with the desired logic
 */
class LiveConnection {
    constructor(global) {
        if (global === glabal_connect_1.GlobalConnection.SET_GLOBAL) {
            glabal_connect_1.GlobalConnection.startInstance(this);
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    registration() {
        return new LiveConnectRegister();
    }
    raw(config) {
        return null;
    }
    find(query, limiters, config) {
        return null;
    }
    findOne(query, limiters, config) {
        return null;
    }
    save(values, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return values;
        });
    }
    update(query, update, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return query;
        });
    }
    count(query, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return query;
        });
    }
    destroy(query, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return query;
        });
    }
    create(query, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return query;
        });
    }
    createMany(query, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return query;
        });
    }
    destroyAll(query, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return query;
        });
    }
    add(value, collection) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    remove(value, collection) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    saveAs(value, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return model;
        });
    }
    attr(config) {
        return null;
    }
    keys(config) {
        return new Array();
    }
    tearDown() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.LiveConnection = LiveConnection;
