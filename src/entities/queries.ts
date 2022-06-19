import { IModelEntity, IModelEntityPartial } from "./base-entity";

/**
 * @interface
 * @name ISingleQueryObject
 * @description defines the structure of the objects
 *   used to find and limit the queries
 */
export interface ISingleQueryObject<T extends IModelEntity> {
  sort?: string | object | object[];
  limit?: number;
  skip?: number;
  where?: IModelEntityPartial<T>;
}

/** @todo Type def from Kris Query builder code */
export declare type IQuery = object;

export declare type IQueryOrPartial<T extends IModelEntity> =
  | ISingleQueryObject<T>
  | IModelEntityPartial<T>;
