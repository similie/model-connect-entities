import {
  IEntity,
  LiveConnectionConstruct,
  IModelCollection,
  IModelConfigurationDetails,
  IModelAttributes,
} from '../entities';

import { getId } from '../utils';

/**
 * @class
 * @name CollectionIdentifier<IEntity>
 * @description provides the configuration details
 *  required by the connector to run the collection-based
 *  functions
 */
export class CollectionIdentifier<T> {
  private _name: string; // files
  private _collection: string; // sysfiles
  private _instance: number; // parent id,
  private _model: string; // purchaseorder
  constructor(
    name: string,
    collection: string,
    instance: T | number,
    model: string
  ) {
    this._name = name;
    this._collection = collection;
    this._instance = getId(instance) || -1;
    this._model = model;
  }
  get model() {
    return this._model;
  }
  get name() {
    return this._name;
  }
  get collection() {
    return this._collection;
  }
  get instance() {
    return this._instance;
  }
}

/**
 * @class
 * @name ModelCollection<IEntity>
 * @extends Array<IEntity>
 * @description Allows us to apply functionalty to collection
 *  attributes that behaive as arrays
 */
export class ModelCollection<T extends IEntity>
  extends Array<T>
  implements IModelCollection<T>
{
  // [AS] hides properties from console.log
  #_identity: CollectionIdentifier<T>;
  #_connector: LiveConnectionConstruct;
  constructor(
    identity: CollectionIdentifier<T>,
    connector: LiveConnectionConstruct
  ) {
    super();
    this.#_identity = identity;
    this.#_connector = connector;
  }
  get model() {
    return this.#_identity.model;
  }
  get name() {
    return this.#_identity.name;
  }
  get collection() {
    return this.#_identity.collection;
  }
  get instance() {
    return this.#_identity.instance;
  }
  /**
   * @public
   * @name addToCollection
   * @description adds and entity or id to a collection. It's function is
   *   controlled by the connector
   * @param value {number | IEntity}
   * @returns {Promise<void>}
   */
  async addToCollection(value: number | IEntity): Promise<void> {
    return await this.#_connector.addToCollection(value, this);
  }
  /**
   * @public
   * @name removeFromCollection
   * @description removes and entity or id to a collection. It's function is
   *   controlled by the connector
   * @param value {number | IEntity}
   * @returns {Promise<void>}
   */
  async removeFromCollection(value: number | IEntity): Promise<void> {
    return await this.#_connector.removeFromCollection(value, this);
  }
}

/**
 * @class
 * @name ModelInstance<IEntity>
 * @description when we get a raw model from the there is
 *  a specfic functionality we want to apply to these models.
 *  the most obvious use case is the operations on collection
 *  attributes. We can also are stringified JSON and any
 *  additional operations required by the application
 */
export class ModelInstance<T extends IEntity> {
  connector: LiveConnectionConstruct;
  _modelConfig: IModelConfigurationDetails;
  types = {
    collection: 'collection',
    json: 'json',
  };
  // we instantiate with the LiveConnection and
  // the configuration details
  constructor(
    connector: LiveConnectionConstruct,
    modelConfig: IModelConfigurationDetails
  ) {
    this.connector = connector;
    this._modelConfig = modelConfig;
  }

  get modelConfig() {
    return this._modelConfig;
  }

  /**
   * @public
   * @name attrs
   * @description retrieves the attributes for that model
   *    from the connector
   * @returns {Record<string, IModelAttributes>}
   */
  attrs() {
    return this.connector.attr(this.modelConfig);
  }

  /**
   * @public
   * @description retrieves the list of keys for a given model
   * @returns {string[]}
   */
  getKeys() {
    return this.connector.keys(this.modelConfig);
  }
  /**
   * @public
   * @name applyOne
   * @param {IEntity} - the raw model
   * @returns {ModelInstanceIdentity<IEntity>}
   */
  applyOne(model: T): ModelInstanceIdentity<T> {
    return this.applyRegistration(model);
  }
  /**
   * @public
   * @name applyMany
   * @param {IEntity[]} - the raw models
   * @returns {ModelInstanceIdentity<IEntity>[]}
   */
  applyMany(models: T[]): ModelInstanceIdentity<T[]> {
    for (let i = 0; i < models.length; i++) {
      this.applyOne(models[i]);
    }
    return models;
  }

  /**
   * @private
   * @name isType
   * @description Checks the type param to see if we have
   *   a specific type
   * @param attr {any} the param getting checked
   * @param type {string}
   * @returns {boolean} true if type matches
   */
  private isType(attr: IModelAttributes = {}, type: string) {
    return attr.type === type;
  }

  /**
   * @private
   * @name containsKey
   * @description we are searching for a specific key value in the
   *   attribute
   * @param attr {IModelAttributes | string}
   * @param key string
   * @returns boolean - true if it contains the second key param
   */
  private containsKey(attr: IModelAttributes | string, key: string) {
    // sometimes in waterline, 0.1x you can define an attribute as "param": 'string'
    if (typeof attr === 'string') {
      return attr === key;
    }
    // default to false
    const hasNot = false;
    const keys = Object.keys(attr);
    for (let i = 0; i < keys.length; i++) {
      const _key = keys[i];
      if (_key === key) {
        // we have a true, just return
        return true;
      }
    }
    return hasNot;
  }

  /**
   * @private
   * @name buildCollection
   * @description builds those paramters that are defined as a collection
   *   with the Model collection object
   * @param model {IEntity}
   * @param key {string} - the name of the param
   * @param attr {IModelAttributes}
   */
  private buildCollection(model: T, key: string, attr: IModelAttributes) {
    const _k: keyof T = <keyof T>key;
    const value = model[_k] as unknown;
    const arr = (value as T[]) || new Array<T>();
    const clone: T[] = [...arr];
    const modelName = this.modelConfig.modelname || '';
    const identity = new CollectionIdentifier<T>(
      key,
      attr.collection || '',
      model,
      modelName
    );
    const c = new ModelCollection<T>(identity, this.connector);
    c.push(...clone);
    // set the model with the new collection
    model[_k] = c as any;
  }

  /**
   * @private
   * @name isValidJson
   * @description checks to see of a json specific model is valid JSON
   * @param model
   * @returns {boolean} - if the json is valid
   */
  private isValidJson(model: any) {
    return !model || model instanceof Array || model instanceof Object;
  }

  /**
   * @private
   * @name startsAndEndsWith
   * @description we want to see if a string looks like json. It should either
   *   start and end with {} or [].
   * @param value {string} - the values to check
   * @param chars {string} - comma deliniated start and end characters, length 3
   * @returns {boolean} - if the string is valid
   */
  private startsAndEndsWith(value: string, chars: string) {
    const split = chars.split(',');
    return value.startsWith(split[0]) && value.endsWith(split[1]);
  }

  /**
   * @private
   * @name isStringJson
   * @description is our JSON a string?
   * @param model {any} - we are trying to see if the value is a string
   * @returns boolean - true if it is a stringified json object
   */
  private isStringJson(model: any) {
    return (
      typeof model === 'string' &&
      (this.startsAndEndsWith(model as string, '[,]') ||
        this.startsAndEndsWith(model as string, '{,}'))
    );
  }

  /**
   * @private
   * @name parseJSONString
   * @description simply parses a JSON string
   * @param json {string} - string value but any to make
   *   the interpreter happy
   * @returns JSON
   */
  private parseJSONString(json: any) {
    return JSON.parse(json);
  }

  /**
   * @private
   * @name ensureIsValidJSON
   * @description we want to make sure our params designated as JSON
   *   or array are not stringified
   * @param model {IEntity}
   * @param key {string} the key of the paramter
   * @returns {void}
   */
  private ensureIsValidJSON(model: T, key: string) {
    const _k: keyof T = <keyof T>key;
    const value = model[_k];
    if (this.isValidJson(value)) {
      return;
    }
    if (!this.isStringJson(value)) {
      return;
    }
    model[_k] = this.parseJSONString(value);
  }

  /**
   * @private
   * @name applyRegistration
   * @description iterates through all the param values and checks to
   *   make sure they are in the correct form from the database. Additionaly,
   *   we can add decorators to specific params such as collections.
   * @param model
   * @returns
   */
  private applyRegistration(model: T): ModelInstanceIdentity<T> {
    const attrs = this.attrs();
    for (const k in attrs) {
      const attr = attrs[k];
      if (this.containsKey(attr, this.types.collection)) {
        this.buildCollection(model, k, attr);
      } else if (this.isType(attr, this.types.json)) {
        this.ensureIsValidJSON(model, k);
      }
    }
    // we simply instantiate this incase we want to
    // add funtionality to the base model. For now
    // we just copy the values.
    return new ModelInstanceIdentity<T>(model);
  }
}

/**
 * @class
 * @name ModelInstanceIdentity
 * @description a class to wrap a bare model entity.
 *   for now it acts like a noop wrapper.
 */
export class ModelInstanceIdentity<T> {
  constructor(model: T) {
    Object.assign(this, model);
  }
}
