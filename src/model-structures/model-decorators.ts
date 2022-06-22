/*
█▀▄▀█ █▀█ █▀▄ █▀▀ █░░   █▀▄ █▀▀ █▀▀ █▀█ █▀█ ▄▀█ ▀█▀ █▀█ █▀█ █▀
█░▀░█ █▄█ █▄▀ ██▄ █▄▄   █▄▀ ██▄ █▄▄ █▄█ █▀▄ █▀█ ░█░ █▄█ █▀▄ ▄█
*/

import {
  IBaseModelEntity,
  IQueryDecorators,
  IQueryFetch,
  IQueryLimiters,
  IQueryPopulates,
  IQueryStreamDecorators,
  ISingleQueryObject,
} from "../entities";
import { Model } from ".";
import { ALL_POPULANTS } from "../common";

/**
 * @class QyeryFetchDecorators<IBaseModelEntity>
 * @implements IQueryFetch<IBaseModelEntity>
 * @description when an initWithId is called it can only have
 * a populates param;
 */
export class QyeryFetchDecorators<T extends IBaseModelEntity>
  implements IQueryFetch<T>
{
  private _decorator: QueryDecorators<T>;
  constructor(decorator: QueryDecorators<T>) {
    this._decorator = decorator;
  }
  /**
   * @name fetch
   * @description
   * @returns IBaseModelEntity - decorator fetchOne
   */
  fetch() {
    return this._decorator.fetchOne();
  }
}

/**
 * @class QyeryPopulantDecorators<IBaseModelEntity>
 * @implements IQueryPopulates<IBaseModelEntity>
 * @description when an find is called it can only have
 * a populates param;
 */
export class QyeryPopulantDecorators<T extends IBaseModelEntity>
  implements IQueryPopulates<T>
{
  private _decorator: QueryDecorators<T>;
  constructor(decorator: QueryDecorators<T>) {
    this._decorator = decorator;
  }

  /**
   * @public
   * @name populate
   * @description - applies a populate value to the query
   * @param value - string the association to populate
   * @returns QyeryFetchDecorators<IBaseModelEntity> - it should only contain a fetch function
   */
  populate(value: string, criteria?: ISingleQueryObject<any>) {
    this._decorator.populate(value, criteria);
    return new QyeryFetchDecorators<T>(this._decorator);
  }

  /**
   * @public
   * @name populateAll
   * @description - popluations all associates
   * @returns QyeryFetchDecorators<IBaseModelEntity> - it should only contain a fetch function
   */
  populateAll() {
    this._decorator.populateAll();
    return new QyeryFetchDecorators<T>(this._decorator);
  }

  /**
   * @public
   * @name fetch
   * @description pulls a fetchOne for the initWithId function
   * @returns IBaseModelEntity
   */
  fetch() {
    return this._decorator.fetchOne();
  }
}

/**
 * @class
 * @name QueryDecorators<IBaseModelEntity>
 * @implements IQueryDecorators<IBaseModelEntity>
 * @description allows for query chaining for the model find function
 */
export class QueryDecorators<T extends IBaseModelEntity>
  implements IQueryDecorators<T>
{
  private _model: Model<T>;
  private _query: any;
  private _limiter: IQueryLimiters = {};
  constructor(model: Model<T>, query: any) {
    this._query = query;
    this._model = model;
  }
  /**
   * @public
   * @name fetch
   * @description pulls a fetch for the initWithId function
   * @returns IBaseModelEntity[]
   */
  async fetch() {
    const found: T[] = <T[]>(
      await this.connector?.find(this._query, this._limiter, this.modelConfig)
    );
    return this.modelInstance.applyMany(found) as T[];
  }
  /**
   * @public
   * @name fetchOne
   * @description pulls a fetchOne for the initWithId function
   * @returns IBaseModelEntity
   */
  async fetchOne() {
    const found = <T>(
      await this.connector?.findOne(
        this._query,
        this._limiter,
        this.modelConfig
      )
    );
    return this.modelInstance.applyOne(found) as T;
  }
  /**
   * @public
   * @name populate
   * @description - applies a populate value to the query
   * @param value - string the association to populate
   * @returns QyeryFetchDecorators<IBaseModelEntity>
   */
  populate(value: string, criteria?: ISingleQueryObject<any>) {
    const populate = this._limiter.populate || {};
    populate[value] = criteria;
    this.setLimiter("populate", populate);
    return this;
  }

  /**
   * @public
   * @name populateAll
   * @description - popluations all associates
   * @returns QyeryFetchDecorators<IBaseModelEntity>
   */
  populateAll() {
    this.setLimiter("populate", ALL_POPULANTS);
    return this;
  }

  /**
   * @public
   * @name setLimiter
   * @param attr keyof IQueryLimiters
   * @param value any
   * @returns QueryDecorators<IBaseModelEntity>
   */
  setLimiter(attr: keyof IQueryLimiters, value: any) {
    this._limiter[attr] = value;
    return this;
  }

  /**
   * @public
   * @name sort
   * @param sort string | object[] | object
   * @returns QueryDecorators<IBaseModelEntity>
   */
  sort(sort: string | object[] | object) {
    this.setLimiter("sort", sort);
    return this;
  }

  /**
   * @public
   * @name limit
   * @param value number
   * @returns QueryDecorators<IBaseModelEntity>
   */
  limit(value: number) {
    this.setLimiter("limit", value);
    return this;
  }

  /**
   * @public
   * @name skip
   * @param value number
   * @returns QueryDecorators<IBaseModelEntity>
   */
  skip(value: number) {
    this.setLimiter("skip", value);
    return this;
  }
  // getters
  protected get connector() {
    return this._model.connector;
  }

  protected get modelInstance() {
    return this._model.modelInstance;
  }

  protected get modelConfig() {
    return this._model.modelConfig;
  }

  protected get limiter() {
    return this._limiter;
  }

  protected get query() {
    return this._query;
  }
}

/**
 * @class
 * @name QueryStreamDecorator<IBaseModelEntity>
 * @extends QueryDecorators<IBaseModelEntity>
 * @implements IQueryStreamDecorators<IBaseModelEntity>
 * @description runs opperations for stream style queries
 */
export class QueryStreamDecorators<T extends IBaseModelEntity>
  extends QueryDecorators<T>
  implements IQueryStreamDecorators<T>
{
  _modelQuery: any;
  _batch: boolean = false;
  _localBatchCallback: undefined | ((model: T[]) => any | Promise<any>);
  _localEachCallback: undefined | ((model: T) => any | Promise<any>);
  constructor(model: Model<T>, query: any) {
    super(model, query);
  }

  /**
   * @private
   * @name applyStreamCallback
   * @description managers the action for the fetch callback
   * @param records {IBaseModelEntity | IBaseModelEntity[]}
   * @returns {Promis<void> | void}
   */
  private applyStreamCallback(records: IBaseModelEntity | IBaseModelEntity[]) {
    const isArray = Array.isArray(records);
    if (isArray && this._batch) {
      const boundFunction = this._localBatchCallback!.bind(this);
      const applied = this.modelInstance.applyMany(records as T[]) as T[];
      return boundFunction(applied);
    } else if (!isArray && !this._batch) {
      const boundFunction = this._localEachCallback!.bind(this);
      const applied = this.modelInstance.applyOne(records as T) as T;
      return boundFunction(applied);
    }
    throw new Error("There was an error processing the streamed query");
  }

  /**
   * @public
   * @name fetch
   * @description runs the query operations. It must be called to process
   *   the batch operation
   * @returns {Promise<any>}
   */
  async fetch() {
    if (!this._localBatchCallback && !this._localEachCallback) {
      throw new Error("A local callback must be defined");
    }
    const fnName = this._batch ? "streamBatch" : "streamEach";
    await this.connector[fnName](
      this.query,
      this.limiter,
      this.modelConfig,
      // [AS] we want to manipulate the data before it leaves the model
      // and send the details through our modelinstance object
      this.applyStreamCallback.bind(this)
    );
    return null as any;
  }

  /**
   * @public
   * @name fetchOne
   * @description used to override the fetchOne from QueryDecorators. It is not
   *  relevant for this operation
   * @throws Error
   */
  async fetchOne() {
    throw new Error(
      "This operation should not occur. Please use fetch or a find() operation with fetchOne"
    );
    return null as any;
  }

  /**
   * @public
   * @name eachRecord
   * @description runs a single record operation for streaming models
   * @param batchNumber {number}
   * @param cb  { (models: T[]) => Promise<any> | any}
   * @returns {QueryStreamDecorators<IBaseModelEntity>}
   */
  eachRecord(cb: (model: T) => any | Promise<any>) {
    this._localEachCallback = cb;
    return this;
  }

  /**
   * @public
   * @name eachBatch
   * @description runs a batch operation for streaming models
   * @param batchNumber {number}
   * @param cb  { (models: T[]) => Promise<any> | any}
   * @returns {QueryStreamDecorators<IBaseModelEntity>}
   */
  eachBatch(batchNumber: number, cb: (models: T[]) => Promise<any> | any) {
    this._localBatchCallback = cb;
    this.limiter.batchNumber = batchNumber;
    this._batch = true;
    return this;
  }
}
