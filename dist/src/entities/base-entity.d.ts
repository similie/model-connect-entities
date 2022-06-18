export interface IModelEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface IModelCollection<T extends IModelEntity> extends Array<T> {
    model: string;
    name: string;
    collection: string;
    instance: number;
    addToCollection: (value: number | T) => Promise<void>;
    removeFromCollection: (value: number | T) => Promise<void>;
}
export declare type json = string | object | undefined;
/** @todo Type def from Kris Query builder code */
export declare type IQuery = object;
