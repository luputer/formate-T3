import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const ProductType = z.enum(["WEBINAR", "DIGITAL_PRODUCT", "KELAS_ONLINE"]);

export const productsRouter = createTRPCRouter({
    // Get all products
    getAll: publicProcedure
        .input(z.object({ type: ProductType.optional() }).optional())
        .query(async ({ ctx, input }) => {
            return await ctx.db.product.findMany({
                where: input?.type ? { type: input.type } : undefined,
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
    create: protectedProcedure
        .input(
            z.object({
                name: z.string().min(1, "Product name is required"),
                price: z.number().positive("Price must be positive"),
                description: z.string().optional(),
                type: ProductType.optional(),
                startDate: z.date().optional(),
                endDate: z.date().optional(),
                link: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.db.product.create({
                data: {
                    ...input,
                    userId: ctx.session.user.id,
                },
            });
        }),

    // Update a product
    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string().min(1, "Product name is required").optional(),
                price: z.number().positive("Price must be positive").optional(),
                description: z.string().optional(),
                type: ProductType.optional(),
                startDate: z.date().optional(),
                endDate: z.date().optional(),
                link: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, ...data } = input;
            return await ctx.db.product.update({
                where: { id: id },
                data,
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