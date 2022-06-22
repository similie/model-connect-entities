import { IBaseModelEntity, IModelConfigurationDetails } from ".";
import { IBaseModelEntityPartial, IValuesToEscape } from "./base-entity";
import { IQueryOrPartial } from "./queries";
/**
 * @interface ISharedDataConnects
 * @description used by both the model class and connector class
 * to give a common set of functionality between the two entities;
 * Because the connector is often instantiated once. I have an extra param
 * registar to pass context to the connector class. Otherwise, it wouldn't know
 * it's modelname or other identifies required to process the transation
 */
export interface ISharedDataConnects<T extends IBaseModelEntity> {
    save: (values: T, config?: IModelConfigurationDetails) => Promise<T>;
    update: (query: IQueryOrPartial<T>, update: IBaseModelEntityPartial<T>, config?: IModelConfigurationDetails) => Promise<T[]>;
    count: (query: IQueryOrPartial<T>, config?: IModelConfigurationDetails) => Promise<number>;
    destroy: (query: number | IBaseModelEntityPartial<T>, config?: IModelConfigurationDetails) => Promise<T>;
    destroyAll: (query: IQueryOrPartial<T>, config?: IModelConfigurationDetails) => Promise<T[]>;
    create: (model: IBaseModelEntityPartial<T>, config?: IModelConfigurationDetails) => Promise<T>;
    createMany: (query: IBaseModelEntityPartial<T>[], config?: IModelConfigurationDetails) => Promise<T[]>;
    raw: (config?: IModelConfigurationDetails) => any;
    findOrCreate: (criteria: IQueryOrPartial<T>, initialsValues: IBaseModelEntityPartial<T>, config?: IModelConfigurationDetails) => Promise<T>;
    sum: (numericAttrName: keyof T, criteria?: IQueryOrPartial<T>, config?: IModelConfigurationDetails) => Promise<number>;
    avg: (numericAttrName: keyof T, criteria?: IQueryOrPartial<T>, config?: IModelConfigurationDetails) => Promise<number>;
    query: (nativeQuery: string, valuesToEscape?: IValuesToEscape, config?: IModelConfigurationDetails) => Promise<any>;
}
