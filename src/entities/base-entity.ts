export interface IModelEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IModelCollection<T extends IModelEntity> extends Array<T> {
  // hides properties from console.log
  model: string;
  name: string;
  collection: string;
  instance: number;
  add: (value: number | T) => Promise<void>;
  remove: (value: number | T) => Promise<void>;
}

// export declare type IModel = number | IModelEntity | null;
// export declare type IModelCollection = Array<IModel> | null;
export declare type json = string | object | undefined;
/** @todo Type def from Kris Query builder code */
export declare type IQuery = object;
