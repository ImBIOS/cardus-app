import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-unused-vars
  var prisma: PrismaClient | undefined;
}

const nodeEnv = process.env.NODE_ENV;

const db =
  global.prisma ||
  new PrismaClient({
    log: nodeEnv === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (nodeEnv !== "production") {
  global.prisma = db;
}

export default db;
