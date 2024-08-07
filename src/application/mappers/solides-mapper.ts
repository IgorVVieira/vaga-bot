import { ISolidesJobData } from "adapters/gateways/solides/types/solides-job-response";
import { IJob } from "core/domain/entities/job";

export const solidesMapper = (solidesJob: ISolidesJobData[]): IJob[] => {
  return solidesJob.map((job: ISolidesJobData) => {
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