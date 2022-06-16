import { IModelEntity, IModelCollection, IQueryLimiters, LiveConnectionConstruct, IModelConfigurationDetails } from "../entities";
export declare class LiveConnectConfig implements IModelConfigurationDetails {
    _name: string;
    constructor();
    get modelname(): string;
    set modelname(modelname: string);
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
export declare class LiveConnection implements LiveConnectionConstruct {
    constructor(global?: boolean);
    init(): Promise<null>;
    get modelConfig(): LiveConnectConfig;
    raw(config?: IModelConfigurationDetails): any;
    find(query: any, limiters: IQueryLimiters, config?: IModelConfigurationDetails): any;
    findOne(query: any, limiters: IQueryLimiters, config?: IModelConfigurationDetails): any;
    save(values: any, config?: IModelConfigurationDetails): Promise<any>;
    update(query: any, update: any, config?: IModelConfigurationDetails): Promise<any>;
    count(query: any, config?: IModelConfigurationDetails): Promise<any>;
    destroy(query: any, config?: IModelConfigurationDetails): Promise<any>;
    create(query: any, config?: IModelConfigurationDetails): Promise<any>;
    createMany(query: any[], config?: IModelConfigurationDetails): Promise<any[]>;
    destroyAll(query: any, config?: IModelConfigurationDetails): Promise<any>;
    add(value: any, collection: IModelCollection<IModelEntity>): Promise<void>;
    remove(value: any, collection: IModelCollection<IModelEntity>): Promise<void>;
    saveAs(value: any, model: IModelEntity): Promise<IModelEntity>;
    attr(config?: IModelConfigurationDetails): null;
    keys(config?: IModelConfigurationDetails): string[];
    tearDown(): Promise<void>;
}
