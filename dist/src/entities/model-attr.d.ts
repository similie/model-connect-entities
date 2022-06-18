export interface IAutoMigrationAttribute {
    autoIncrement: boolean;
}
export interface IModelAttributes {
    type?: "json" | "string" | "number" | "ref";
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
}
