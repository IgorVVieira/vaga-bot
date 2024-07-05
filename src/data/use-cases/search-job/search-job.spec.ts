import { SearchJobUseCase } from "./search-job";

const searchJobProvider = {
  search: jest.fn()
}

const transformJobProvider = {
  transform: jest.fn()
}

beforeEach(() => {
  searchJobProvider.search.mockResolvedValue("extracted_data");
});

const makeSut = () => new SearchJobUseCase(searchJobProvider, transformJobProvider);

describe("SearchJobUseCase", () => {
  describe("handle", () => {
    it("should call searchJobProvider.search", async () => {
      const sut = makeSut();
      await sut.handle("test");

      expect(searchJobProvider.search).toHaveBeenCalled();
      expect(searchJobProvider.search).toHaveBeenCalledWith("test");
    })

    it("should call transformJobProvider.transform", async () => {
      const sut = makeSut();
      await sut.handle("test");

      expect(transformJobProvider.transform).toHaveBeenCalled();
      expect(transformJobProvider.transform).toHaveBeenCalledWith("extracted_data");
    });

    it("should throw if searchJobProvider.search throws", async () => {
      const sut = makeSut();
      searchJobProvider.search.mockResolvedValueOnce(() => { throw new Error("test") });

      try {
        await sut.handle("test");
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(transformJobProvider.transform).not.toHaveBeenCalled();
      }
    });

    it("should throw if transformJobProvider.transform throws", async () => {
      const sut = makeSut();
      transformJobProvider.transform.mockImplementation(() => { throw new Error("test") });

      try {
        await sut.handle("test");
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
  })
});