import Checkbox from "@material-tailwind/react/components/Checkbox";
import Chip from "@material-tailwind/react/components/Chip";
import { color } from "@material-tailwind/react/types/components/chip";
import { useController } from "react-hook-form";

type Props = {
  name: string;
  control: any;
  options: any[];
};

const AppChip = ({ options, control, name }: Props) => {
  const { field } = useController({
    control,
    name,
    defaultValue: [],
  });

  return options?.map((option) => (
    <Chip
      key={option.id}
      value={option.name}
      variant="ghost"
      color={option.color as color}
      icon={
        <Checkbox
          value={option.id}
          onChange={() => {
            if (field.value.includes(option.id)) {
              field.onChange(
                field.value.filter(
                  (v: any) => v.toString() !== option.id.toString()
                )
              );
            } else {
              field.onChange([...field.value, option.id]);
            }
          }}
          checked={field.value.includes(option.id)}
          color={option.color as color}
          ripple={false}
          containerProps={{ className: "p-0" }}
          crossOrigin={undefined}
        />
      }
    />
  ));
};
export default AppChip;
