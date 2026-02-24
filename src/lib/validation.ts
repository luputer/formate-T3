import { z } from "zod";


export const webinarSchema = z
    .object({
        name: z.string().min(1, "Nama webinar wajib diisi"),
        description: z.string().min(1, "Deskripsi wajib diisi"),
        priceType: z.enum(["free", "paid"]),
        price: z.number().min(0, "Harga tidak boleh negatif").optional(),
        platform: z.string().min(1, "Platform wajib dipilih"),
        link: z
            .string()
            .url("Link tidak valid, pastikan format URL benar (https://...)")
            .optional()
            .or(z.literal("")),
        notes: z.string().optional(),
        status: z.string().min(1, "Status wajib dipilih"),
        dateStart: z.date({ required_error: "Waktu mulai wajib diisi" }),
        dateEnd: z.date({ required_error: "Waktu selesai wajib diisi" }),
        dateDeadline: z.date().optional(),
        quota: z.number().min(1, "Kuota minimal 1").optional(),
    })
    .refine(
        (data) => {
            if (data.priceType === "paid") {
                return data.price !== undefined && data.price > 0;
            }
            return true;
        },
        {
            message: "Harga wajib diisi untuk webinar berbayar",
            path: ["price"],
        }
    )
    .refine(
        (data) => {
            if (data.dateStart && data.dateEnd) {
                return data.dateEnd > data.dateStart;
            }
            return true;
        },
        {
            message: "Waktu selesai harus setelah waktu mulai",
            path: ["dateEnd"],
        }
    );
