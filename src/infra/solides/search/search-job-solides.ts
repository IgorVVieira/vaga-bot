import axios, { AxiosInstance } from "axios";

import { ISearchJobProvider } from "@data/interfaces/search-job-provider.interface";
import { ISolidesJobData, ISolidesJobResponse } from "../types/solides-job-response";

export class SearchJobSolides implements ISearchJobProvider<ISolidesJobData[]> {
  private readonly api: AxiosInstance;

  public constructor() {
    this.api = axios.create({
      baseURL: 'https://apigw.solides.com.br/jobs/v3/portal-vacancies-new',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 10000,
    });
  }

  public async search(keyWord: string): Promise<ISolidesJobData[]> {
    if (keyWord.includes(' ')) {
      keyWord = keyWord.replace(' ', '+');
    }

    const { data } = await this.api.get<ISolidesJobResponse>(`?page=1&jobsType=remoto&pcd=false&title=${keyWord}&locations=&take=10`);

    if (!data.success) {
      throw new Error('Error on search jobs');
    }
    return data.data?.data || [];
  }
}