/**
 * @interface
 * @name IBaseModelEntity
 * @description the basic type for a base model
 */

export interface IBaseModelEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export declare type IModelType<T extends IBaseModelEntity> = T | number;

/**
 * @type
 * @name IModelCollection<IBaseModelEntity>
 * @description describes partial attributes of a given query
 */
export declare type IBaseModelEntityPartial<T extends IBaseModelEntity> = {
  [A in keyof T]?: T[A];
};

/**
 * @interface
 * @name IModelCollection<IBaseModelEntity>
 * @description the type for describing a collection
 */
export interface IModelCollection<T extends IBaseModelEntity> extends Array<T> {
  // hides properties from console.log
  model: string;
  name: string;
  collection: string;
  instance: number;
  addToCollection: (value: number | T) => Promise<void>;
  removeFromCollection: (value: number | T) => Promise<void>;
}

export declare type json = string | object | undefined;
export declare type IValuesToEscape = any[] | null | undefined;
