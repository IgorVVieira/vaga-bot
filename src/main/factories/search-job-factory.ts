import { SearchJobUseCase } from "../../data/use-cases/search-job/search-job";
import { Provider } from "../../domain/entities/providers";
import { SearchJobSolides } from "../../infra/solides/search/search-job-solides";
import { TransformJobsSolidesCheerio } from "../../infra/solides/transform/transform-job-cheerio";

export class SearchJobFactory {
  public static create(provider: Provider): SearchJobUseCase {
    switch (provider) {
      case Provider.SOLIDES:
        return new SearchJobUseCase(new SearchJobSolides(), new TransformJobsSolidesCheerio());
      default:
        throw new Error('Provider not found');
    }
  }
}