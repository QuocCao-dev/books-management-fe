import { Button, Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useBooks } from "../hooks/useBooks";
import { useLoading } from "../hooks/useLoading";
import axiosClient from "../services/axios-client";
import { TBook } from "../types/book";
import { TTag } from "../types/tag";
import { AppChip, AppInput, AppTextarea } from "./ui/app-forms";

type Props = {
  onCancel: () => void;
  book: TBook | null;
  onClose: () => void;
};

const BookForm = ({ onCancel, book, onClose }: Props) => {
  const { control, handleSubmit: handleSubmitForm, reset } = useForm();

  const { addBook, editBook } = useBooks();

  const [loading, { showLoading, hideLoading }] = useLoading();
  const [tags, setTags] = useState<TTag[]>([]);

  const handleSubmit = async (values: any) => {
    const convertValues = {
      ...values,
      price: +values.price,
    };

    if (book) {
      // edit book
      await editBook(book.id, convertValues);
    } else {
      // add new book
      await addBook(convertValues);
    }
    onClose();
  };

  const getTags = async () => {
    showLoading();
    const response = await axiosClient.get("/tags");
    setTags(response.data);
    hideLoading();
  };

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    if (!book) return;
    reset({ ...book, tags: book.tags.map((tag) => tag.id) });
  }, [book]);

  return (
    <Card className="p-4">
      <Typography variant="h4" color="blue-gray">
        Book Form
      </Typography>

      <form
        className="max-w-screen-lg mt-8 mb-2"
        onSubmit={handleSubmitForm(handleSubmit)}
      >
        <div className="flex flex-col gap-4 mb-4">
          <AppInput label="Book Name" name="name" control={control} />
          <AppTextarea
            label="Description"
            name="description"
            control={control}
          />
          <AppInput label="Price" name="price" control={control} />
          <AppInput label="Author" name="author" control={control} />
          <AppInput
            label="Publication Year"
            name="publicationDate"
            control={control}
          />
          <div className="flex flex-wrap gap-2">
            <AppChip options={tags} name="tags" control={control} />
          </div>
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
