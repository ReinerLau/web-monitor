import { bigint, int, mysqlTable, text } from 'drizzle-orm/mysql-core';

export const code = mysqlTable('code', {
  id: int('id').autoincrement().primaryKey(),
  message: text('message').notNull(),
  fileName: text('fileName').notNull(),
  url: text('url').notNull(),
  columnNumber: int('columnNumber').notNull(),
  lineNumber: int('lineNumber').notNull(),
  time: bigint('time', { mode: 'number' }).notNull(),
  code: text('code').notNull(),
});

export const resource = mysqlTable('resource', {
  id: int('id').autoincrement().primaryKey(),
  source: text('source').notNull(),
  target: text('target').notNull(),
  url: text('url').notNull(),
  time: bigint('time', { mode: 'number' }).notNull(),
});

export const request = mysqlTable('request', {
  id: int('id').autoincrement().primaryKey(),
  status: int('status').notNull(),
  response: text('response'),
  elapsedTime: bigint('elapsedTime', { mode: 'number' }).notNull(),
  url: text('url').notNull(),
  requestURL: text('requestURL').notNull(),
  time: bigint('time', { mode: 'number' }).notNull(),
  method: text('method').notNull(),
  requestData: text('requestData').notNull(),
});
