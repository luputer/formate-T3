"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, Plus } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/components/ui/popover";
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

export default function CreateWebinarPage() {
    const [dateStart, setDateStart] = useState<Date>();
    const [dateEnd, setDateEnd] = useState<Date>();
    const [dateDeadline, setDateDeadline] = useState<Date>();

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

    return (
        <div className="space-y-6 max-w-7xl">
            {/* Header */}
            <div className="flex flex-col gap-2 mb-8">
                <Link
                    href="/dashboard/webinar"
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 w-fit"
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Kembali ke Daftar Webinar</span>
                </Link>
                <h1 className="text-2xl font-bold text-blue-600">
                    Tambah Webinar Baru
                </h1>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-xl space-y-8">
                {/* Informasi Produk */}
                <section>
                    <SectionHeader title="Informasi Produk" />
                    <div className="space-y-5">
                        <FormGroup label="Nama">
                            <Input placeholder="Masukkan nama webinar" className="bg-white border-blue-200 focus-visible:ring-blue-500" />
                        </FormGroup>

                        <FormGroup label="Deskripsi">
                            <Textarea
                                placeholder="Masukkan deskripsi webinar"
                                className="min-h-[120px] bg-white border-blue-200 focus-visible:ring-blue-500"
                            />
                        </FormGroup>

                        <FormGroup label="Gambar">
                            <div className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center border border-blue-300 bg-white hover:bg-blue-50 text-blue-500 transition-colors">
                                <Plus className="h-8 w-8" />
                                <input type="file" className="hidden" accept="image/*" />
                            </div>
                        </FormGroup>

                        <FormGroup label="Tipe">
                            <Select>
                                <SelectTrigger className="bg-white border-blue-200 focus:ring-blue-500">
                                    <SelectValue placeholder="Pilih Salah Satu" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="free">Gratis</SelectItem>
                                    <SelectItem value="paid">Berbayar</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormGroup>

                        <FormGroup label="Harga">
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-slate-500">Rp</span>
                                <Input type="number" placeholder="0" className="pl-10 bg-white border-blue-200 focus-visible:ring-blue-500" />
                            </div>
                        </FormGroup>

                        <FormGroup label="Platform">
                            <Input placeholder="Masukkan platform" className="bg-white border-blue-200 focus-visible:ring-blue-500" />
                        </FormGroup>

                        <FormGroup label="Link">
                            <Input placeholder="Masukkan link webinar" className="bg-white border-blue-200 focus-visible:ring-blue-500" />
                        </FormGroup>

                        <FormGroup label="Catatan">
                            <Input placeholder="Masukkan catatan (opsional)" className="bg-white border-blue-200 focus-visible:ring-blue-500" />
                        </FormGroup>

                        <FormGroup label="Status">
                            <Select defaultValue="published">
                                <SelectTrigger className="bg-white border-blue-200 focus:ring-blue-500">
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
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-white border-blue-200 hover:bg-blue-50",
                                            !dateStart && "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateStart ? format(dateStart, "PPP") : <span>Pilih tanggal</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={dateStart} onSelect={setDateStart} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </FormGroup>

                        <FormGroup label="Waktu Selesai">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-white border-blue-200 hover:bg-blue-50",
                                            !dateEnd && "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateEnd ? format(dateEnd, "PPP") : <span>Pilih tanggal</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={dateEnd} onSelect={setDateEnd} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </FormGroup>
                    </div>
                </section>

                {/* Pendaftaran */}
                <section>
                    <SectionHeader title="Pendaftaran" />
                    <div className="space-y-5">
                        <FormGroup label="Batas Daftar">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-white border-blue-200 hover:bg-blue-50",
                                            !dateDeadline && "text-muted-foreground",
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateDeadline ? format(dateDeadline, "PPP") : <span>Pilih tanggal</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={dateDeadline} onSelect={setDateDeadline} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </FormGroup>

                        <FormGroup label="Kuota">
                            <Input type="number" placeholder="0" className="bg-white border-blue-200 focus-visible:ring-blue-500" />
                        </FormGroup>
                    </div>
                </section>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg shadow-md shadow-blue-200">
                Tambah <Plus className="ml-2 h-5 w-5" />
            </Button>
        </div>
    );
}
