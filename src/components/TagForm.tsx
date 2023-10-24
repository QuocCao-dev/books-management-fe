import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  Card,
  Chip,
  Typography,
} from "@material-tailwind/react";
import { type color } from "@material-tailwind/react/types/components/chip";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTags } from "../hooks/useTags";
import axiosClient from "../services/axios-client";
import { TTag } from "../types/tag";
import { AppInput, AppRadio } from "./ui/app-forms";

type Props = {
  onCancel: () => void;
};

export type TOptions = typeof options;

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

const validationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  color: z.string().min(1, "Color is required"),
});

type FormValues = z.infer<typeof validationSchema>;

const TagForm = ({ onCancel }: Props) => {
  const form = useForm({
    defaultValues: {
      name: "",
      color: options[0].color,
    },
    resolver: zodResolver(validationSchema),
  });
  const { control, handleSubmit: handleSubmitForm, formState } = form;

  const [showAlert, setShowAlert] = useState(false);
  const { tags, isLoading } = useTags();

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
  };

  return (
    <Card className="p-4">
      <Typography variant="h4" color="blue-gray">
        Tag Form
      </Typography>

      {isLoading ? (
        <div>Loading ....</div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: TTag) => (
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
        onSubmit={handleSubmitForm(handleSubmit)}
      >
        <div className="flex flex-col gap-6 mb-4">
          <AppInput
            name="name"
            label="Name"
            control={control}
            error={Boolean(formState?.errors?.name)}
          />
          {formState?.errors?.name && (
            <Typography variant="small" color="red">
              {formState.errors?.name.message}
            </Typography>
          )}

          <div className="flex flex-wrap gap-4">
            <AppRadio name="color" control={control} options={options} />
          </div>
          {formState?.errors?.color && (
            <Typography variant="small" color="red">
              {formState.errors?.color.message}
            </Typography>
          )}

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
