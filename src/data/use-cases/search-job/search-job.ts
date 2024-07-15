import { IJob } from "../../../domain/entities/job";
import { ISearchJobProvider } from "../../interfaces/search-job-provider.interface";
import { ISearchJob } from "../../interfaces/search-job-use-case.interface";
import { ITransformJobResult } from "../../interfaces/transform-job-result.interface";

export class SearchJobUseCase<T> implements ISearchJob {
  public constructor(
    private readonly searchJobProvider: ISearchJobProvider<T>,
    private readonly transformJobProvider: ITransformJobResult<T>
  ) { }

  public async handle(keyWord: string): Promise<IJob[]> {
    const jobs = await this.searchJobProvider.search(keyWord);
    return this.transformJobProvider.transform(jobs);
  }
}