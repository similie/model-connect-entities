import { IBatchreport } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class BatchReport extends Model<IBatchreport> {
    constructor(connector?: LiveConnectionConstruct);
}