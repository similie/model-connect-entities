/**
 * @interface
 * @name IEntity
 * @description the basic type for a base model
 */
export type UUID = `${string}-${string}-${string}-${string}-${string}`;
export type IDValue = number | number[] | UUID | UUID[];

export interface IEntity {
  id: IDValue;
  createdAt: Date;
  updatedAt: Date;
}

export declare type IModelType<T extends IEntity> = T | number;

export declare type IContentsSubQuery = {
  contains: string;
  startsWith: string;
  endsWith: string;
  '>': number;
  '>=': number;
  '<': number;
  '<=': number;
  between: number[] | Date[] | IBetweenQuery;
  or: IQueryElements[];
};

export interface IQueryElements extends Partial<IContentsSubQuery> {
  in: string[] | number[];
}

/**
 * @type
 * @name IEntityPartial<IEntity>
 * @description describes partial attributes of a given query
 */
export declare type IEntityPartial<T extends IEntity> = {
  [A in keyof T]?: T[A] | Partial<IContentsSubQuery>;
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
  addToCollection: (value: number | IEntity) => Promise<void | IEntity>;
  removeFromCollection: (value: number | IEntity) => Promise<void | IEntity>;
}

export declare type json = string | object | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export declare type IValuesToEscape = any[] | null | undefined;

export interface IBetweenQuery {
  from: number | Date;
  to: number | Date;
}

export type IQueryBaseType<T extends IEntity> = {
  [P in keyof T]?: T[P] | T[P][] | Partial<IQueryElements>;
};
