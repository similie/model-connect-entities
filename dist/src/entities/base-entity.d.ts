/**
 * @interface
 * @name IModelEntity
 * @description the basic type for a base model
 */
export interface IModelEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * @type
 * @name IModelCollection<IModelEntity>
 * @description describes partial attributes of a given query
 */
export declare type IModelEntityPartial<T extends IModelEntity> = {
    [A in keyof T]?: T[A];
};
/**
 * @interface
 * @name IModelCollection<IModelEntity>
 * @description the type for describing a collection
 */
export interface IModelCollection<T extends IModelEntity> extends Array<T> {
    model: string;
    name: string;
    collection: string;
    instance: number;
    addToCollection: (value: number | T) => Promise<void>;
    removeFromCollection: (value: number | T) => Promise<void>;
}
export declare type json = string | object | undefined;
export declare type IValuesToEscape = any[] | null | undefined;
