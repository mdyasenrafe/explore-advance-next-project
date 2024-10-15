"use client";

import { FormDatePicker } from "@/src/components/form/FormDatePicker";
import FormInput from "@/src/components/form/FormInput";
import { dateToIso } from "@/src/utils/dateToIso";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

export default function page() {
  const methods = useForm();

  const { control, handleSubmit } = methods;
  const { append, remove, fields } = useFieldArray({
    control,
    name: "questions",
  });
  const handleFieldAppend = () => {
    append({ name: "questions" });
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const postData = {
      ...data,
      questions: data?.questions.map(
        (question: { value: string }) => question.value
      ),
      dateFound: dateToIso(data.dateFound),
    };
    console.log(postData);
  };
  return (
    <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-[73px] py-12">
      <h1 className="text-2xl font-semibold">Post a found item</h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-2 py-2">
            <div className="min-w-fit flex-1">
              <FormInput name="Title" label="Title" />
            </div>
            <div className="min-w-fit flex-1">
              <FormDatePicker name="foundDate" label="Found Date" />
            </div>
          </div>
          <Divider className="my-5" />
          <div className="flex justify-between items-center">
            <h1 className="text-xl">Owner verification questions</h1>
            <Button onClick={() => handleFieldAppend()}>Append</Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center mt-5">
              <FormInput name={`questions.${index}.value`} label="Question" />
              <Button onClick={() => remove(index)}>Remove</Button>
            </div>
          ))}

          <Divider className="my-5" />

          <Button type="submit">Post</Button>
        </form>
      </FormProvider>
    </div>
  );
}
