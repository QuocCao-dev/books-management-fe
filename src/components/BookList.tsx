import { Spinner } from "@material-tailwind/react";
import { TBook } from "../types/book";
import Book from "./Book";

type Props = {
  books: TBook[];
  loading?: boolean;
};

const BookList = ({ books, loading }: Props) => {
  return (
    <div className="space-y-2">
      {loading ? (
        <Spinner />
      ) : (
        books &&
        books.length > 0 &&
        books.map((book) => <Book key={book.id} book={book} />)
      )}
    </div>
  );
};

export default BookList;
