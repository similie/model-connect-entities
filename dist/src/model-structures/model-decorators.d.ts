import { IBaseModelEntity, IQueryDecorators, IQueryFetch, IQueryLimiters, IQueryPopulates, IQueryStreamDecorators, ISingleQueryObject } from "../entities";
import { Model } from ".";
/**
 * @class QyeryFetchDecorators<IBaseModelEntity>
 * @implements IQueryFetch<IBaseModelEntity>
 * @description when an initWithId is called it can only have
 * a populates param;
 */
export declare class QyeryFetchDecorators<T extends IBaseModelEntity> implements IQueryFetch<T> {
    private _decorator;
    constructor(decorator: QueryDecorators<T>);
    /**
     * @name fetch
     * @description
     * @returns IBaseModelEntity - decorator fetchOne
     */
    fetch(): Promise<T>;
}
/**
 * @class QyeryPopulantDecorators<IBaseModelEntity>
 * @implements IQueryPopulates<IBaseModelEntity>
 * @description when an find is called it can only have
 * a populates param;
 */
export declare class QyeryPopulantDecorators<T extends IBaseModelEntity> implements IQueryPopulates<T> {
    private _decorator;
    constructor(decorator: QueryDecorators<T>);
    /**
     * @public
     * @name populate
     * @description - applies a populate value to the query
     * @param value - string the association to populate
     * @returns QyeryFetchDecorators<IBaseModelEntity> - it should only contain a fetch function
     */
    populate(value: string, criteria?: ISingleQueryObject<any>): QyeryFetchDecorators<T>;
    /**
     * @public
     * @name populateAll
     * @description - popluations all associates
     * @returns QyeryFetchDecorators<IBaseModelEntity> - it should only contain a fetch function
     */
    populateAll(): QyeryFetchDecorators<T>;
    /**
     * @public
     * @name fetch
     * @description pulls a fetchOne for the initWithId function
     * @returns IBaseModelEntity
     */
    fetch(): Promise<T>;
}
/**
 * @class
 * @name QueryDecorators<IBaseModelEntity>
 * @implements IQueryDecorators<IBaseModelEntity>
 * @description allows for query chaining for the model find function
 */
export declare class QueryDecorators<T extends IBaseModelEntity> implements IQueryDecorators<T> {
    private _model;
    private _query;
    private _limiter;
    constructor(model: Model<T>, query: any);
    /**
     * @public
     * @name fetch
     * @description pulls a fetch for the initWithId function
     * @returns IBaseModelEntity[]
     */
    fetch(): Promise<T[]>;
    /**
     * @public
     * @name fetchOne
     * @description pulls a fetchOne for the initWithId function
     * @returns IBaseModelEntity
     */
    fetchOne(): Promise<T>;
    /**
     * @public
     * @name populate
     * @description - applies a populate value to the query
     * @param value - string the association to populate
     * @returns QyeryFetchDecorators<IBaseModelEntity>
     */
    populate(value: string, criteria?: ISingleQueryObject<any>): this;
    /**
     * @public
     * @name populateAll
     * @description - popluations all associates
     * @returns QyeryFetchDecorators<IBaseModelEntity>
     */
    populateAll(): this;
    /**
     * @public
     * @name setLimiter
     * @param attr keyof IQueryLimiters
     * @param value any
     * @returns QueryDecorators<IBaseModelEntity>
     */
    setLimiter(attr: keyof IQueryLimiters, value: any): this;
    /**
     * @public
     * @name sort
     * @param sort string | object[] | object
     * @returns QueryDecorators<IBaseModelEntity>
     */
    sort(sort: string | object[] | object): this;
    /**
     * @public
     * @name limit
     * @param value number
     * @returns QueryDecorators<IBaseModelEntity>
     */
    limit(value: number): this;
    /**
     * @public
     * @name skip
     * @param value number
     * @returns QueryDecorators<IBaseModelEntity>
     */
    skip(value: number): this;
    protected get connector(): import("../entities").LiveConnectionConstruct;
    protected get modelInstance(): import("./param-structure").ModelInstance<T>;
    protected get modelConfig(): import("../entities").IModelConfigurationDetails;
    protected get limiter(): IQueryLimiters;
    protected get query(): any;
}
/**
 * @class
 * @name QueryStreamDecorator<IBaseModelEntity>
 * @extends QueryDecorators<IBaseModelEntity>
 * @implements IQueryStreamDecorators<IBaseModelEntity>
 * @description runs opperations for stream style queries
 */
export declare class QueryStreamDecorators<T extends IBaseModelEntity> extends QueryDecorators<T> implements IQueryStreamDecorators<T> {
    _modelQuery: any;
    _batch: boolean;
    _localBatchCallback: undefined | ((model: T[]) => any | Promise<any>);
    _localEachCallback: undefined | ((model: T) => any | Promise<any>);
    constructor(model: Model<T>, query: any);
    /**
     * @private
     * @name applyStreamCallback
     * @description managers the action for the fetch callback
     * @param records {IBaseModelEntity | IBaseModelEntity[]}
     * @returns {Promis<void> | void}
     */
    private applyStreamCallback;
    /**
     * @public
     * @name fetch
     * @description runs the query operations. It must be called to process
     *   the batch operation
     * @returns {Promise<any>}
     */
    fetch(): Promise<any>;
    /**
     * @public
     * @name fetchOne
     * @description used to override the fetchOne from QueryDecorators. It is not
     *  relevant for this operation
     * @throws Error
     */
    fetchOne(): Promise<any>;
    /**
     * @public
     * @name eachRecord
     * @description runs a single record operation for streaming models
     * @param batchNumber {number}
     * @param cb  { (models: T[]) => Promise<any> | any}
     * @returns {QueryStreamDecorators<IBaseModelEntity>}
     */
    eachRecord(cb: (model: T) => any | Promise<any>): this;
    /**
     * @public
     * @name eachBatch
     * @description runs a batch operation for streaming models
     * @param batchNumber {number}
     * @param cb  { (models: T[]) => Promise<any> | any}
     * @returns {QueryStreamDecorators<IBaseModelEntity>}
     */
    eachBatch(batchNumber: number, cb: (models: T[]) => Promise<any> | any): this;
}
