import { Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axiosClient from "../services/axios-client";
import { TBook } from "../types/book";
import Book from "./Book";
import { useLoading } from "../hooks/useLoading";

const BookList = () => {
  const [books, setBooks] = useState<TBook[]>([]);
  const [loading, { showLoading, hideLoading }] = useLoading();

  const fetchBooks = async () => {
    showLoading();
    const response = await axiosClient.get("/books");
    setBooks(response.data);
    hideLoading();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="space-y-2">
      {loading ? (
        <Spinner />
      ) : (
        books.map((book) => <Book key={book.id} book={book} />)
      )}
    </div>
  );
};

export default BookList;
