import {
  IModelEntity,
  IModelCollection,
  IQueryLimiters,
  LiveConnectionConstruct,
  IModelConfigurationDetails,
} from "../entities";

import { GlobalConnection } from "../glabal-connect";

export class LiveConnectRegister implements IModelConfigurationDetails {
  _name: string;
  constructor() {
    this._name = "";
  }
  get modelname(): string {
    return this._name;
  }

  set modelname(modelname) {
    this._name = modelname;
  }
}

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
export class LiveConnection implements LiveConnectionConstruct {
  constructor(global?: boolean) {
    if (global === GlobalConnection.SET_GLOBAL) {
      GlobalConnection.startInstance(this);
    }
  }

  async init() {
    return null;
  }

  registration() {
    return new LiveConnectRegister();
  }

  raw(config?: IModelConfigurationDetails) {
    return null as any;
  }

  find(
    query: any,
    limiters: IQueryLimiters,
    config?: IModelConfigurationDetails
  ) {
    return null as any;
  }

  findOne(
    query: any,
    limiters: IQueryLimiters,
    config?: IModelConfigurationDetails
  ) {
    return null as any;
  }

  async save(values: any, config?: IModelConfigurationDetails) {
    return values;
  }

  async update(query: any, update: any, config?: IModelConfigurationDetails) {
    return query;
  }

  async count(query: any, config?: IModelConfigurationDetails) {
    return query;
  }

  async destroy(query: any, config?: IModelConfigurationDetails) {
    return query;
  }

  async create(query: any, config?: IModelConfigurationDetails) {
    return query;
  }

  async createMany(query: any[], config?: IModelConfigurationDetails) {
    return query;
  }

  async destroyAll(query: any, config?: IModelConfigurationDetails) {
    return query;
  }

  async add(
    value: any,
    collection: IModelCollection<IModelEntity>
  ): Promise<void> {}

  async remove(
    value: any,
    collection: IModelCollection<IModelEntity>
  ): Promise<void> {}

  async saveAs(value: any, model: IModelEntity) {
    return model;
  }

  attr(config?: IModelConfigurationDetails) {
    return null;
  }

  keys(config?: IModelConfigurationDetails) {
    return new Array<string>();
  }

  async tearDown() {}
}
