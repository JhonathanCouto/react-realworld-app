import { User } from "./user";

export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList?: string[];
  createdAt: string;
  updatedAt: string;
  favorite: boolean;
  favoritesCount: number;
  author: User;
};
