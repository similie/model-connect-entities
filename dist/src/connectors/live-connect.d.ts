import { IEntity, IModelCollection, IQueryLimiters, LiveConnectionConstruct, IModelConfigurationDetails, IQueryOrPartial, IEntityPartial, IValuesToEscape, IModelAttributes, ISumType, IAvgType } from '../entities';
export declare class LiveConnectConfig implements IModelConfigurationDetails {
    private _name;
    constructor();
    get modelname(): string;
    set modelname(modelname: string);
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
export declare abstract class LiveConnection implements LiveConnectionConstruct {
    constructor(global?: boolean);
    getId(query: number | any | undefined | null): number | null;
    get modelConfig(): LiveConnectConfig;
    abstract init(): Promise<any>;
    abstract raw(config?: IModelConfigurationDetails): any;
    abstract find(query: any, limiters: IQueryLimiters, config?: IModelConfigurationDetails): Promise<IEntity[]>;
    abstract findOne(query: any, limiters: IQueryLimiters, config?: IModelConfigurationDetails): Promise<IEntity>;
    abstract save(values: any, config?: IModelConfigurationDetails): Promise<IEntity>;
    abstract update(query: any, update: any, config?: IModelConfigurationDetails): Promise<IEntity[]>;
    abstract count(query: any, config?: IModelConfigurationDetails): Promise<number>;
    abstract destroy(query: any, config?: IModelConfigurationDetails): Promise<IEntity>;
    abstract create(query: any, config?: IModelConfigurationDetails): Promise<IEntity>;
    abstract createMany(query: any[], config?: IModelConfigurationDetails): Promise<IEntity[]>;
    abstract destroyAll(query: any, config?: IModelConfigurationDetails): Promise<IEntity[]>;
    abstract addToCollection(value: any, collection: IModelCollection<IEntity>): Promise<void | IEntity>;
    abstract removeFromCollection(value: any, collection: IModelCollection<IEntity>): Promise<void | IEntity>;
    abstract attr(config?: IModelConfigurationDetails): Promise<Record<string, IModelAttributes>>;
    abstract keys(config?: IModelConfigurationDetails): string[];
    abstract sum(numericAttrName: keyof IEntity, criteria?: IQueryOrPartial<IEntity>, config?: IModelConfigurationDetails): Promise<ISumType>;
    abstract avg(numericAttrName: keyof IEntity, criteria?: IQueryOrPartial<IEntity>, config?: IModelConfigurationDetails): Promise<IAvgType>;
    abstract findOrCreate(criteria: IQueryOrPartial<IEntity>, initialsValues: IEntityPartial<IEntity>, config?: IModelConfigurationDetails): Promise<IEntity>;
    abstract streamEach(query: IQueryOrPartial<IEntity>, limiters: IQueryLimiters, config: IModelConfigurationDetails, cb: (model: IEntity) => Promise<void> | void): Promise<void>;
    abstract streamBatch(query: IQueryOrPartial<IEntity>, limiters: IQueryLimiters, config: IModelConfigurationDetails, cb: (model: IEntity[]) => Promise<void> | void): Promise<void>;
    abstract tearDown(): Promise<void>;
    abstract query(query: string, valuesToEscape?: IValuesToEscape, config?: IModelConfigurationDetails): Promise<any>;
}
