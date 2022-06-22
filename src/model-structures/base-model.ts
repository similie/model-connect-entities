/* 
█▀▄▀█ █▀█ █▀▄ █▀▀ █░░ █▀
█░▀░█ █▄█ █▄▀ ██▄ █▄▄ ▄█ 
 */

import {
  QueryDecorators,
  QyeryPopulantDecorators,
  QueryStreamDecorators,
} from ".";
import { ModelInstance } from ".";
import {
  IBaseModelEntity,
  IModelConnect,
  LiveConnectionConstruct,
  IModelConfigurationDetails,
  IQueryOrPartial,
  IBaseModelEntityPartial,
  IValuesToEscape,
} from "../entities";

import { GlobalConnection } from "../glabal-connect";
import { getId } from "../utils";

/**
 * @class
 * @name Model<IBaseModelEntity>
 * @description working base class for connector communication
 */
export class Model<T extends IBaseModelEntity> implements IModelConnect<T> {
  _modelConfig: IModelConfigurationDetails;
  _connector: LiveConnectionConstruct;
  _modelInstance: ModelInstance<T>;
  _query: any;
  constructor(connector?: LiveConnectionConstruct) {
    // we can take a connector from the constructor
    if (connector) {
      this._connector = connector;
    } else if (GlobalConnection.hasConnection()) {
      // for if it is statically defined
      const globalConfig = GlobalConnection.getInstance();
      this._connector = globalConfig.connector;
    } else {
      throw new Error(
        "A valid connection is required to instantiate this model"
      );
    }
    // [AS] we are only defining the modelname currently for the configuration
    // we can also apply other attributes for future functionality
    this._modelConfig = this._connector.modelConfig;
    // [AS] this will build the model with the specific entity
    this._modelInstance = new ModelInstance<T>(
      this.connector,
      this.modelConfig
    );
  }
  // getters
  get modelInstance() {
    return this._modelInstance;
  }

  get connector() {
    return this._connector;
  }

  get modelConfig(): IModelConfigurationDetails {
    return this._modelConfig;
  }

  protected get modelname() {
    return this.modelConfig.modelname;
  }
  // setters
  protected set modelname(modelname) {
    this.modelConfig.modelname = modelname;
  }

  protected set modelConfig(modelConfig: IModelConfigurationDetails) {
    this._modelConfig = modelConfig;
  }
  /**
   * @name raw
   * @description used for raw access to the ORM namedspaced
   *    by the registry
   * @returns a raw instance of the connector model
   */
  public raw() {
    return this.connector?.raw(this.modelConfig);
  }

  /**
   * @name getId
   * @description tries to pull an id param from the payload
   * @param query number | IBaseModelEntity | undefined | null
   * @returns number | null
   */
  public getId(query: number | T | undefined | null): number | undefined {
    return getId(query) as any;
  }

  /**
   * @name initWithId
   * @description starts a query for a model entity
   * @param id number
   * @returns QyeryPopulantDecorators<IBaseModelEntity>
   */
  public initWithId(id: number) {
    const decorator = new QueryDecorators<T>(this, { id: id });
    return new QyeryPopulantDecorators<T>(decorator);
  }

  /**
   * @name find
   * @description starts a search query with chainable functions
   * @param query
   * @returns QueryDecorators<IBaseModelEntity>
   */
  public find(query?: IQueryOrPartial<T>) {
    return new QueryDecorators<T>(this, query);
  }

  /**
   * @name save
   * @description saves a single record
   * @param values IBaseModelEntity
   * @returns Promise<IBaseModelEntity> - saved values
   */
  public async save(values: T): Promise<T> {
    const updated = <T>await this.connector?.save(values, this.modelConfig);
    return this.modelInstance.applyOne(updated) as T;
  }

  /**
   * @name update
   * @description updates multiple records
   * @param query object
   * @param update values to saved to entity
   * @returns Promise<IBaseModelEntity[]> - saved records
   */
  public async update(
    query: IQueryOrPartial<T>,
    update: IBaseModelEntityPartial<T>
  ) {
    const updated = <T[]>(
      await this.connector?.update(query, update, this.modelConfig)
    );
    return this.modelInstance.applyMany(updated) as T[];
  }

  /**
   * @name count
   * @description counts the number of elements based in a given query
   * @param query object - parameters to count
   * @returns Promise<number>
   */
  public async count(query?: IQueryOrPartial<T>) {
    return await this.connector?.count(
      query as IQueryOrPartial<IBaseModelEntity>,
      this.modelConfig
    );
  }

  /**
   * @name destroy
   * @description destroys a single record
   * @param value IBaseModelEntity
   * @returns Promise<IBaseModelEntity> - deleted record if avaible
   */
  public async destroy(value: IBaseModelEntityPartial<T> | number) {
    // [AS] I don't bother sending through the model instance
    // param since it is destroyed now
    return <T>await this.connector?.destroy(value, this.modelConfig);
  }

  /**
   * @name destroyAll
   * @description destroys multiple records depending one query
   * @param query object
   * @returns Promise<IBaseModelEntity[]> - destroyed records
   */
  public async destroyAll(query: IQueryOrPartial<T>) {
    return <T[]>await this.connector?.destroyAll(query, this.modelConfig);
  }

  /**
   * @name create
   * @description creates a new model
   * @param query any the values to be created
   * @returns Promise<IBaseModelEntity> - newly created model
   */
  public async create(query: IBaseModelEntityPartial<T>) {
    const created = <T>await this.connector?.create(query, this.modelConfig);
    return this.modelInstance.applyOne(created) as T;
  }

  /**
   * @name createMany
   * @description creates a lot of records of a givin type
   * @param query any[]
   * @returns Promise<IBaseModelEntity[]> - newly created models
   */
  public async createMany(query: IBaseModelEntityPartial<T>[]) {
    const created = <T[]>(
      await this.connector?.createMany(query, this.modelConfig)
    );
    return this.modelInstance.applyMany(created) as T[];
  }

  /**
   * @public
   * @name findOrCreate
   * @description finds a model based on the given criteria. The model criteria does
   *   not exist in the database, it creates a model with the initials values
   * @param criteria {IBaseModelEntity}
   * @param initialsValues {IBaseModelEntity}
   * @returns Promise<IBaseModelEntity>
   */
  public async findOrCreate(
    criteria: IQueryOrPartial<IBaseModelEntity>,
    initialsValues: IBaseModelEntityPartial<IBaseModelEntity>
  ) {
    const foundOrCreated = <T>(
      await this.connector?.findOrCreate(
        criteria,
        initialsValues,
        this.modelConfig
      )
    );
    return this.modelInstance.applyOne(foundOrCreated) as T;
  }

  /**
   * @public
   * @name avg {param: keyof IBaseModelEntity} - the numeric paramter
   * @description gets the average for a numeric paramter
   * @returns Promise<number>
   */
  public async avg(numericAttrName: keyof T, criteria?: IQueryOrPartial<T>) {
    return this.connector?.avg(
      numericAttrName as keyof IBaseModelEntity,
      criteria,
      this.modelConfig
    );
  }

  /**
   * @public
   * @name sum {param: keyof IBaseModelEntity} - the numeric paramter
   * @description gets the sum for a numeric paramter
   * @returns Promise<number>
   */
  public async sum(numericAttrName: keyof T, criteria?: IQueryOrPartial<T>) {
    return this.connector?.sum(
      numericAttrName as keyof IBaseModelEntity,
      criteria,
      this.modelConfig
    );
  }

  /**
   * @public
   * @name stream
   * @description streams records from the database instream of buffering
   *   all records. This is good for API calls with massive datasets
   * @param query {any}
   * @returns QueryStreamDecorators<IBaseModelEntity>
   */
  public stream(query: any) {
    return new QueryStreamDecorators<T>(this, query);
  }
  /**
   * @public
   * @name toJson
   * @description allows for an object override to occur. The default
   *  bechavior will simply return the model. However, it can be overriden
   *  in the individual model entities. Useful for sending data over the api
   * @param model {IBaseModelEntity}
   * @returns {any}
   */
  public async toJson(model: T) {
    return model;
  }

  /**
   * @public
   * @name query
   * @description generates a row sql query to the connector
   * @param query {string}
   * @returns {any} the queried results
   */
  public async query(query: string, valuesToEscape?: IValuesToEscape) {
    return this.connector?.query(query, valuesToEscape, this.modelConfig);
  }
}
