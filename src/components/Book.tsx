import { Card, CardBody, Typography, Chip } from "@material-tailwind/react";
import { TBook } from "../types/book";

type Props = {
  book: TBook;
};

const Book = ({ book }: Props) => {
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
            <Chip color="blue" value={tag} key={tag} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
export default Book;
