import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Sign In</h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="space-y-4">
            <div>
              <Input
                label="Email address"
                placeholder="Enter your email"
                fullWidth
                required
                type="email"
              />
            </div>
            <div>
              <Input
                label="Password"
                placeholder="Enter your password"
                fullWidth
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between"></div>
          <div>
            <Button fullWidth type="submit" color="primary">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
