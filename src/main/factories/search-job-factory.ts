import { SearchJobUseCase } from "@data/use-cases/search-job/search-job";
import { Provider } from "@domain/entities/providers";
import { SearchJobSolides } from "@infra/solides/search/search-job-solides";
import { TransformJobsSolidesApi } from "@infra/solides/transform/transform-jobs-api";
import { ISolidesJobData } from "@infra/solides/types/solides-job-response";

export const searchJobFactory = (provider: Provider): SearchJobUseCase<ISolidesJobData[]> => {
  switch (provider) {
    case Provider.SOLIDES:
      return new SearchJobUseCase(new SearchJobSolides(), new TransformJobsSolidesApi());
    default:
      throw new Error('Provider not found');
  }
}