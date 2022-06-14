import { LiveConnect } from "../connectors";
export declare class Connect {
    private static instance;
    static readonly SET_GLOBAL = true;
    static readonly SET_LOCAL = false;
    connection: LiveConnect;
    private constructor();
    static startInstance(Connector: LiveConnect): Connect;
    static hasConnection(): boolean;
    static getInstance(): Connect;
    get connector(): LiveConnect;
}
