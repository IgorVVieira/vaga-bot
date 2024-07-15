import { ITransformJobResult } from "@data/interfaces/transform-job-result.interface";
import { ISolidesJobData } from "../types/solides-job-response";
import { IJob } from "@domain/entities/job";

export class TransformJobsSolidesApi implements ITransformJobResult<ISolidesJobData[]> {
  public transform(data: ISolidesJobData[]): IJob[] {
    return data.map((job: ISolidesJobData) => {
      return {
        title: job.title as string,
        company: job.companyName as string,
        location: `${job.city?.name} - ${job.state?.name}`,
        salary: 'R$ ' + job.salary?.initialRange,
        jobType: job.jobType as string,
        seniority: 'junior',
        announcement: job.createdAt as string,
        hiringForm: 'Remoto',
        link: job.redirectLink as string
      }
    });
  }
}