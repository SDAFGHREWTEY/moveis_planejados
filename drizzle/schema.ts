import { pgTable, serial, varchar, text, timestamp, numeric, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: varchar("role", { length: 20 }).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tabela de tipos de móvel com tipo de cálculo ('quadrado' ou 'linear') e valor correspondente
 */
export const produtosBase = pgTable("produtos_base", {
  id: serial("id").primaryKey(),
  tipo: varchar("tipo", { length: 100 }).notNull().unique(),
  tipoCalculo: varchar("tipo_calculo", { length: 50 }).default("quadrado").notNull(), // 'quadrado' (altura x comprimento) ou 'linear' (somente largura x valor metro quadrado)
  valorBase: numeric("valor_base", { precision: 10, scale: 2 }).notNull(), // taxa base ou valor por m² / metro linear
  descricao: text("descricao"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type ProdutoBase = typeof produtosBase.$inferSelect;
export type InsertProdutoBase = typeof produtosBase.$inferInsert;

/**
 * Tabela de materiais e cores com multiplicador de preço e imagem
 */
export const materiaisCores = pgTable("materiais_cores", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 100 }).notNull().unique(),
  multiplicador: numeric("multiplicador", { precision: 5, scale: 2 }).notNull(),
  urlImagem: text("url_imagem").notNull(),
  descricao: text("descricao"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type MaterialCor = typeof materiaisCores.$inferSelect;
export type InsertMaterialCor = typeof materiaisCores.$inferInsert;

/**
 * Tabela de avaliações e depoimentos de clientes
 */
export const avaliacoes = pgTable("avaliacoes", {
  id: serial("id").primaryKey(),
  nomeCliente: varchar("nome_cliente", { length: 100 }).notNull(),
  nota: integer("nota").notNull(),
  comentario: text("comentario").notNull(),
  urlAvatar: text("url_avatar"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Avaliacao = typeof avaliacoes.$inferSelect;
export type InsertAvaliacao = typeof avaliacoes.$inferInsert;

/**
 * Tabela de pedidos de orçamento enviados pelos clientes
 */
export const pedidosOracamento = pgTable("pedidos_orcamento", {
  id: serial("id").primaryKey(),
  nomeCliente: varchar("nome_cliente", { length: 150 }),
  telefoneCliente: varchar("telefone_cliente", { length: 50 }),
  tipoMovel: varchar("tipo_movel", { length: 100 }).notNull(),
  tipoCalculo: varchar("tipo_calculo", { length: 50 }).notNull(),
  materialCor: varchar("material_cor", { length: 100 }).notNull(),
  comprimento: numeric("comprimento", { precision: 10, scale: 2 }),
  largura: numeric("largura", { precision: 10, scale: 2 }),
  altura: numeric("altura", { precision: 10, scale: 2 }),
  opcionais: text("opcionais"),
  precoTotal: numeric("preco_total", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 50 }).default("pendente").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PedidoOrcamento = typeof pedidosOracamento.$inferSelect;
export type InsertPedidoOrcamento = typeof pedidosOracamento.$inferInsert;
