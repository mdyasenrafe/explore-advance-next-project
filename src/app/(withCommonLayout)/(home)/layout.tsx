import React from "react";

type Props = {
  children: React.ReactNode;
  recentPosts: React.ReactNode;
};

export default function layout({ children, recentPosts }: Props) {
  return (
    <div>
      {children} {recentPosts}
    </div>
  );
}
