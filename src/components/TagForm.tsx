import { Card, Input, Button, Typography } from "@material-tailwind/react";

const TagForm = () => {
  return (
    <Card className="p-4">
      <Typography variant="h4" color="blue-gray">
        Tag Form
      </Typography>

      <form className="max-w-screen-lg mt-8 mb-2">
        <div className="flex flex-col gap-6 mb-4">
          <Input label="Tag Name" variant="outlined" crossOrigin={true} />
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

export default TagForm;
