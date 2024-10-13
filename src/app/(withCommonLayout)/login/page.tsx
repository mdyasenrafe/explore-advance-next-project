"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import FormInput from "@/src/components/form/FormInput";
import FormWrapper from "@/src/components/form/FormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "@/src/schemas/loginSchema";
import { FieldValues, SubmitHandler } from "react-hook-form";

const Page = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    console.log(data);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Sign In</h2>
        </div>
        <FormWrapper
          onSubmit={onSubmit}
          resolver={zodResolver(loginValidationSchema)}
        >
          <div className="space-y-4 mt-8">
            <div>
              <FormInput
                name="email"
                label="Email address"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <FormInput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="mt-6">
            <Button fullWidth type="submit" color="primary">
              Sign In
            </Button>
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default Page;
