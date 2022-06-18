import { IModelEntity } from "../entities";
import { ISharedDataConnects } from "./shared";

/**
 * @interface ModelApi
 * @implements Connector
 *
 * @description Expands the Connector class with the model class. Allowing for property
 * differentiation for models
 */
export interface IModelConnect<T extends IModelEntity>
  extends ISharedDataConnects {
  getId: (query: number | IModelEntity | undefined | null) => number | null;
  find: (query: any) => IQueryDecorators<T>;
  initWithId: (id: number) => IQueryPopulates<T>;
  stream: (query: any) => IQueryStreamDecorators<T>;
  toJson: (model: T) => Promise<any>;
}

export interface IQueryLimiters {
  sort?: any;
  skip?: number;
  limit?: number;
  batchNumber?: number;
  populate?: any;
}

export interface IQueryFetch<T extends IModelEntity> {
  fetch: () => Promise<T>;
}

export interface IQueryPopulates<T extends IModelEntity> {
  populate: (value: string, criteria?: T) => IQueryFetch<T>;
  populateAll: () => IQueryFetch<T>;
  fetch: () => Promise<T>;
}

export interface IQueryDecorators<T extends IModelEntity> {
  sort: (sort: string | object[] | object) => IQueryDecorators<T>;
  skip: (value: number) => IQueryDecorators<T>;
  limit: (value: number) => IQueryDecorators<T>;
  populateAll: () => IQueryDecorators<T>;
  populate: (value: string, criteria?: T) => IQueryDecorators<T>;
  fetch: () => Promise<T[]>;
  fetchOne: () => Promise<T>;
}

export interface IQueryStreamDecorators<T extends IModelEntity>
  extends IQueryDecorators<T> {
  eachRecord: (
    cb: (model: T) => Promise<any> | any
  ) => IQueryStreamDecorators<T>;
  eachBatch: (
    batchNumber: number,
    cb: (model: T[]) => Promise<any> | any
  ) => IQueryStreamDecorators<T>;
}
