"use client";

import Loading from "@/src/components/UI/Loading";
import { FormDatePicker } from "@/src/components/form/FormDatePicker";
import FormInput from "@/src/components/form/FormInput";
import { FormSelect } from "@/src/components/form/FormSelect";
import { FormTextArea } from "@/src/components/form/FormTextArea";
import { useUser } from "@/src/context/user.provider";
import { useGetCategories } from "@/src/hooks/category.hook";
import { useCreatePost } from "@/src/hooks/post.hook";
import { dateToIso } from "@/src/utils/dateToIso";
import { allDistict } from "@bangladeshi/bangladesh-address";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

const cityOptions = allDistict()
  .sort()
  .map((city: string) => {
    return {
      key: city,
      label: city,
    };
  });

export default function page() {
  // states
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const { currentUser } = useUser();
  const {
    data: categoriesData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
  } = useGetCategories();

  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess,
  } = useCreatePost();

  const router = useRouter();

  let categoryOption = [];

  if (categoriesData?.data && !categoryLoading) {
    categoryOption = categoriesData.data
      .sort()
      .map((category: { _id: string; name: string }) => ({
        key: category._id,
        label: category.name,
      }));
  }

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
      user: currentUser?._id,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(postData));
    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }
    handleCreatePost(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!createPostPending && isSuccess) {
    router.push("/");
  }

  return (
    <>
      {createPostPending && <Loading />}
      <div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-[73px] py-12">
        <h1 className="text-2xl font-semibold">Post a found item</h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FormInput name="title" label="Title" />
              </div>
              <div className="min-w-fit flex-1">
                <FormDatePicker name="foundDate" label="Found Date" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FormInput label="Location" name="location" />
              </div>
              <div className="min-w-fit flex-1">
                <FormSelect label="City" name="city" options={cityOptions} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FormSelect
                  disabled={!categorySuccess}
                  label="Category"
                  name="category"
                  options={categoryOption}
                />
              </div>
              <div className="min-w-fit flex-1">
                <label
                  className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                  htmlFor="image"
                >
                  Upload image
                </label>
                <input
                  multiple
                  className="hidden"
                  id="image"
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex gap-5 my-5 flex-wrap">
                {imagePreviews.map((imageDataUrl) => (
                  <div
                    key={imageDataUrl}
                    className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                  >
                    <img
                      alt="item"
                      className="h-full w-full object-cover object-center rounded-md"
                      src={imageDataUrl}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap-reverse gap-2 py-2">
              <div className="min-w-fit flex-1">
                <FormTextArea label="Description" name="description" />
              </div>
            </div>

            <Divider className="my-5" />
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
    </>
  );
}
