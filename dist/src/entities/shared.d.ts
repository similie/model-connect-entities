import { IModelEntity, IModelConfigurationDetails } from ".";
/**
 * @interface ISharedDataConnects
 * @description used by both the model class and connector class
 * to give a common set of functionality between the two entities;
 * Because the connector is often instantiated once. I have an extra param
 * registar to pass context to the connector class. Otherwise, it wouldn't know
 * it's modelname or other identifies required to process the transation
 */
export interface ISharedDataConnects {
    save: (values: IModelEntity, config?: IModelConfigurationDetails) => Promise<IModelEntity>;
    update: (query: any, update: any, config?: IModelConfigurationDetails) => Promise<IModelEntity[]>;
    count: (query: any, config?: IModelConfigurationDetails) => Promise<number>;
    destroy: (query: number | IModelEntity, config?: IModelConfigurationDetails) => Promise<IModelEntity>;
    destroyAll: (query: any, config?: IModelConfigurationDetails) => Promise<IModelEntity[]>;
    create: (model: IModelEntity, config?: IModelConfigurationDetails) => Promise<IModelEntity>;
    createMany: (query: IModelEntity[], config?: IModelConfigurationDetails) => Promise<IModelEntity[]>;
    raw: (config?: IModelConfigurationDetails) => any;
}