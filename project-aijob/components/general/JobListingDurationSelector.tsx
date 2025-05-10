import { ControllerRenderProps } from "react-hook-form";
import { RadioGroup } from "../ui/radio-group";

interface iAppProps {
  field: ControllerRenderProps;
}

export function JobListingDuration({ field }: iAppProps) {
  return (
    <RadioGroup
      value={field.value?.toString()}
      onValueChange={(value) => field.onChange(parseInt(value))}
    >
      <div className="flex flex-col gap-4"></div>
    </RadioGroup>
  );
}
