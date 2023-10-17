import Input from "@material-tailwind/react/components/Input";
import { useController } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  control: any;
};

const AppInput = ({ label, control, name }: Props) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <Input
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      label={label}
      variant="outlined"
      crossOrigin={true}
    />
  );
};
export default AppInput;
