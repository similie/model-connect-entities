/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IEntity,
  IModelCollection,
  IQueryLimiters,
  LiveConnectionConstruct,
  IModelConfigurationDetails,
  IQueryOrPartial,
  IEntityPartial,
  IValuesToEscape,
  IModelAttributes,
  ISumType,
  IAvgType,
} from '../entities';

import { GlobalConnection } from '../global-connect';
import { getId } from '../utils';

export class LiveConnectConfig implements IModelConfigurationDetails {
  private _name: string;
  public constructor() {
    this._name = '';
  }
  public get modelname(): string {
    return this._name;
  }

  public set modelname(modelname) {
    this._name = modelname;
  }
}

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
export abstract class LiveConnection implements LiveConnectionConstruct {
  public constructor(global?: boolean) {
    if (global === GlobalConnection.SET_GLOBAL) {
      GlobalConnection.startInstance(this);
    }
  }

  public getId(query: number | any | undefined | null) {
    return getId(query);
  }

  public get modelConfig() {
    return new LiveConnectConfig();
  }

  public abstract init(): Promise<any>;

  public abstract raw(config?: IModelConfigurationDetails): any;

  public abstract find(
    query: any,
    limiters: IQueryLimiters,
    config?: IModelConfigurationDetails,
  ): Promise<IEntity[]>;

  public abstract findOne(
    query: any,
    limiters: IQueryLimiters,
    config?: IModelConfigurationDetails,
  ): Promise<IEntity>;

  public abstract save(
    values: any,
    config?: IModelConfigurationDetails,
  ): Promise<IEntity>;

  public abstract update(
    query: any,
    update: any,
    config?: IModelConfigurationDetails,
  ): Promise<IEntity[]>;

  public abstract count(
    query: any,
    config?: IModelConfigurationDetails,
  ): Promise<number>;

  public abstract destroy(
    query: any,
    config?: IModelConfigurationDetails,
  ): Promise<IEntity>;

  public abstract create(
    query: any,
    config?: IModelConfigurationDetails,
  ): Promise<IEntity>;

  public abstract createMany(
    query: any[],
    config?: IModelConfigurationDetails,
  ): Promise<IEntity[]>;

  public abstract destroyAll(
    query: any,
    config?: IModelConfigurationDetails,
  ): Promise<IEntity[]>;

  public abstract addToCollection(
    value: any,
    collection: IModelCollection<IEntity>,
  ): Promise<void | IEntity>;

  public abstract removeFromCollection(
    value: any,
    collection: IModelCollection<IEntity>,
  ): Promise<void | IEntity>;

  public abstract attr(
    config?: IModelConfigurationDetails,
  ): Promise<Record<string, IModelAttributes>>;

  public abstract keys(config?: IModelConfigurationDetails): string[];

  public abstract sum(
    numericAttrName: keyof IEntity,
    criteria?: IQueryOrPartial<IEntity>,
    config?: IModelConfigurationDetails,
  ): Promise<ISumType>;

  public abstract avg(
    numericAttrName: keyof IEntity,
    criteria?: IQueryOrPartial<IEntity>,
    config?: IModelConfigurationDetails,
  ): Promise<IAvgType>;

  public abstract findOrCreate(
    criteria: IQueryOrPartial<IEntity>,
    initialsValues: IEntityPartial<IEntity>,
    config?: IModelConfigurationDetails,
  ): Promise<IEntity>;

  public abstract streamEach(
    query: IQueryOrPartial<IEntity>,
    limiters: IQueryLimiters,
    config: IModelConfigurationDetails,
    cb: (model: IEntity) => Promise<void> | void,
  ): Promise<void>;

  public abstract streamBatch(
    query: IQueryOrPartial<IEntity>,
    limiters: IQueryLimiters,
    config: IModelConfigurationDetails,
    cb: (model: IEntity[]) => Promise<void> | void,
  ): Promise<void>;

  public abstract tearDown(): Promise<void>;

  public abstract query(
    query: string,
    valuesToEscape?: IValuesToEscape,
    config?: IModelConfigurationDetails,
  ): Promise<any>;
}
