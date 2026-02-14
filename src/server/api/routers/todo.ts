import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  // get all todo
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.todo.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  // create a new todo
  create: publicProcedure
    .input(z.object({ title: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.todo.create({
        data: {
          title: input.title,
        },
      });
    }),

  // toggle todo completion status
  toggle: publicProcedure
    .input(z.object({ id: z.string(), completed: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.todo.update({
        where: { id: input.id },
        data: { completed: input.completed },
      });
    }),

  // delete a todo
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.todo.delete({
        where: { id: input.id },
      });
    }),
});