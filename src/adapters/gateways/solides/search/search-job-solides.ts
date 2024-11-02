
import { ISolidesJobResponse } from "../types/solides-job-response";
import { ISearchJobGateway } from "core/gateways/search-job.gateway.interface";
import { solidesApi } from "@infra/http/api";
import { IJob } from "core/domain/entities/job";
import { solidesMapper } from "application/mappers/solides-mapper";
import { DateHelper } from "@utils/date-helper";

export type SearchSolidesJob = {
  keyWord: string;
  filterByDay: boolean;
}

export class SearchJobSolides implements ISearchJobGateway<SearchSolidesJob> {
  public async search(filters: SearchSolidesJob): Promise<IJob[]> {
    const { filterByDay } = filters;
    let { keyWord } = filters;
    if (keyWord.includes(' ')) {
      keyWord = keyWord.replace(' ', '+');
    }

    const { data } = await solidesApi.get<ISolidesJobResponse>(`?page=1&jobsType=remoto&pcd=false&title=${keyWord}&locations=&take=10`);

    if (!data.success) {
      throw new Error('Error on search jobs');
    }
    const jobs = data.data?.data || [];

    if (filterByDay) {
      return solidesMapper(jobs.filter((job) => DateHelper.isToday(job.createdAt as string)));
    }

    return solidesMapper(jobs);
  }
}