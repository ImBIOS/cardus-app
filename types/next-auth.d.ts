import { User } from "next-auth";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: User & {
      id: string;
    };
  }
}
