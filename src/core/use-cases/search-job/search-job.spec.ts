import { SearchJobUseCase } from "./search-job";

const searchJobProvider = {
  search: jest.fn()
}

beforeEach(() => {
  searchJobProvider.search.mockResolvedValue("extracted_data");
});

const makeSut = () => new SearchJobUseCase(searchJobProvider);

describe("SearchJobUseCase", () => {
  describe("execute", () => {
    it("should call searchJobProvider.search", async () => {
      const sut = makeSut();
      await sut.execute("test");

      expect(searchJobProvider.search).toHaveBeenCalled();
      expect(searchJobProvider.search).toHaveBeenCalledWith("test");
    })

    it("should throw if searchJobProvider.search throws", async () => {
      const sut = makeSut();
      searchJobProvider.search.mockResolvedValueOnce(() => { throw new Error("test") });

      try {
        await sut.execute("test");
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  })
});