import { createTRPCRouter, publicProcedure } from "../trpc";

export const tesRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.tes.findMany({
        });
    }),
});
