import { TTag } from "./tag";

export type TBook = {
  id: string;
  name: string;
  description: string;
  price: number;
  publicationDate: string;
  author: string;
  tags: TTag[];
};
