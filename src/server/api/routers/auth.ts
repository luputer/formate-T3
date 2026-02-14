import { z } from "zod";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
    register: publicProcedure
        .input(
            z.object({
                name: z.string().min(1, "Nama lengkap harus diisi"),
                email: z.string().email("Email tidak valid"),
                phone: z.string().min(10, "Nomor HP minimal 10 digit"),
                password: z.string().min(6, "Password minimal 6 karakter"),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const existingUser = await ctx.db.user.findUnique({
                where: { email: input.email },
            });

            if (existingUser) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Email sudah terdaftar. Silakan login.",
                });
            }

            const hashedPassword = await bcrypt.hash(input.password, 10);

            const user = await ctx.db.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                    phoneNumber: input.phone,
                    password: hashedPassword,
                    role: "creator", // Default role
                },
            });

            return { success: true, user: { id: user.id, email: user.email, name: user.name } };
        }),
});
