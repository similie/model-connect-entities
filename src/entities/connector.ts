import {
  IModelEntity,
  IModelCollection,
  ISharedDataConnects,
  IQueryLimiters,
  IModelConfigurationDetails,
} from ".";
import { IModelAttributes } from "./model-attr";

/**
 * @interface IModelConnect
 * @extends ISharedDataConnects
 * @description used only by a connector class to differentiate functionality
 * from a basic model
 */
export interface IConnectorConnect extends ISharedDataConnects {
  init: (payload?: any) => Promise<any>;
  attr: (
    config?: IModelConfigurationDetails
  ) => Record<string, IModelAttributes>;
  keys: (config?: IModelConfigurationDetails) => string[];
  tearDown: () => Promise<void>;
  addToCollection: (
    value: any,
    collection: IModelCollection<IModelEntity>
  ) => Promise<void>;
  removeFromCollection: (
    value: any,
    collection: IModelCollection<IModelEntity>
  ) => Promise<void>;
  find: (
    query: any,
    limiters: IQueryLimiters,
    config: IModelConfigurationDetails
  ) => Promise<IModelEntity[]>;
  findOne: (
    query: any,
    limiters: IQueryLimiters,
    config: IModelConfigurationDetails
  ) => Promise<IModelEntity>;
  streamEach: (
    query: IModelEntity,
    limiters: IQueryLimiters,
    config: IModelConfigurationDetails,
    cb: (model: IModelEntity) => Promise<void> | void
  ) => Promise<void>;
  streamBatch: (
    query: IModelEntity,
    limiters: IQueryLimiters,
    config: IModelConfigurationDetails,
    cb: (model: IModelEntity) => Promise<void> | void
  ) => Promise<void>;
}
