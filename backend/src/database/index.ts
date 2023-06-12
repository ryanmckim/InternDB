require("dotenv").config();
import { DataSource } from "typeorm";
import { URL } from "url";

const dbUrl = new URL(process.env.DATABASE_URL || "");
const routingId = dbUrl.searchParams.get("options");
dbUrl.searchParams.delete("options");

export const AppDataSource = new DataSource({
  type: "cockroachdb",
  url: dbUrl.toString(),
  ssl: true,
  extra: {
    options: routingId,
  },
  synchronize: true,
  entities: ["src/models/*.ts"],
  timeTravelQueries: false,
});
