import { Spinner } from "@material-tailwind/react";
import { TBook } from "../types/book";
import Book from "./Book";

type Props = {
  books: TBook[];
  loading: boolean;
  onEdit: (book: TBook) => void;
  onDelete: (book: TBook) => void;
};

const BookList = ({ books, loading, onEdit, onDelete }: Props) => {
  return (
    <div className="space-y-2">
      {loading ? (
        <Spinner />
      ) : (
        books.map((book) => (
          <Book key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};

export default BookList;
