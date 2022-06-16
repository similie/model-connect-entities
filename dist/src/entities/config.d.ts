export interface IModelConfigurationDetails {
    url?: string;
    modelname?: string;
    database?: string;
    type?: string;
    port?: number;
    connection?: any;
}
export interface IModelConfiguration {
    modelConfig: IModelConfigurationDetails;
}
