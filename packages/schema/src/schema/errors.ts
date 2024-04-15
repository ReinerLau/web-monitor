import { bigint, int, mysqlTable, text } from "drizzle-orm/mysql-core";

export const code = mysqlTable("code", {
  id: int("id").autoincrement().primaryKey(),
  message: text("message").notNull(),
  fileName: text("fileName").notNull(),
  url: text("url").notNull(),
  columnNumber: int("columnNumber").notNull(),
  lineNumber: int("lineNumber").notNull(),
  time: bigint("time", { mode: "number" }).notNull(),
});
