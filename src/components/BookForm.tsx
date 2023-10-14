import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Select,
  Option,
  Chip,
  Checkbox,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axiosClient from "../services/axios-client";
import { useLoading } from "../hooks/useLoading";
import { TTag } from "../types/tag";
import { color } from "@material-tailwind/react/types/components/chip";

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
  const [loading, { showLoading, hideLoading }] = useLoading();
  const [tags, setTags] = useState<TTag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  console.log("selectedTags", selectedTags);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      ...bookForm,
      price: +bookForm.price,
      tags: selectedTags,
    };

    await axiosClient.post("/books", data);
    onFetchBooks();
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
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Chip
                value={tag.name}
                variant="ghost"
                color={tag.color as color}
                icon={
                  <Checkbox
                    value={tag.id}
                    onChange={(e) => {
                      const id = e.target.value;
                      const isExist = selectedTags.includes(id);
                      if (!isExist) {
                        setSelectedTags([...selectedTags, id]);
                      } else {
                        setSelectedTags(
                          selectedTags.filter((tagId) => tagId !== id)
                        );
                      }
                    }}
                    color={tag.color as color}
                    ripple={false}
                    containerProps={{ className: "p-0" }}
                    crossOrigin={undefined}
                  />
                }
              />
            ))}
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
