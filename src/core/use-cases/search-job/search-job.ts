import { ISearchJobGateway } from "core/gateways/search-job.gateway.interface";
import { IUseCase } from "../use-case.interface";
import { IJob } from "core/domain/entities/job";

export class SearchJobUseCase<T> implements IUseCase<string, IJob[]> {
  public constructor(
    private readonly searchJobProvider: ISearchJobGateway<T>,
  ) { }

  public async execute(keyWord: string): Promise<IJob[]> {
    return this.searchJobProvider.search(keyWord as T);
  }
}