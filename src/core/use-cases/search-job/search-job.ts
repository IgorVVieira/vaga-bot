import { ISearchJobGateway } from "core/gateways/search-job.gateway.interface";
import { IUseCase } from "../use-case.interface";
import { IJob } from "core/domain/entities/job";

export class SearchJobUseCase<T> implements IUseCase<T, IJob[]> {
  public constructor(
    private readonly searchJobProvider: ISearchJobGateway<T>,
  ) { }

  public async execute(filter: T): Promise<IJob[]> {
    return this.searchJobProvider.search(filter);
  }
}