import { envConfig } from "@/src/config/envConfig";
import { delay } from "@/src/utils/delay";

export const getRecentPosts = async () => {
  const fetchOptions = {
    next: {
      tags: ["Posts"],
    },
  };
  const res = await fetch(
    `${envConfig.baseApi}/items?sortBy=-createdAt&limit=9`,
    fetchOptions
  );

  return res.json();
};
