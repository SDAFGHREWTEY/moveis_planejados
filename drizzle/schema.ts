import { decimal, int, mysqlEnum, mysqlTable, text, timestamp, varchar, float } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tabela de tipos de móvel com taxa base
 */
export const produtosBase = mysqlTable("produtos_base", {
  id: int("id").autoincrement().primaryKey(),
  tipo: varchar("tipo", { length: 100 }).notNull().unique(),
  taxaBase: decimal("taxa_base", { precision: 10, scale: 2 }).notNull(),
  descricao: text("descricao"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ProdutoBase = typeof produtosBase.$inferSelect;
export type InsertProdutoBase = typeof produtosBase.$inferInsert;

/**
 * Tabela de materiais e cores com multiplicador de preço
 */
export const materiaisCores = mysqlTable("materiais_cores", {
  id: int("id").autoincrement().primaryKey(),
  nome: varchar("nome", { length: 100 }).notNull().unique(),
  multiplicador: decimal("multiplicador", { precision: 5, scale: 2 }).notNull(),
  urlImagem: text("url_imagem").notNull(),
  descricao: text("descricao"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MaterialCor = typeof materiaisCores.$inferSelect;
export type InsertMaterialCor = typeof materiaisCores.$inferInsert;

/**
 * Tabela de avaliações e depoimentos de clientes
 */
export const avaliacoes = mysqlTable("avaliacoes", {
  id: int("id").autoincrement().primaryKey(),
  nomeCliente: varchar("nome_cliente", { length: 100 }).notNull(),
  nota: int("nota").notNull(), // 1 a 5 estrelas
  comentario: text("comentario").notNull(),
  urlAvatar: text("url_avatar"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Avaliacao = typeof avaliacoes.$inferSelect;
export type InsertAvaliacao = typeof avaliacoes.$inferInsert;