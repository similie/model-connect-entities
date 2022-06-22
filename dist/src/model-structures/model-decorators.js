"use strict";
/*
█▀▄▀█ █▀█ █▀▄ █▀▀ █░░   █▀▄ █▀▀ █▀▀ █▀█ █▀█ ▄▀█ ▀█▀ █▀█ █▀█ █▀
█░▀░█ █▄█ █▄▀ ██▄ █▄▄   █▄▀ ██▄ █▄▄ █▄█ █▀▄ █▀█ ░█░ █▄█ █▀▄ ▄█
*/
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
exports.QueryStreamDecorators = exports.QueryDecorators = exports.QyeryPopulantDecorators = exports.QyeryFetchDecorators = void 0;
const common_1 = require("../common");
/**
 * @class QyeryFetchDecorators<IEntity>
 * @implements IQueryFetch<IEntity>
 * @description when an initWithId is called it can only have
 * a populates param;
 */
class QyeryFetchDecorators {
    constructor(decorator) {
        this._decorator = decorator;
    }
    /**
     * @name fetch
     * @description
     * @returns IEntity - decorator fetchOne
     */
    fetch() {
        return this._decorator.fetchOne();
    }
}
exports.QyeryFetchDecorators = QyeryFetchDecorators;
/**
 * @class QyeryPopulantDecorators<IEntity>
 * @implements IQueryPopulates<IEntity>
 * @description when an find is called it can only have
 * a populates param;
 */
class QyeryPopulantDecorators {
    constructor(decorator) {
        this._decorator = decorator;
    }
    /**
     * @public
     * @name populate
     * @description - applies a populate value to the query
     * @param value - string the association to populate
     * @returns QyeryFetchDecorators<IEntity> - it should only contain a fetch function
     */
    populate(value, criteria) {
        this._decorator.populate(value, criteria);
        return new QyeryFetchDecorators(this._decorator);
    }
    /**
     * @public
     * @name populateAll
     * @description - popluations all associates
     * @returns QyeryFetchDecorators<IEntity> - it should only contain a fetch function
     */
    populateAll() {
        this._decorator.populateAll();
        return new QyeryFetchDecorators(this._decorator);
    }
    /**
     * @public
     * @name fetch
     * @description pulls a fetchOne for the initWithId function
     * @returns IEntity
     */
    fetch() {
        return this._decorator.fetchOne();
    }
}
exports.QyeryPopulantDecorators = QyeryPopulantDecorators;
/**
 * @class
 * @name QueryDecorators<IEntity>
 * @implements IQueryDecorators<IEntity>
 * @description allows for query chaining for the model find function
 */
class QueryDecorators {
    constructor(model, query) {
        this._limiter = {};
        this._query = query;
        this._model = model;
    }
    /**
     * @public
     * @name fetch
     * @description pulls a fetch for the initWithId function
     * @returns IEntity[]
     */
    fetch() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const found = (yield ((_a = this.connector) === null || _a === void 0 ? void 0 : _a.find(this._query, this._limiter, this.modelConfig)));
            return this.modelInstance.applyMany(found);
        });
    }
    /**
     * @public
     * @name fetchOne
     * @description pulls a fetchOne for the initWithId function
     * @returns IEntity
     */
    fetchOne() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const found = (yield ((_a = this.connector) === null || _a === void 0 ? void 0 : _a.findOne(this._query, this._limiter, this.modelConfig)));
            return this.modelInstance.applyOne(found);
        });
    }
    /**
     * @public
     * @name populate
     * @description - applies a populate value to the query
     * @param value - string the association to populate
     * @returns QyeryFetchDecorators<IEntity>
     */
    populate(value, criteria) {
        const populate = this._limiter.populate || {};
        populate[value] = criteria;
        this.setLimiter('populate', populate);
        return this;
    }
    /**
     * @public
     * @name populateAll
     * @description - popluations all associates
     * @returns QyeryFetchDecorators<IEntity>
     */
    populateAll() {
        this.setLimiter('populate', common_1.ALL_POPULANTS);
        return this;
    }
    /**
     * @public
     * @name setLimiter
     * @param attr keyof IQueryLimiters
     * @param value any
     * @returns QueryDecorators<IEntity>
     */
    setLimiter(attr, value) {
        this._limiter[attr] = value;
        return this;
    }
    /**
     * @public
     * @name sort
     * @param sort string | object[] | object
     * @returns QueryDecorators<IEntity>
     */
    sort(sort) {
        this.setLimiter('sort', sort);
        return this;
    }
    /**
     * @public
     * @name limit
     * @param value number
     * @returns QueryDecorators<IEntity>
     */
    limit(value) {
        this.setLimiter('limit', value);
        return this;
    }
    /**
     * @public
     * @name skip
     * @param value number
     * @returns QueryDecorators<IEntity>
     */
    skip(value) {
        this.setLimiter('skip', value);
        return this;
    }
    // getters
    get connector() {
        return this._model.connector;
    }
    get modelInstance() {
        return this._model.modelInstance;
    }
    get modelConfig() {
        return this._model.modelConfig;
    }
    get limiter() {
        return this._limiter;
    }
    get query() {
        return this._query;
    }
}
exports.QueryDecorators = QueryDecorators;
/**
 * @class
 * @name QueryStreamDecorator<IEntity>
 * @extends QueryDecorators<IEntity>
 * @implements IQueryStreamDecorators<IEntity>
 * @description runs opperations for stream style queries
 */
class QueryStreamDecorators extends QueryDecorators {
    constructor(model, query) {
        super(model, query);
        this._batch = false;
    }
    /**
     * @private
     * @name applyStreamCallback
     * @description managers the action for the fetch callback
     * @param records {IEntity | IEntity[]}
     * @returns {Promis<void> | void}
     */
    applyStreamCallback(records) {
        const isArray = Array.isArray(records);
        if (isArray && this._batch) {
            const boundFunction = this._localBatchCallback.bind(this);
            const applied = this.modelInstance.applyMany(records);
            return boundFunction(applied);
        }
        else if (!isArray && !this._batch) {
            const boundFunction = this._localEachCallback.bind(this);
            const applied = this.modelInstance.applyOne(records);
            return boundFunction(applied);
        }
        throw new Error('There was an error processing the streamed query');
    }
    /**
     * @public
     * @name fetch
     * @description runs the query operations. It must be called to process
     *   the batch operation
     * @returns {Promise<any>}
     */
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._localBatchCallback && !this._localEachCallback) {
                throw new Error('A local callback must be defined');
            }
            const fnName = this._batch ? 'streamBatch' : 'streamEach';
            yield this.connector[fnName](this.query, this.limiter, this.modelConfig, 
            // [AS] we want to manipulate the data before it leaves the model
            // and send the details through our modelinstance object
            this.applyStreamCallback.bind(this));
            return null;
        });
    }
    /**
     * @public
     * @name fetchOne
     * @description used to override the fetchOne from QueryDecorators. It is not
     *  relevant for this operation
     * @throws Error
     */
    fetchOne() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('This operation should not occur. Please use fetch or a find() operation with fetchOne');
            return null;
        });
    }
    /**
     * @public
     * @name eachRecord
     * @description runs a single record operation for streaming models
     * @param batchNumber {number}
     * @param cb  { (models: T[]) => Promise<any> | any}
     * @returns {QueryStreamDecorators<IEntity>}
     */
    eachRecord(cb) {
        this._localEachCallback = cb;
        return this;
    }
    /**
     * @public
     * @name eachBatch
     * @description runs a batch operation for streaming models
     * @param batchNumber {number}
     * @param cb  { (models: T[]) => Promise<any> | any}
     * @returns {QueryStreamDecorators<IEntity>}
     */
    eachBatch(batchNumber, cb) {
        this._localBatchCallback = cb;
        this.limiter.batchNumber = batchNumber;
        this._batch = true;
        return this;
    }
}
exports.QueryStreamDecorators = QueryStreamDecorators;
