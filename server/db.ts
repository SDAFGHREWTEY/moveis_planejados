import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { InsertUser, users, produtosBase, materiaisCores, avaliacoes, pedidosOracamento, InsertPedidoOrcamento } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const client = postgres(process.env.DATABASE_URL, { ssl: 'require' });
      _db = drizzle(client);
    } catch (error) {
      console.warn("[Database] Failed to connect to PostgreSQL:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const existing = await db.select().from(users).where(eq(users.openId, user.openId)).limit(1);
    const now = new Date();
    const role = user.openId === ENV.ownerOpenId ? 'admin' : (user.role || 'user');

    if (existing.length > 0) {
      await db.update(users)
        .set({
          name: user.name ?? existing[0].name,
          email: user.email ?? existing[0].email,
          loginMethod: user.loginMethod ?? existing[0].loginMethod,
          role,
          lastSignedIn: now,
          updatedAt: now,
        })
        .where(eq(users.openId, user.openId));
    } else {
      await db.insert(users).values({
        openId: user.openId,
        name: user.name ?? null,
        email: user.email ?? null,
        loginMethod: user.loginMethod ?? null,
        role,
        lastSignedIn: now,
        createdAt: now,
        updatedAt: now,
      });
    }
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getProdutosBaseList() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(produtosBase);
  } catch (error) {
    console.error("[Database] Failed to get produtos:", error);
    return [];
  }
}

export async function getMateriaisCoresList() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(materiaisCores);
  } catch (error) {
    console.error("[Database] Failed to get materiais:", error);
    return [];
  }
}

export async function getAvaliacoesList() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(avaliacoes).orderBy(desc(avaliacoes.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get avaliacoes:", error);
    return [];
  }
}

export async function createPedidoOrcamento(data: InsertPedidoOrcamento) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(pedidosOracamento).values(data).returning();
  return result[0];
}

export async function getPedidosOrcamentoList() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(pedidosOracamento).orderBy(desc(pedidosOracamento.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get pedidos:", error);
    return [];
  }
}

export async function upsertProdutoBase(data: { id?: number; tipo: string; tipoCalculo: string; valorBase: number; descricao?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  if (data.id) {
    await db.update(produtosBase)
      .set({
        tipo: data.tipo,
        tipoCalculo: data.tipoCalculo,
        valorBase: data.valorBase.toString(),
        descricao: data.descricao || null,
        updatedAt: new Date(),
      })
      .where(eq(produtosBase.id, data.id));
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

export async function upsertMaterialCor(data: { id?: number; nome: string; multiplicador: number; urlImagem: string; descricao?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  if (data.id) {
    await db.update(materiaisCores)
      .set({
        nome: data.nome,
        multiplicador: data.multiplicador.toString(),
        urlImagem: data.urlImagem,
        descricao: data.descricao || null,
        updatedAt: new Date(),
      })
      .where(eq(materiaisCores.id, data.id));
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
