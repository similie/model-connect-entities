import { Registar, ModelRegister } from "../connect-registers";
import { Connection } from "../connect";
import { IModelCollection } from "../structures";
import { IModelEntity } from "../entities";
import { IQueryLimiters } from "../../models";
export interface LiveConnect extends Registar, Connection {
}
export declare class LiveConnectRegister implements ModelRegister {
    _name: string;
    constructor();
    get modelname(): string;
    set modelname(modelname: string);
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
export declare class LiveConnectConstruct implements LiveConnect {
    constructor(global?: boolean);
    init(): Promise<null>;
    registration(): LiveConnectRegister;
    raw(registry?: ModelRegister): any;
    find(query: any, limiters: IQueryLimiters, registry?: ModelRegister): any;
    findOne(query: any, limiters: IQueryLimiters, registry?: ModelRegister): any;
    save(values: any, registry?: ModelRegister): Promise<any>;
    update(query: any, update: any, registry?: ModelRegister): Promise<any>;
    count(query: any, registry?: ModelRegister): Promise<any>;
    destroy(query: any, registry?: ModelRegister): Promise<any>;
    create(query: any, registry?: ModelRegister): Promise<any>;
    createMany(query: any[], registry?: ModelRegister): Promise<any[]>;
    destroyAll(query: any, registry?: ModelRegister): Promise<any>;
    add(value: any, collection: IModelCollection<IModelEntity>): Promise<void>;
    remove(value: any, collection: IModelCollection<IModelEntity>): Promise<void>;
    saveAs(value: any, model: IModelEntity): Promise<IModelEntity>;
    attr(registry?: ModelRegister): null;
    keys(registry?: ModelRegister): string[];
    tearDown(): Promise<void>;
}
