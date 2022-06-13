import { IModelEntity } from "../entities";
export interface IModelCollection<T extends IModelEntity> extends Array<T> {
    model: string;
    name: string;
    collection: string;
    instance: number;
    add: (value: number | T) => Promise<void>;
    remove: (value: number | T) => Promise<void>;
}
export declare function getId(query: number | any | undefined | null): number | null;
