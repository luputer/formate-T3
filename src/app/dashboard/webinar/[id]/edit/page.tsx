"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Loader2, Save } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { DateTimePicker } from "~/components/ui/date-time-picker";

const FormGroup = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-start">
        <Label className="mt-2 text-slate-700 font-medium text-base">{label}</Label>
        <div className="w-full">{children}</div>
    </div>
);

const SectionHeader = ({ title }: { title: string }) => (
    <div className="border-b-2 border-blue-500 pb-2 mb-6">
        <h2 className="text-lg font-bold text-slate-700">{title}</h2>
    </div>
);

export default function EditWebinarPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const { data: webinar, isLoading } = api.products.getById.useQuery({ id });

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priceType, setPriceType] = useState("free");
    const [price, setPrice] = useState("");
    const [link, setLink] = useState("");
    const [status, setStatus] = useState("published");
    const [dateStart, setDateStart] = useState<Date>();
    const [dateEnd, setDateEnd] = useState<Date>();

    // Pre-fill form when data loads
    useEffect(() => {
        if (webinar) {
            setName(webinar.name);
            setDescription(webinar.description ?? "");
            setLink(webinar.link ?? "");
            setStatus(webinar.status ?? "published");
            if (webinar.startDate) setDateStart(new Date(webinar.startDate));
            if (webinar.endDate) setDateEnd(new Date(webinar.endDate));

            const priceVal = Number(webinar.price);
            if (priceVal === 0) {
                setPriceType("free");
                setPrice("");
            } else {
                setPriceType("paid");
                setPrice(String(priceVal));
            }
        }
    }, [webinar]);

    const utils = api.useUtils();

    const updateWebinar = api.products.update.useMutation({
        onSuccess: async () => {
            // Invalidate cache agar data langsung update tanpa refresh
            await utils.products.getById.invalidate({ id });
            await utils.products.getAll.invalidate();
            toast.success("Webinar berhasil diperbarui");
            router.push(`/dashboard/webinar/${id}`);
        },
        onError: (error) => {
            toast.error(`Gagal memperbarui webinar: ${error.message}`);
        },
    });

    const handleSubmit = () => {
        if (!name.trim()) {
            toast.error("Nama webinar wajib diisi");
            return;
        }

        const finalPrice = priceType === "free" ? 0 : parseFloat(price) || 0;

        updateWebinar.mutate({
            id,
            name,
            description,
            price: finalPrice,
            startDate: dateStart,
            endDate: dateEnd,
            link: link || undefined,
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
            </div>
        );
    }

    if (!webinar) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <p className="text-slate-500 text-lg">Webinar tidak ditemukan.</p>
                <Link href="/dashboard/webinar" className="text-blue-500 hover:underline">
                    ← Kembali ke Daftar Webinar
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-2 mb-8">
                <Link
                    href={`/dashboard/webinar/${id}`}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 w-fit"
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Kembali ke Detail Webinar</span>
                </Link>
                <h1 className="text-2xl font-bold text-blue-600">
                    Edit Webinar
                </h1>
                <p className="text-slate-500 text-sm">{webinar.name}</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl space-y-8">
                {/* Informasi Produk */}
                <section>
                    <SectionHeader title="Informasi Produk" />
                    <div className="space-y-5">
                        <FormGroup label="Nama">
                            <Input
                                placeholder="Masukkan nama webinar"
                                className="bg-white h-[52px] border-blue-200 focus-visible:ring-blue-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup label="Deskripsi">
                            <Textarea
                                placeholder="Masukkan deskripsi webinar"
                                className="min-h-[120px] bg-white border-blue-200 focus-visible:ring-blue-500"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup label="Tipe">
                            <Select value={priceType} onValueChange={setPriceType}>
                                <SelectTrigger className="bg-white w-full h-[52px] border-blue-200 focus:ring-blue-500">
                                    <SelectValue placeholder="Pilih Salah Satu" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="free">Gratis</SelectItem>
                                    <SelectItem value="paid">Berbayar</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormGroup>

                        {priceType === "paid" && (
                            <FormGroup label="Harga">
                                <div className="relative">
                                    <span className="absolute left-3 top-3.5 text-slate-500">Rp</span>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        className="pl-10 bg-white h-[52px] border-blue-200 focus-visible:ring-blue-500"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                            </FormGroup>
                        )}

                        <FormGroup label="Link">
                            <Input
                                placeholder="Masukkan link webinar"
                                className="bg-white h-[52px] border-blue-200 focus-visible:ring-blue-500"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup label="Status">
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="bg-white w-full h-[52px] border-blue-200 focus:ring-blue-500">
                                    <SelectValue placeholder="Pilih Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="published" className="text-amber-600 font-medium">Published</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormGroup>
                    </div>
                </section>

                {/* Jadwal */}
                <section>
                    <SectionHeader title="Jadwal" />
                    <div className="space-y-5">
                        <FormGroup label="Waktu Mulai">
                            <DateTimePicker
                                date={dateStart}
                                setDate={setDateStart}
                                placeholder="Pilih Tanggal Mulai"
                            />
                        </FormGroup>

                        <FormGroup label="Waktu Selesai">
                            <DateTimePicker
                                date={dateEnd}
                                setDate={setDateEnd}
                                placeholder="Pilih Tanggal Selesai"
                            />
                        </FormGroup>
                    </div>
                </section>
            </div>

            <Button
                onClick={handleSubmit}
                disabled={updateWebinar.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg shadow-md shadow-blue-200"
            >
                {updateWebinar.isPending ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Menyimpan...
                    </>
                ) : (
                    <>
                        <Save className="mr-2 h-5 w-5" />
                        Simpan Perubahan
                    </>
                )}
            </Button>
        </div>
    );
}
