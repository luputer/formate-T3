import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const productsRouter = createTRPCRouter({
    // Get all products
    getAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.product.findMany({
            orderBy: { createdAt: "desc" },
        });
    }),

    // Get product by ID
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.product.findUnique({
                where: { id: input.id },
            });
        }),

    // Create a new product
    create: publicProcedure
        .input(
            z.object({
                name: z.string().min(1, "Product name is required"),
                price: z.number().positive("Price must be positive"),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.db.product.create({
                data: {
                    name: input.name,
                    price: input.price,
                },
            });
        }),

    // Update a product
    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string().min(1, "Product name is required").optional(),
                price: z.number().positive("Price must be positive").optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.db.product.update({
                where: { id: input.id },
                data: {
                    name: input.name,
                    price: input.price,
                },
            });
        }),

    // Delete a product
    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.db.product.delete({
                where: { id: input.id },
            });
        }),
});