import { IJob } from "../../domain/entities/job";

export interface ITransformJobResult<T> {
  transform(data: T): Promise<IJob[]>;
}