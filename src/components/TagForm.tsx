import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
  Chip,
} from "@material-tailwind/react";
import { FormEvent, useEffect, useState } from "react";
import axiosClient from "../services/axios-client";
import { TTag } from "../types/tag";
import { useLoading } from "../hooks/useLoading";

type Props = {
  onCancel: () => void;
};

const TagForm = ({ onCancel }: Props) => {
  const [tagName, setTagName] = useState("");
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await axiosClient.post("/tags", {
      name: tagName,
    });

    setShowAlert(true);
    setTagName("");

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

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
            <Chip key={tag.id} color="blue" value={tag.name} size="sm" />
          ))}
        </div>
      )}

      <form className="max-w-screen-lg mt-8 mb-2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 mb-4">
          <Input
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            label="Tag Name"
            variant="outlined"
            crossOrigin={true}
          />
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
