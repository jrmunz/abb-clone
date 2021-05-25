import { createConnection, getConnectionOptions } from "typeorm";

export const createTOConnection = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  const isProduction = process.env.NODE_ENV === "production";

  return isProduction
    ? createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        name: "default",
      } as any)
    : createConnection({ ...connectionOptions, name: "default" });
};
