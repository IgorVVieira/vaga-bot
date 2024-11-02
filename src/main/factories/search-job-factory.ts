import { SearchJobSolides, SearchSolidesJob } from "adapters/gateways/solides/search/search-job-solides";
import { Provider } from "core/domain/entities/providers";
import { SearchJobUseCase } from "core/use-cases/search-job/search-job";

export const searchJobFactory = (provider: Provider): SearchJobUseCase<SearchSolidesJob> => {
  switch (provider) {
    case Provider.SOLIDES:
      return new SearchJobUseCase(new SearchJobSolides());
    default:
      throw new Error('Provider not found');
  }
}