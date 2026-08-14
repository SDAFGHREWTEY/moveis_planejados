import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { InsertUser, users, produtosBase, materiaisCores, avaliacoes, pedidosOracamento } from "../drizzle/schema";

neonConfig.webSocketConstructor = ws;

let _db: any = null;

export async function getDb() {
  if (!_db) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not defined in environment variables.");
    }
    try {
      const pool = new Pool({ connectionString });
      _db = drizzle({ client: pool, schema: { users, produtosBase, materiaisCores, avaliacoes, pedidosOracamento } });
    } catch (error) {
      console.warn("[Database] Failed to connect to Neon PostgreSQL:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  const db = await getDb();
  if (!db || !user.openId) return;
  try {
    const existing = await db.select().from(users).where(eq(users.openId, user.openId)).limit(1);
    const now = new Date();
    if (existing.length > 0) {
      await db.update(users).set({
        name: user.name ?? existing[0].name,
        email: user.email ?? existing[0].email,
        loginMethod: user.loginMethod ?? existing[0].loginMethod,
        lastSignedIn: now,
        updatedAt: now,
      }).where(eq(users.openId, user.openId));
    } else {
      await db.insert(users).values({
        openId: user.openId,
        name: user.name ?? null,
        email: user.email ?? null,
        loginMethod: user.loginMethod ?? null,
        role: user.role || 'user',
        lastSignedIn: now,
        createdAt: now,
        updatedAt: now,
      });
    }
  } catch (e) {
    console.error("upsertUser error:", e);
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function getProdutosBaseList() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(produtosBase);
  } catch (e) {
    console.error("getProdutosBaseList error:", e);
    return [];
  }
}

export async function getMateriaisCoresList() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(materiaisCores);
  } catch (e) {
    console.error("getMateriaisCoresList error:", e);
    return [];
  }
}

export async function getAvaliacoesList() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(avaliacoes).orderBy(desc(avaliacoes.createdAt));
  } catch (e) {
    console.error("getAvaliacoesList error:", e);
    return [];
  }
}

export async function createPedidoOrcamento(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const res = await db.insert(pedidosOracamento).values(data).returning();
  return res[0];
}

export async function getPedidosOrcamentoList() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(pedidosOracamento).orderBy(desc(pedidosOracamento.createdAt));
  } catch (e) {
    console.error("getPedidosOrcamentoList error:", e);
    return [];
  }
}

export async function upsertProdutoBase(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.id) {
    await db.update(produtosBase).set({
      tipo: data.tipo,
      tipoCalculo: data.tipoCalculo,
      valorBase: data.valorBase.toString(),
      descricao: data.descricao || null,
      updatedAt: new Date(),
    }).where(eq(produtosBase.id, data.id));
    return data.id;
  } else {
    const res = await db.insert(produtosBase).values({
      tipo: data.tipo,
      tipoCalculo: data.tipoCalculo,
      valorBase: data.valorBase.toString(),
      descricao: data.descricao || null,
    }).returning();
    return res[0].id;
  }
}

export async function deleteProdutoBase(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(produtosBase).where(eq(produtosBase.id, id));
  return true;
}

export async function upsertMaterialCor(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.id) {
    await db.update(materiaisCores).set({
      nome: data.nome,
      multiplicador: data.multiplicador.toString(),
      urlImagem: data.urlImagem,
      descricao: data.descricao || null,
      updatedAt: new Date(),
    }).where(eq(materiaisCores.id, data.id));
    return data.id;
  } else {
    const res = await db.insert(materiaisCores).values({
      nome: data.nome,
      multiplicador: data.multiplicador.toString(),
      urlImagem: data.urlImagem,
      descricao: data.descricao || null,
    }).returning();
    return res[0].id;
  }
}

export async function deleteMaterialCor(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(materiaisCores).where(eq(materiaisCores.id, id));
  return true;
}
