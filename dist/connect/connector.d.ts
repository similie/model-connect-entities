import { ModelRegister } from "../connect-registers/registration";
import { IModelEntity } from "../entities";
import { IQueryLimiters } from "../models";
import { IModelCollection } from "../structures";
/**
 * @interface Connector
 * @description used by both the model class and connector class
 * to give a common set of functionality between the two entities;
 * Because the connector is often instantiated once. I have an extra param
 * registar to pass context to the connector class. Otherwise, it wouldn't know
 * it's modelname or other identifies required to process the transation
 */
export interface Connector {
    save: (values: IModelEntity, registry?: ModelRegister) => Promise<IModelEntity>;
    update: (query: any, update: any, registry?: ModelRegister) => Promise<IModelEntity[]>;
    count: (query: any, registry?: ModelRegister) => Promise<number>;
    destroy: (query: number | IModelEntity, registry?: ModelRegister) => Promise<IModelEntity>;
    destroyAll: (query: any, registry?: ModelRegister) => Promise<IModelEntity[]>;
    create: (model: IModelEntity, registry?: ModelRegister) => Promise<IModelEntity>;
    createMany: (query: IModelEntity[], registry?: ModelRegister) => Promise<IModelEntity[]>;
    raw: (registry?: ModelRegister) => any;
}
/**
 * @interface Connection
 * @extends Connector
 * @description used only by a connector class to differentiate functionality
 * from a basic model
 */
export interface Connection extends Connector {
    init: (payload?: any) => Promise<any>;
    attr: (registry?: ModelRegister) => any;
    keys: (registry?: ModelRegister) => string[];
    tearDown: () => Promise<void>;
    add: (value: any, collection: IModelCollection<IModelEntity>) => Promise<void>;
    remove: (value: any, collection: IModelCollection<IModelEntity>) => Promise<void>;
    saveAs: (value: any, model: IModelEntity) => Promise<IModelEntity>;
    find: (query: any, limiters: IQueryLimiters, registry?: ModelRegister) => Promise<IModelEntity[]>;
    findOne: (query: any, limiters: IQueryLimiters, registry?: ModelRegister) => Promise<IModelEntity>;
}
