import Radio from "@material-tailwind/react/components/Radio";
import { color } from "@material-tailwind/react/types/components/checkbox";
import { useController } from "react-hook-form";
import { TOptions } from "../../TagForm";

type Props = {
  options: TOptions;
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
          color={option.color as color}
          label={option.label}
          value={field.value}
          onChange={() => field.onChange(option.color)}
          crossOrigin={undefined}
          defaultChecked={option.color === field.value}
        />
      ))}
    </div>
  );
};
export default AppRadio;
