import {
  Card,
  CardBody,
  Typography,
  Chip,
  Button,
} from "@material-tailwind/react";
import { type color } from "@material-tailwind/react/types/components/chip";

import { TBook } from "../types/book";

type Props = {
  book: TBook;
  onEdit: (book: TBook) => void;
  onDelete: (book: TBook) => void;
};

const Book = ({ book, onEdit, onDelete }: Props) => {
  const handleClickEdit = () => {
    onEdit(book);
  };

  const handleClickDelete = () => {
    onDelete(book);
  };

  return (
    <Card>
      <CardBody>
        <Typography variant="small">Name: {book.name} </Typography>
        <Typography variant="small">Description: {book.description}</Typography>
        <Typography variant="small">Price: {book.price}</Typography>
        <Typography variant="small">
          Publication Year: {book.publicationDate}
        </Typography>
        <Typography variant="small">Author: {book.author}</Typography>
        <div className="flex items-center gap-2">
          <Typography variant="small">Tags:</Typography>
          {book.tags.map((tag) => (
            <Chip color={tag.color as color} value={tag.name} key={tag.id} />
          ))}
        </div>
        <div className="space-x-2">
          <Button
            size="sm"
            className="mt-4"
            color="yellow"
            onClick={handleClickEdit}
          >
            Edit
          </Button>
          <Button
            size="sm"
            className="mt-4"
            color="red"
            onClick={handleClickDelete}
          >
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
export default Book;
