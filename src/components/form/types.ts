export type FormInputProps = {
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  required?: boolean;
  type?: string;
  name: string;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
};
