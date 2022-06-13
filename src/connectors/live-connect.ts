import { Connection } from "../connect";
import { ModelRegister, Registar } from "../connect-registers";
import { Connect } from "../connect/connect";
import { IModelEntity, IModelCollection } from "../entities";
import { IQueryLimiters } from "../models";

export interface LiveConnect extends Registar, Connection {}
export class LiveConnectRegister implements ModelRegister {
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
 * @name LiveConnectConstruct
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
export class LiveConnectConstruct implements LiveConnect {
  constructor(global?: boolean) {
    if (global === Connect.SET_GLOBAL) {
      Connect.startInstance(this);
    }
  }

  async init() {
    return null;
  }

  registration() {
    return new LiveConnectRegister();
  }

  raw(registry?: ModelRegister) {
    return null as any;
  }

  find(query: any, limiters: IQueryLimiters, registry?: ModelRegister) {
    return null as any;
  }

  findOne(query: any, limiters: IQueryLimiters, registry?: ModelRegister) {
    return null as any;
  }

  async save(values: any, registry?: ModelRegister) {
    return values;
  }

  async update(query: any, update: any, registry?: ModelRegister) {
    return query;
  }

  async count(query: any, registry?: ModelRegister) {
    return query;
  }

  async destroy(query: any, registry?: ModelRegister) {
    return query;
  }

  async create(query: any, registry?: ModelRegister) {
    return query;
  }

  async createMany(query: any[], registry?: ModelRegister) {
    return query;
  }

  async destroyAll(query: any, registry?: ModelRegister) {
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

  attr(registry?: ModelRegister) {
    return null;
  }

  keys(registry?: ModelRegister) {
    return new Array<string>();
  }

  async tearDown() {}
}
