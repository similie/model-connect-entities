import { QueryDecorators, QyeryPopulantDecorators, QueryStreamDecorators } from '.';
import { ModelInstance } from '.';
import { IEntity, IModelConnect, LiveConnectionConstruct, IModelConfigurationDetails, IQueryOrPartial, IEntityPartial, IValuesToEscape } from '../entities';
/**
 * @class
 * @name Model<IEntity>
 * @description working base class for connector communication
 */
export declare class Model<T extends IEntity> implements IModelConnect<T> {
    _modelConfig: IModelConfigurationDetails;
    _connector: LiveConnectionConstruct;
    _modelInstance: ModelInstance<T>;
    _query: any;
    constructor(connector?: LiveConnectionConstruct);
    get modelInstance(): ModelInstance<T>;
    get connector(): LiveConnectionConstruct;
    get modelConfig(): IModelConfigurationDetails;
    protected get modelname(): string | undefined;
    protected set modelname(modelname: string | undefined);
    protected set modelConfig(modelConfig: IModelConfigurationDetails);
    /**
     * @name raw
     * @description used for raw access to the ORM namedspaced
     *    by the registry
     * @returns a raw instance of the connector model
     */
    raw(): any;
    /**
     * @name getId
     * @description tries to pull an id param from the payload
     * @param query number | IEntity | undefined | null
     * @returns number | null
     */
    getId(query: number | T | undefined | null): number | undefined;
    /**
     * @name initWithId
     * @description starts a query for a model entity
     * @param id number
     * @returns QyeryPopulantDecorators<IEntity>
     */
    initWithId(id: number): QyeryPopulantDecorators<T>;
    /**
     * @name find
     * @description starts a search query with chainable functions
     * @param query
     * @returns QueryDecorators<IEntity>
     */
    find(query?: IQueryOrPartial<T>): QueryDecorators<T>;
    /**
     * @name save
     * @description saves a single record
     * @param values IEntity
     * @returns Promise<IEntity> - saved values
     */
    save(values: T): Promise<T>;
    /**
     * @name update
     * @description updates multiple records
     * @param query object
     * @param update values to saved to entity
     * @returns Promise<IEntity[]> - saved records
     */
    update(query: IQueryOrPartial<T>, update: IEntityPartial<T>): Promise<T[]>;
    /**
     * @name count
     * @description counts the number of elements based in a given query
     * @param query object - parameters to count
     * @returns Promise<number>
     */
    count(query?: IQueryOrPartial<T>): Promise<number>;
    /**
     * @name destroy
     * @description destroys a single record
     * @param value IEntity
     * @returns Promise<IEntity> - deleted record if avaible
     */
    destroy(value: IEntityPartial<T> | number): Promise<T>;
    /**
     * @name destroyAll
     * @description destroys multiple records depending one query
     * @param query object
     * @returns Promise<IEntity[]> - destroyed records
     */
    destroyAll(query: IQueryOrPartial<T>): Promise<T[]>;
    /**
     * @name create
     * @description creates a new model
     * @param query any the values to be created
     * @returns Promise<IEntity> - newly created model
     */
    create(query: IEntityPartial<T>): Promise<T>;
    /**
     * @name createMany
     * @description creates a lot of records of a givin type
     * @param query any[]
     * @returns Promise<IEntity[]> - newly created models
     */
    createMany(query: IEntityPartial<T>[]): Promise<T[]>;
    /**
     * @public
     * @name findOrCreate
     * @description finds a model based on the given criteria. The model criteria does
     *   not exist in the database, it creates a model with the initials values
     * @param criteria {IEntity}
     * @param initialsValues {IEntity}
     * @returns Promise<IEntity>
     */
    findOrCreate(criteria: IQueryOrPartial<IEntity>, initialsValues: IEntityPartial<IEntity>): Promise<T>;
    /**
     * @public
     * @name avg {param: keyof IEntity} - the numeric paramter
     * @description gets the average for a numeric paramter
     * @returns Promise<number>
     */
    avg(numericAttrName: keyof T, criteria?: IQueryOrPartial<T>): Promise<number>;
    /**
     * @public
     * @name sum {param: keyof IEntity} - the numeric paramter
     * @description gets the sum for a numeric paramter
     * @returns Promise<number>
     */
    sum(numericAttrName: keyof T, criteria?: IQueryOrPartial<T>): Promise<number>;
    /**
     * @public
     * @name stream
     * @description streams records from the database instream of buffering
     *   all records. This is good for API calls with massive datasets
     * @param query {any}
     * @returns QueryStreamDecorators<IEntity>
     */
    stream(query: any): QueryStreamDecorators<T>;
    /**
     * @public
     * @name toJson
     * @description allows for an object override to occur. The default
     *  bechavior will simply return the model. However, it can be overriden
     *  in the individual model entities. Useful for sending data over the api
     * @param model {IEntity}
     * @returns {any}
     */
    toJson(model: T): Promise<T>;
    /**
     * @public
     * @name query
     * @description generates a row sql query to the connector
     * @param query {string}
     * @returns {any} the queried results
     */
    query(query: string, valuesToEscape?: IValuesToEscape): Promise<any>;
}
