import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { TBook } from "../types/book";
import Book from "./Book";

const BookList = () => {
  const [books, setBooks] = useState<TBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async () => {
    setIsLoading(true);
    const response = await axios.get("http://localhost:4200/api/books");
    setBooks(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="space-y-2">
      {isLoading ? (
        <Spinner />
      ) : (
        books.map((book) => <Book key={book.id} book={book} />)
      )}
    </div>
  );
};

export default BookList;
