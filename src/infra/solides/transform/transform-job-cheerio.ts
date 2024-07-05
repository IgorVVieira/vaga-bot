import { load } from 'cheerio';

import { ITransformJobResult } from "../../../data/interfaces/transform-job-result.interface";
import { IJob } from "../../../domain/entities/job";

export class TransformJobsSolidesCheerio implements ITransformJobResult<string> {
  transform(data: string): IJob[] {

    const $ = load(data);

    const jobs: IJob[] = [];
    $('li').each((index, element) => {
      const jobTitle = $(element).find('h3').attr('title');
      const companyName = $(element).find('.flex-1').find('a').find('p').text();
      const location = $(element).find('.items-start').find('p').eq(0).text();
      const salary = $(element).find('.items-start').find('p').eq(2).text();
      const hiringForm = $(element).find('.gap-2').find('div').eq(0).text();
      const jobType = $(element).find('.gap-2').find('div').eq(2).text();
      const seniority = $(element).find('.gap-2').find('div').eq(4).text();
      const announcement = $(element).find('time').text();
      const relativeLink = $(element).find('.text-subtitle1').attr('href');

      console.log(relativeLink)

      const baseURL = 'https://vagas.solides.com.br';
      const fullLink = new URL(relativeLink as string, baseURL).toString();


      jobs.push({
        title: jobTitle as string,
        company: companyName,
        location,
        salary,
        jobType,
        seniority,
        announcement,
        hiringForm,
        link: fullLink
      })
    });

    return jobs;
  }
}