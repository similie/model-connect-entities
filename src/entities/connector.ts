import {
  IModelEntity,
  IModelCollection,
  ISharedDataConnects,
  IQueryLimiters,
  IModelConfigurationDetails,
} from ".";

/**
 * @interface IModelConnect
 * @extends ISharedDataConnects
 * @description used only by a connector class to differentiate functionality
 * from a basic model
 */
export interface IConnectorConnect extends ISharedDataConnects {
  init: (payload?: any) => Promise<any>;
  attr: (config?: IModelConfigurationDetails) => any;
  keys: (config?: IModelConfigurationDetails) => string[];
  tearDown: () => Promise<void>;
  add: (
    value: any,
    collection: IModelCollection<IModelEntity>
  ) => Promise<void>;
  remove: (
    value: any,
    collection: IModelCollection<IModelEntity>
  ) => Promise<void>;
  saveAs: (value: any, model: IModelEntity) => Promise<IModelEntity>;
  find: (
    query: any,
    limiters: IQueryLimiters,
    config?: IModelConfigurationDetails
  ) => Promise<IModelEntity[]>;
  findOne: (
    query: any,
    limiters: IQueryLimiters,
    config?: IModelConfigurationDetails
  ) => Promise<IModelEntity>;
}
