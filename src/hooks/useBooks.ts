import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../services/axios-client";
import { TBook } from "../types/book";

export function useBooks() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await axiosClient.get("/books");
      return response.data;
    },
  });

  const addBookMutation = useMutation({
    mutationFn: async (book: any) => {
      return axiosClient.post("/books", book);
    },
    // onSuccess: mutationFn => Promise fulfilled
    onSuccess: async () => {
      queryClient.invalidateQueries(["books"]);
    },
    // onError: mutationFn => Promise rejected
    onError: async () => {
      console.log("onError");
    },
  });

  const deleteBookMutation = useMutation({
    mutationFn: async (book: TBook) => {
      return axiosClient.delete(`/books/${book.id}`);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(["books"]);
    },
  });

  const editBook = async (id: string, book: any) => {
    await axiosClient.patch(`/books/${id}`, book);
  };

  return {
    books: data || [],
    isLoading,
    addBookMutation,
    deleteBookMutation,

    editBook,
  };
}
