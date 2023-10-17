import Radio from "@material-tailwind/react/components/Radio";
import { useController } from "react-hook-form";

type Props = {
  options: any[];
  control: any;
  name: string;
};

const AppRadio = ({ options, control, name }: Props) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <div>
      {options.map((option) => (
        <Radio
          name={name}
          color={option.color}
          label={option.label}
          value={field.value}
          onChange={() => field.onChange(option.color)}
          crossOrigin={undefined}
        />
      ))}
    </div>
  );
};
export default AppRadio;
