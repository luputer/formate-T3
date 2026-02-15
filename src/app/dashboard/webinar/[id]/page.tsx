"use client";

import { ChevronLeft, Edit, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";


export default function WebinarDetailPage() {
    const Label = ({ children }: { children: React.ReactNode }) => (
        <div className="w-[200px] text-slate-700 font-semibold">{children}</div>
    );

    const Value = ({ children }: { children: React.ReactNode }) => (
        <div className="flex-1">
            <div className="w-full rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-slate-600 min-h-[44px] flex items-center">
                {children}
            </div>
        </div>
    );

    const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
        <div className="flex flex-col md:flex-row gap-2 md:items-start mb-4">
            <div className="md:pt-2.5">
                <Label>{label}</Label>
            </div>
            <Value>
                {children}
            </Value>
        </div>
    );

    const SectionHeader = ({ title, icon: Icon }: { title: string; icon?: any }) => (
        <div className="flex items-center justify-between border-b-2 border-blue-500 pb-2 mb-6">
            <h2 className="text-lg font-bold text-slate-800">{title}</h2>
            {Icon && <Icon className="w-4 h-4 text-blue-500 cursor-pointer" />}
        </div>
    );

    return (
        <div className="max-w-4xl space-y-6">
            {/* Header Back */}
            <Link
                href="/dashboard/webinar"
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 w-fit"
            >
                <ChevronLeft className="h-4 w-4" />
                <span>Kembali ke Daftar Webinar</span>
            </Link>

            {/* Title */}
            <h1 className="text-2xl font-bold text-blue-600">Webinar UI/UX Dasar</h1>

            {/* Tabs */}
            <Tabs defaultValue="detail" className="w-full">
                <div className="bg-white rounded-t-xl overflow-hidden border-b border-slate-200">
                    <TabsList className="w-full flex h-auto p-0 bg-transparent">
                        <TabsTrigger
                            value="detail"
                            className="flex-1 rounded-none border-b-2 border-transparent py-4 data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 bg-transparent text-slate-500 font-medium"
                        >
                            Detail Webinar
                        </TabsTrigger>
                        <TabsTrigger
                            value="user"
                            className="flex-1 rounded-none border-b-2 border-transparent py-4 data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 bg-transparent text-slate-500 font-medium"
                        >
                            User (27)
                        </TabsTrigger>
                        <TabsTrigger
                            value="form"
                            className="flex-1 rounded-none border-b-2 border-transparent py-4 data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 bg-transparent text-slate-500 font-medium"
                        >
                            Kustomisasi Form
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="detail" className="space-y-8 bg-blue-50/50 p-6 rounded-b-xl min-h-screen">
                    {/* Informasi Produk */}
                    <section>
                        <SectionHeader title="Informasi Produk" icon={Edit} />

                        <Row label="Nama">Webinar UI/UX Dasar</Row>

                        <Row label="Deskripsi">
                            <span className="leading-relaxed">
                                Webinar UI/UX Dasar untuk Pemula adalah sesi pembelajaran online yang dirancang khusus untuk membantu peserta memahami fundamental desain User Interface (UI) dan User Experience (UX).
                            </span>
                        </Row>

                        <div className="flex flex-col md:flex-row gap-2 md:items-start mb-4">
                            <div className="md:pt-2.5">
                                <Label>Gambar</Label>
                            </div>
                            <div className="flex-1">
                                <div className="w-full rounded-lg border border-blue-200 bg-white p-4 min-h-[44px]">
                                    <div className="w-24 h-24 bg-slate-100 rounded-md flex items-center justify-center">
                                        <ImageIcon className="w-8 h-8 text-slate-300" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Row label="Tipe">Gratis</Row>
                        <Row label="Harga">Rp 0</Row>
                        <Row label="Platform">Zoom</Row>
                        <Row label="Link">https://zoom.us/j/84592167321</Row>
                        <Row label="Catatan">-</Row>
                        <div className="flex flex-col md:flex-row gap-2 md:items-start mb-4">
                            <div className="md:pt-2.5">
                                <Label>Status</Label>
                            </div>
                            <Value>
                                <span className="text-amber-500 font-semibold">Published</span>
                            </Value>
                        </div>
                    </section>

                    {/* Jadwal */}
                    <section>
                        <SectionHeader title="Jadwal" />
                        <Row label="Waktu Mulai">27 Maret 2026 09:00</Row>
                        <Row label="Waktu Selesai">27 Maret 2026 11:00</Row>
                    </section>

                    {/* Pendaftaran */}
                    <section>
                        <SectionHeader title="Pendaftaran" />
                        <Row label="Kuota">40 Orang</Row>
                        <Row label="Batas Daftar">25 Maret 2026 23:59</Row>
                    </section>

                    <div className="flex justify-end pt-4">
                        <p className="text-slate-400 text-sm italic">Ditambahkan pada 20 Maret 2026 09:45</p>
                    </div>

                </TabsContent>

                <TabsContent value="user">
                    <div className="p-6 text-center text-slate-500">List User Placeholder</div>
                </TabsContent>
                <TabsContent value="form">
                    <div className="p-6 text-center text-slate-500">Form Customization Placeholder</div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
