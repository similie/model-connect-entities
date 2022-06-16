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
}

export interface IQueryLimiters {
  sort?: any;
  skip?: number;
  limit?: number;
  populate?: string;
}

export interface IQueryFetch<T extends IModelEntity> {
  fetch: () => Promise<T>;
}

export interface IQueryPopulates<T extends IModelEntity> {
  populate: (value: string) => IQueryFetch<T>;
  populateAll: () => IQueryFetch<T>;
  fetch: () => Promise<T>;
}

export interface IQueryDecorators<T extends IModelEntity> {
  sort: (sort: string | object[] | object) => IQueryDecorators<T>;
  skip: (value: number) => IQueryDecorators<T>;
  limit: (value: number) => IQueryDecorators<T>;
  populateAll: () => IQueryDecorators<T>;
  populate: (value: string) => IQueryDecorators<T>;
  fetch: () => Promise<T[]>;
  fetchOne: () => Promise<T>;
}
