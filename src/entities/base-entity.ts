/**
 * @interface
 * @name IEntity
 * @description the basic type for a base model
 */

export interface IEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export declare type IModelType<T extends IEntity> = T | number;

/**
 * @type
 * @name IModelCollection<IEntity>
 * @description describes partial attributes of a given query
 */
export declare type IEntityPartial<T extends IEntity> = {
  [A in keyof T]?: T[A];
};

/**
 * @interface
 * @name IModelCollection<IEntity>
 * @description the type for describing a collection
 */
export interface IModelCollection<T extends IEntity> extends Array<T> {
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
