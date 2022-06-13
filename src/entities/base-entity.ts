export interface IModelEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// export declare type IModel = number | IModelEntity | null;
// export declare type IModelCollection = Array<IModel> | null;
export declare type json = string | object | undefined;
/** @todo Type def from Kris Query builder code */
export declare type IQuery = object;
