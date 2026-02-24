import { z } from "zod";


export const webinarSchema = z.object({
    name: z.string().min(1, "Nama webinar wajib diisi"),
    description: z.string().min(1, "Deskripsi wajib diisi"),
    price: z.number().min(0),
    link: z.string().url("Link tidak valid").optional().or(z.literal("")),
    dateStart: z.date({ required_error: "Waktu mulai wajib diisi" }),
    dateEnd: z.date({ required_error: "Waktu selesai wajib diisi" }),
});