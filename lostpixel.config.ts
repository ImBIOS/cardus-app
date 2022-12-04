import { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [
      { path: "/", name: "app" },
      { path: "/cardus/add", name: "add-cardus" },
      { path: "/cardus/[id]", name: "read-cardus" },
      { path: "/cardus/[id]/edit", name: "edit-cardus" },
    ],
    // IP should be localhost when running locally & 172.17.0.1 when running in GitHub action
    baseUrl: "http://localhost:3000",
  },
  generateOnly: true,
  failOnDifference: true,
};
