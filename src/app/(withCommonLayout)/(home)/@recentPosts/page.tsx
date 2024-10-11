import { ErrorBoundary } from "@/src/components/errors/ErrorBoundary";
import RecentPosts from "@/src/components/modules/home/RecentPosts";
import React from "react";

export default function page() {
  return (
    <ErrorBoundary fallback={<p>error...</p>}>
      <RecentPosts />
    </ErrorBoundary>
  );
}
