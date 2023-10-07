import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";

const BookForm = () => {
  return (
    <Card className="p-4">
      <Typography variant="h4" color="blue-gray">
        Book Form
      </Typography>

      <form className="max-w-screen-lg mt-8 mb-2">
        <div className="flex flex-col gap-4 mb-4">
          <Input label="Book Name" variant="outlined" crossOrigin={true} />
          <Textarea label="Description" variant="outlined" />
          <Input label="Price" variant="outlined" crossOrigin={true} />
          <Input label="Author" variant="outlined" crossOrigin={true} />
          <Input
            label="Publication Year"
            variant="outlined"
            crossOrigin={true}
          />
          <Select label="Select Version">
            <Option>Material Tailwind HTML</Option>
            <Option>Material Tailwind React</Option>
            <Option>Material Tailwind Vue</Option>
            <Option>Material Tailwind Angular</Option>
            <Option>Material Tailwind Svelte</Option>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button fullWidth>Cancel</Button>
          <Button fullWidth color="blue">
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default BookForm;
