import { IEntity, LiveConnectionConstruct, IModelCollection, IModelConfigurationDetails, IModelAttributes } from '../entities';
/**
 * @class
 * @name CollectionIdentifier<IEntity>
 * @description provides the configuration details
 *  required by the connector to run the collection-based
 *  functions
 */
export declare class CollectionIdentifier<T> {
    private _name;
    private _collection;
    private _instance;
    private _model;
    constructor(name: string, collection: string, instance: T | number, model: string);
    get model(): string;
    get name(): string;
    get collection(): string;
    get instance(): number;
}
/**
 * @class
 * @name ModelCollection<IEntity>
 * @extends Array<IEntity>
 * @description Allows us to apply functionalty to collection
 *  attributes that behaive as arrays
 */
export declare class ModelCollection<T extends IEntity> extends Array<T> implements IModelCollection<T> {
    #private;
    constructor(identity: CollectionIdentifier<T>, connector: LiveConnectionConstruct);
    get model(): string;
    get name(): string;
    get collection(): string;
    get instance(): number;
    /**
     * @public
     * @name addToCollection
     * @description adds and entity or id to a collection. It's function is
     *   controlled by the connector
     * @param value {number | IEntity}
     * @returns {Promise<void>}
     */
    addToCollection(value: number | IEntity): Promise<void>;
    /**
     * @public
     * @name removeFromCollection
     * @description removes and entity or id to a collection. It's function is
     *   controlled by the connector
     * @param value {number | IEntity}
     * @returns {Promise<void>}
     */
    removeFromCollection(value: number | IEntity): Promise<void>;
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
export declare class ModelInstance<T extends IEntity> {
    connector: LiveConnectionConstruct;
    _modelConfig: IModelConfigurationDetails;
    types: {
        collection: string;
        json: string;
    };
    constructor(connector: LiveConnectionConstruct, modelConfig: IModelConfigurationDetails);
    get modelConfig(): IModelConfigurationDetails;
    /**
     * @public
     * @name attrs
     * @description retrieves the attributes for that model
     *    from the connector
     * @returns {Record<string, IModelAttributes>}
     */
    attrs(): Record<string, IModelAttributes>;
    /**
     * @public
     * @description retrieves the list of keys for a given model
     * @returns {string[]}
     */
    getKeys(): string[];
    /**
     * @public
     * @name applyOne
     * @param {IEntity} - the raw model
     * @returns {ModelInstanceIdentity<IEntity>}
     */
    applyOne(model: T): ModelInstanceIdentity<T>;
    /**
     * @public
     * @name applyMany
     * @param {IEntity[]} - the raw models
     * @returns {ModelInstanceIdentity<IEntity>[]}
     */
    applyMany(models: T[]): ModelInstanceIdentity<T[]>;
    /**
     * @private
     * @name isType
     * @description Checks the type param to see if we have
     *   a specific type
     * @param attr {any} the param getting checked
     * @param type {string}
     * @returns {boolean} true if type matches
     */
    private isType;
    /**
     * @private
     * @name containsKey
     * @description we are searching for a specific key value in the
     *   attribute
     * @param attr {IModelAttributes | string}
     * @param key string
     * @returns boolean - true if it contains the second key param
     */
    private containsKey;
    /**
     * @private
     * @name buildCollection
     * @description builds those paramters that are defined as a collection
     *   with the Model collection object
     * @param model {IEntity}
     * @param key {string} - the name of the param
     * @param attr {IModelAttributes}
     */
    private buildCollection;
    /**
     * @private
     * @name isValidJson
     * @description checks to see of a json specific model is valid JSON
     * @param model
     * @returns {boolean} - if the json is valid
     */
    private isValidJson;
    /**
     * @private
     * @name startsAndEndsWith
     * @description we want to see if a string looks like json. It should either
     *   start and end with {} or [].
     * @param value {string} - the values to check
     * @param chars {string} - comma deliniated start and end characters, length 3
     * @returns {boolean} - if the string is valid
     */
    private startsAndEndsWith;
    /**
     * @private
     * @name isStringJson
     * @description is our JSON a string?
     * @param model {any} - we are trying to see if the value is a string
     * @returns boolean - true if it is a stringified json object
     */
    private isStringJson;
    /**
     * @private
     * @name parseJSONString
     * @description simply parses a JSON string
     * @param json {string} - string value but any to make
     *   the interpreter happy
     * @returns JSON
     */
    private parseJSONString;
    /**
     * @private
     * @name ensureIsValidJSON
     * @description we want to make sure our params designated as JSON
     *   or array are not stringified
     * @param model {IEntity}
     * @param key {string} the key of the paramter
     * @returns {void}
     */
    private ensureIsValidJSON;
    /**
     * @private
     * @name applyRegistration
     * @description iterates through all the param values and checks to
     *   make sure they are in the correct form from the database. Additionaly,
     *   we can add decorators to specific params such as collections.
     * @param model
     * @returns
     */
    private applyRegistration;
}
/**
 * @class
 * @name ModelInstanceIdentity
 * @description a class to wrap a bare model entity.
 *   for now it acts like a noop wrapper.
 */
export declare class ModelInstanceIdentity<T> {
    constructor(model: T);
}
