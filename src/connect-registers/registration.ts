export interface ModelRegister {
  url?: string;
  modelname?: string;
  database?: string;
  type?: string;
  port?: number;
  connection?: any;
}

export interface Registar {
  registration: () => ModelRegister;
}
