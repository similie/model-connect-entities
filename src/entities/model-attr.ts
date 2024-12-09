import { IDValue, IEntity } from './base-entity';
import {
  FindOptionsWhere,
  QueryDeepPartialEntity,
  DeepPartial,
} from './orm-entities';

export interface IAutoMigrationAttribute {
  autoIncrement: boolean;
}

export interface IModelAttributes {
  type?: 'json' | 'string' | 'number' | 'ref';
  columnType?: string;
  collection?: string;
  model?: string;
  defaultsTo?: string | number | boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  minLenght?: number;
  required?: boolean;
  unique?: boolean;
  isIn?: string[];
  allowNull?: boolean;
  through?: string;
  via?: string;
  encrypt?: boolean;
  autoIncrement?: boolean;
  autoUpdatedAt?: boolean;
  autoMigrations?: IAutoMigrationAttribute;
  array?: boolean;
  name?: string;
}

export interface IModelDestroy<t extends IEntity> {
  where?: FindOptionsWhere<t>;
  id?: IDValue;
}

export interface IModelUpdate<t extends IEntity> extends IModelDestroy<t> {
  values: Partial<t>;
}

export interface IModelUpdateValues<t extends IEntity> {
  query: FindOptionsWhere<t>;
  update: QueryDeepPartialEntity<t>;
}

export interface IModelSeekValues<t extends IEntity> {
  criteria: FindOptionsWhere<t>;
  initialValues: DeepPartial<t>;
}

export type ICountType = { count: number | null };
export type ISumType = { sum: number | null };
export type IAvgType = { avg: number | null };
