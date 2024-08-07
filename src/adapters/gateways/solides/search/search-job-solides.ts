
import { ISolidesJobResponse } from "../types/solides-job-response";
import { ISearchJobGateway } from "core/gateways/search-job.gateway.interface";
import { solidesApi } from "@infra/http/api";
import { IJob } from "core/domain/entities/job";
import { solidesMapper } from "application/mappers/solides-mapper";

export class SearchJobSolides implements ISearchJobGateway<string> {

  public async search(keyWord: string): Promise<IJob[]> {
    if (keyWord.includes(' ')) {
      keyWord = keyWord.replace(' ', '+');
    }

    const { data } = await solidesApi.get<ISolidesJobResponse>(`?page=1&jobsType=remoto&pcd=false&title=${keyWord}&locations=&take=10`);

    if (!data.success) {
      throw new Error('Error on search jobs');
    }
    const jobs = data.data?.data || [];

    return solidesMapper(jobs);
  }
}