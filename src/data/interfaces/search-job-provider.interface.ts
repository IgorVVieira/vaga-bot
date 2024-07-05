export interface ISearchJobProvider<T> {
  search(keyWord: string): Promise<T>;
}