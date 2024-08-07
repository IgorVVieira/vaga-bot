import { IJob } from "core/domain/entities/job";

export interface ISearchJobGateway<T> {
  search(input: T): Promise<IJob[]>;
}