import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  getProdutosBaseList,
  getMateriaisCoresList,
  getAvaliacoesList,
  createPedidoOrcamento,
  getPedidosOrcamentoList,
  upsertProdutoBase,
  deleteProdutoBase,
  upsertMaterialCor,
  deleteMaterialCor,
} from "./db";

// Estado simples em memória para sessão de admin com user: thays e senha: ç1532
let isAdminLoggedIn = false;

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      isAdminLoggedIn = false;
      return { success: true } as const;
    }),
  }),

  admin: router({
    login: publicProcedure
      .input(z.object({ username: z.string(), password: z.string() }))
      .mutation(({ input }) => {
        if (input.username === "thays" && input.password === "ç1532") {
          isAdminLoggedIn = true;
          return { success: true };
        }
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Credenciais de administrador inválidas." });
      }),
    check: publicProcedure.query(() => {
      return { isAdmin: isAdminLoggedIn };
    }),
    logout: publicProcedure.mutation(() => {
      isAdminLoggedIn = false;
      return { success: true };
    }),
    pedidos: publicProcedure.query(async () => {
      if (!isAdminLoggedIn) throw new TRPCError({ code: "FORBIDDEN" });
      return await getPedidosOrcamentoList();
    }),
  }),

  produtos: router({
    list: publicProcedure.query(async () => {
      return await getProdutosBaseList();
    }),
    save: publicProcedure
      .input(
        z.object({
          id: z.number().optional(),
          tipo: z.string(),
          tipoCalculo: z.string(), // 'quadrado' ou 'linear'
          valorBase: z.number(), // valor por m² ou taxa base
          descricao: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        if (!isAdminLoggedIn) throw new TRPCError({ code: "FORBIDDEN" });
        return await upsertProdutoBase(input);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        if (!isAdminLoggedIn) throw new TRPCError({ code: "FORBIDDEN" });
        return await deleteProdutoBase(input.id);
      }),
  }),

  materiais: router({
    list: publicProcedure.query(async () => {
      return await getMateriaisCoresList();
    }),
    save: publicProcedure
      .input(
        z.object({
          id: z.number().optional(),
          nome: z.string(),
          multiplicador: z.number(),
          urlImagem: z.string(),
          descricao: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        if (!isAdminLoggedIn) throw new TRPCError({ code: "FORBIDDEN" });
        return await upsertMaterialCor(input);
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        if (!isAdminLoggedIn) throw new TRPCError({ code: "FORBIDDEN" });
        return await deleteMaterialCor(input.id);
      }),
  }),

  avaliacoes: router({
    list: publicProcedure.query(async () => {
      return await getAvaliacoesList();
    }),
  }),

  pedidos: router({
    criar: publicProcedure
      .input(
        z.object({
          nomeCliente: z.string().optional(),
          telefoneCliente: z.string().optional(),
          tipoMovel: z.string(),
          tipoCalculo: z.string(),
          materialCor: z.string(),
          comprimento: z.number().optional(),
          largura: z.number().optional(),
          altura: z.number().optional(),
          opcionais: z.string().optional(),
          precoTotal: z.number(),
        })
      )
      .mutation(async ({ input }) => {
        return await createPedidoOrcamento({
          nomeCliente: input.nomeCliente || null,
          telefoneCliente: input.telefoneCliente || null,
          tipoMovel: input.tipoMovel,
          tipoCalculo: input.tipoCalculo,
          materialCor: input.materialCor,
          comprimento: input.comprimento ? input.comprimento.toString() : null,
          largura: input.largura ? input.largura.toString() : null,
          altura: input.altura ? input.altura.toString() : null,
          opcionais: input.opcionais || null,
          precoTotal: input.precoTotal.toString(),
          status: 'pendente',
        });
      }),
  }),
});

export type AppRouter = typeof appRouter;
