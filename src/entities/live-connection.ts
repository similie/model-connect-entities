import { IModelConfiguration } from "./config";
import { ISharedDataConnects } from "./shared";

export interface LiveConnectionConstruct
  extends IModelConfiguration,
    ISharedDataConnects {}
