import { Textarea } from "@nextui-org/input";
import { FormInputProps } from "./types";
import { useFormContext } from "react-hook-form";

interface TextAreaProps extends FormInputProps {}

export const FormTextArea: React.FC<TextAreaProps> = ({
  label = "Label",
  placeholder = "Enter value",
  fullWidth = true,
  required = false,
  type = "text",
  name,
  variant = "bordered",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Textarea {...register(name)} label={label} minRows={6} variant={variant} />
  );
};
