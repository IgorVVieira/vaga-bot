import { IJob } from "../../domain/entities/job";

export interface ISearchJob {
  handle(keyWord: string): Promise<IJob[]>;
}