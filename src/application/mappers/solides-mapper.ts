import { ISolidesJobData } from "adapters/gateways/solides/types/solides-job-response";
import { IJob } from "core/domain/entities/job";

export const solidesMapper = (solidesJob: ISolidesJobData[]): IJob[] => {
  return solidesJob.map((job: ISolidesJobData) => {
    const salary = job.salary?.initialRange || job.salary?.finalRange;
    return {
      title: job.title as string,
      company: job.companyName as string,
      location: `${job.city?.name} - ${job.state?.name}`,
      salary: salary ? `R$ ${salary}` : 'Não informado',
      jobType: job.jobType as string,
      seniority: 'junior',
      announcement: job.createdAt as string,
      hiringForm: 'Remoto',
      link: job.redirectLink as string
    }
  });
}