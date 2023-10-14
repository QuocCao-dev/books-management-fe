import { create } from "zustand";
import { TBook } from "../types/book";

type BookStoreState = {
  selectedBook: TBook | null;
};

type BookStoreActions = {
  setSelectedBook: (book: TBook) => void;
};

const useBookStore = create<BookStoreState & BookStoreActions>((set) => ({
  selectedBook: null,
  setSelectedBook: (book: TBook) => {
    set({ selectedBook: book });
  },
}));

export default useBookStore;
