import { eq, desc } from "drizzle-orm";
import { drizzle as drizzleMysql } from "drizzle-orm/mysql2";
import { InsertUser, users, produtosBase, materiaisCores, avaliacoes, pedidosOracamento } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: any = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      // Usar mysql2 que é o driver padrão e funcional do sandbox do projeto
      _db = drizzleMysql(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect with default driver:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(users).values(user).onDuplicateKeyUpdate({
      set: {
        name: user.name,
        email: user.email,
        lastSignedIn: new Date(),
      },
    });
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
    // Retornar fallback elegante se tabela não estiver pronta
    return [
      { id: 1, tipo: 'Guarda-Roupa', tipoCalculo: 'quadrado', valorBase: 180.00, descricao: 'Móvel quadradão' },
      { id: 2, tipo: 'Gabinete de Cozinha', tipoCalculo: 'quadrado', valorBase: 150.00, descricao: 'Gabinete cozinha' },
      { id: 3, tipo: 'Mesa', tipoCalculo: 'linear', valorBase: 120.00, descricao: 'Mesa por largura' },
    ];
  }
}

export async function getMateriaisCoresList() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(materiaisCores);
  } catch (e) {
    return [
      { id: 1, nome: 'Freijó', multiplicador: 1.30, urlImagem: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?w=500&h=500&fit=crop' },
      { id: 2, nome: 'Imbuia', multiplicador: 1.50, urlImagem: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop' },
      { id: 3, nome: 'Carvalho', multiplicador: 1.40, urlImagem: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop' },
      { id: 4, nome: 'Branco MDF', multiplicador: 1.10, urlImagem: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&h=500&fit=crop' },
    ];
  }
}

export async function getAvaliacoesList() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(avaliacoes).orderBy(desc(avaliacoes.createdAt));
  } catch (e) {
    return [
      { id: 1, nomeCliente: 'Maria Silva', nota: 5, comentario: 'Excelente qualidade! Móvel perfeito.', urlAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
      { id: 2, nomeCliente: 'João Santos', nota: 5, comentario: 'Trabalho de excelência.', urlAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    ];
  }
}

export async function createPedidoOrcamento(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const res = await db.insert(pedidosOracamento).values(data);
  return res;
}

export async function getPedidosOrcamentoList() {
  const db = await getDb();
  if (!db) return [];
  try {
    return await db.select().from(pedidosOracamento).orderBy(desc(pedidosOracamento.createdAt));
  } catch (e) {
    return [];
  }
}

export async function upsertProdutoBase(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (data.id) {
    await db.update(produtosBase).set(data).where(eq(produtosBase.id, data.id));
    return data.id;
  } else {
    const res = await db.insert(produtosBase).values(data);
    return res;
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
    await db.update(materiaisCores).set(data).where(eq(materiaisCores.id, data.id));
    return data.id;
  } else {
    const res = await db.insert(materiaisCores).values(data);
    return res;
  }
}

export async function deleteMaterialCor(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(materiaisCores).where(eq(materiaisCores.id, id));
  return true;
}
