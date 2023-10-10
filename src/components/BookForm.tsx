import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState } from "react";
import axiosClient from "../services/axios-client";

type Props = {
  onCancel: () => void;
  onFetchBooks: () => void;
};

const BookForm = ({ onCancel, onFetchBooks }: Props) => {
  const [bookForm, setBookForm] = useState({
    name: "",
    description: "",
    price: "0",
    publicationDate: "",
    author: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      ...bookForm,
      price: +bookForm.price,
    };

    await axiosClient.post("/books", data);
    onFetchBooks();
  };

  return (
    <Card className="p-4">
      <Typography variant="h4" color="blue-gray">
        Book Form
      </Typography>

      <form className="max-w-screen-lg mt-8 mb-2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 mb-4">
          <Input
            label="Book Name"
            variant="outlined"
            crossOrigin={true}
            value={bookForm.name}
            onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })}
          />
          <Textarea
            label="Description"
            variant="outlined"
            value={bookForm.description}
            onChange={(e) =>
              setBookForm({ ...bookForm, description: e.target.value })
            }
          />
          <Input
            label="Price"
            variant="outlined"
            crossOrigin={true}
            value={bookForm.price}
            onChange={(e) =>
              setBookForm({ ...bookForm, price: e.target.value })
            }
          />
          <Input
            label="Author"
            variant="outlined"
            crossOrigin={true}
            value={bookForm.author}
            onChange={(e) =>
              setBookForm({ ...bookForm, author: e.target.value })
            }
          />
          <Input
            label="Publication Year"
            variant="outlined"
            crossOrigin={true}
            value={bookForm.publicationDate}
            onChange={(e) =>
              setBookForm({ ...bookForm, publicationDate: e.target.value })
            }
          />
          <Select label="Select Tags">
            <Option>Material Tailwind HTML</Option>
            <Option>Material Tailwind React</Option>
            <Option>Material Tailwind Vue</Option>
            <Option>Material Tailwind Angular</Option>
            <Option>Material Tailwind Svelte</Option>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button fullWidth onClick={onCancel}>
            Cancel
          </Button>
          <Button fullWidth color="blue" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default BookForm;
