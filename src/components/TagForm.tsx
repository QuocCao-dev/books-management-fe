import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
  Chip,
  Radio,
} from "@material-tailwind/react";
import { FormEvent, useEffect, useState } from "react";
import axiosClient from "../services/axios-client";
import { TTag } from "../types/tag";
import { useLoading } from "../hooks/useLoading";
import { type color } from "@material-tailwind/react/types/components/chip";
import { useForm } from "react-hook-form";
import AppInput from "./ui/AppInput";
import AppRadio from "./ui/AppRadio";

type Props = {
  onCancel: () => void;
};

type FormValues = {
  name: string;
  color: string;
};

const TagForm = ({ onCancel }: Props) => {
  const form = useForm();
  const { control, handleSubmit: handleSubmitForm } = form;

  const [showAlert, setShowAlert] = useState(false);
  const [tags, setTags] = useState<TTag[]>([]);
  const [loading, { showLoading, hideLoading }] = useLoading();

  const getTags = async () => {
    showLoading();
    const response = await axiosClient.get("/tags");
    setTags(response.data);
    hideLoading();
  };

  useEffect(() => {
    getTags();
  }, []);

  const handleSubmit = async (values: FormValues) => {
    const { name, color } = values;
    await axiosClient.post("/tags", {
      name,
      color,
    });

    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    getTags();
  };

  const options = [
    {
      color: "blue",
      label: "Blue",
    },
    {
      color: "red",
      label: "Red",
    },
    {
      color: "green",
      label: "Green",
    },
    {
      color: "amber",
      label: "Amber",
    },
    {
      color: "teal",
      label: "Teal",
    },
  ];

  return (
    <Card className="p-4">
      <Typography variant="h4" color="blue-gray">
        Tag Form
      </Typography>

      {loading ? (
        <div>Loading ....</div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Chip
              key={tag.id}
              color={tag.color as color}
              value={tag.name}
              size="sm"
            />
          ))}
        </div>
      )}

      <form
        className="max-w-screen-lg mt-8 mb-2"
        onSubmit={handleSubmitForm((values) => {
          handleSubmit(values);
        })}
      >
        <div className="flex flex-col gap-6 mb-4">
          <AppInput name="name" label="Name" control={control} />

          <div className="flex flex-wrap gap-4">
            <AppRadio name="color" control={control} options={options} />
          </div>

          {showAlert && <Alert color="green">Tag created successfully!</Alert>}
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

export default TagForm;
