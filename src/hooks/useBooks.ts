import { useQuery } from "@tanstack/react-query";
import axiosClient from "../services/axios-client";
import useBooksStore from "../stores/books";
import { TBook } from "../types/book";

export function useBooks() {
  // Single Source Of Truth
  const { setBooks } = useBooksStore();

  const { data, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await axiosClient.get("/books");
      return response.data;
    },
  });

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
    books: data || [],
    isLoading,
    fetchBooks,
    deleteBook,
    addBook,
    editBook,
  };
}
