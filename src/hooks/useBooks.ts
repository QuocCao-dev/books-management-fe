import axiosClient from "../services/axios-client";
import useBooksStore from "../stores/books";
import { TBook } from "../types/book";

export function useBooks() {
  // Single Source Of Truth
  const { books, setBooks } = useBooksStore();

  const fetchBooks = async () => {
    const response = await axiosClient.get("/books");
    setBooks(response.data);
  };

  const addBook = async (book: any) => {
    await axiosClient.post("/books", book);
    await fetchBooks();
  };

  const editBook = async (id: string, book: any) => {
    await axiosClient.patch(`/books/${id}`, book);
    await fetchBooks();
  };

  const deleteBook = async (book: TBook) => {
    await axiosClient.delete(`/books/${book.id}`);
    await fetchBooks();
  };

  return {
    books,
    fetchBooks,
    deleteBook,
    addBook,
    editBook,
  };
}
