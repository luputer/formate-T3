"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Loader2, Save, Store } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export default function CatalogSetupPage() {
    const router = useRouter();

    // Middleware sudah handle auth — langsung fetch data
    const { data: existing, isLoading } = api.catalog.getMine.useQuery();
    const [slug, setSlug] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        if (existing?.slug) setSlug(existing.slug);
    }, [existing]);

    const upsert = api.catalog.upsert.useMutation({
        onSuccess: (data) => {
            toast.success("Catalog berhasil disimpan!");
            router.push(`/catalog/${data.slug}`);
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    const handleSubmit = () => {
        if (!slug.trim()) {
            toast.error("Slug wajib diisi");
            return;
        }
        upsert.mutate({ slug: slug.trim(), bio: bio.trim() || undefined });
    };

    const previewUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/catalog/${slug || "nama-kamu"}`;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 rounded-2xl mb-4">
                        <Store className="w-7 h-7 text-blue-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800">Setup Catalog</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Buat halaman publik untuk semua produkmu.
                    </p>
                </div>

                {/* Form */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 space-y-5">
                    {/* Slug */}
                    <div className="space-y-1.5">
                        <Label className="text-slate-700 font-medium">
                            Slug <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center rounded-lg border border-blue-200 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                            <span className="px-3 text-slate-400 text-sm whitespace-nowrap border-r border-blue-100">
                                /catalog/
                            </span>
                            <input
                                className="flex-1 px-3 py-2.5 text-sm outline-none bg-transparent"
                                placeholder="nama-kamu"
                                value={slug}
                                onChange={(e) =>
                                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                                }
                            />
                        </div>
                        <p className="text-xs text-slate-400">
                            Huruf kecil, angka, dan tanda hubung saja. Min. 3 karakter.
                        </p>
                    </div>

                    {/* Bio */}
                    <div className="space-y-1.5">
                        <Label className="text-slate-700 font-medium">Bio (opsional)</Label>
                        <Textarea
                            placeholder="Ceritakan sedikit tentang dirimu..."
                            className="bg-white border-blue-200 focus-visible:ring-blue-500 resize-none"
                            rows={3}
                            maxLength={200}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <p className="text-xs text-slate-400 text-right">{bio.length}/200</p>
                    </div>

                    {/* URL Preview */}
                    {slug.length >= 3 && (
                        <div className="flex items-center gap-2 bg-white border border-blue-200 rounded-lg px-3 py-2.5">
                            <ExternalLink className="w-4 h-4 text-blue-400 shrink-0" />
                            <span className="text-xs text-blue-600 break-all">{previewUrl}</span>
                        </div>
                    )}
                </div>

                {/* Save Button */}
                <Button
                    onClick={handleSubmit}
                    disabled={upsert.isPending || slug.length < 3}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-base shadow-md shadow-blue-200"
                >
                    {upsert.isPending ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Menyimpan...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-5 w-5" />
                            Simpan & Lihat Catalog
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
