"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import FormWrapper from "@/src/components/form/FormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/src/components/form/FormInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { registerValidationSchema } from "@/src/schemas/signupSchema";

const page = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Register</h2>
        </div>
        <FormWrapper
          onSubmit={onSubmit}
          resolver={zodResolver(registerValidationSchema)}
        >
          <div className="space-y-4 mt-8">
            <div>
              <FormInput
                name="name"
                label="Name"
                type="text"
                placeholder="Enter your name"
              />
            </div>
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
            <div>
              <FormInput
                name="phoneNumber"
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="mt-6">
            <Button fullWidth type="submit" color="primary">
              Register
            </Button>
          </div>
        </FormWrapper>
      </div>
    </div>
  );
};

export default page;
