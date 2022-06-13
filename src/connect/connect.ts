import { LiveConnect } from "../connectors";

export class Connect {
  private static instance: Connect;
  public static readonly SET_GLOBAL = true;
  public static readonly SET_LOCAL = false;
  connection: LiveConnect;
  private constructor(Connector: LiveConnect) {
    this.connection = Connector;
  }

  public static startInstance(Connector: LiveConnect): Connect {
    if (!Connect.instance) {
      Connect.instance = new Connect(Connector);
    }

    return Connect.instance;
  }

  public static hasConnection(): boolean {
    return !!Connect.instance;
  }

  public static getInstance(): Connect {
    if (!Connect.instance) {
      throw new Error("A connection has not been initialized");
    }
    return Connect.instance;
  }

  get connector(): LiveConnect {
    return this.connection;
  }
}
