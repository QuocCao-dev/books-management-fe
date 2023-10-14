import { create } from "zustand";
import { TBook } from "../types/book";

type BooksStoreState = {
  books: TBook[];
};

type BooksStoreActions = {
  setBooks: (book: TBook[]) => void;
};

const useBooksStore = create<BooksStoreState & BooksStoreActions>((set) => ({
  books: [],
  setBooks: (books: TBook[]) => {
    set({ books });
  },
}));

export default useBooksStore;
