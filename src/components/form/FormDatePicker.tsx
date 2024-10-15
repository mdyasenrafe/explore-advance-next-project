import { DatePicker } from "@nextui-org/date-picker";
import React from "react";
import { FormInputProps } from "./types";
import { Controller } from "react-hook-form";

interface FormDatePickerProps extends FormInputProps {}

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label = "Label",
  placeholder = "Enter value",
  fullWidth = true,
  required = false,
  type = "text",
  variant = "bordered",
  name,
}) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, ...fields } }) => (
        <DatePicker
          label={label}
          fullWidth={fullWidth}
          isRequired={required}
          {...fields}
          variant={variant}
        />
      )}
    />
  );
};
