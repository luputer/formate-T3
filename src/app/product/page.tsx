"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function ProductPage() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const [editPrice, setEditPrice] = useState("");

    const utils = api.useUtils();
    const { data: products, isLoading } = api.products.getAll.useQuery();

    // Create mutation
    const createProduct = api.products.create.useMutation({
        onSuccess: () => {
            void utils.products.getAll.invalidate();
            setName("");
            setPrice("");
        },
    });

    // Update mutation
    const updateProduct = api.products.update.useMutation({
        onSuccess: () => {
            void utils.products.getAll.invalidate();
            setEditingId(null);
        },
    });

    // Delete mutation
    const deleteProduct = api.products.delete.useMutation({
        onSuccess: () => {
            void utils.products.getAll.invalidate();
        },
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !price) return;

        createProduct.mutate({
            name,
            price: parseFloat(price),
        });
    };

    const handleUpdate = (id: string) => {
        if (!editName || !editPrice) return;

        updateProduct.mutate({
            id,
            name: editName,
            price: parseFloat(editPrice),
        });
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            deleteProduct.mutate({ id });
        }
    };

    const startEdit = (id: string, currentName: string, currentPrice: number) => {
        setEditingId(id);
        setEditName(currentName);
        setEditPrice(currentPrice.toString());
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditName("");
        setEditPrice("");
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-5xl font-bold text-white">
                        Product Management
                    </h1>
                    <p className="text-xl text-blue-200">
                        Create, Read, Update, and Delete Products
                    </p>
                </div>

                {/* Create Form */}
                <div className="mb-8 rounded-2xl bg-white/10 p-8 backdrop-blur-lg">
                    <h2 className="mb-6 text-2xl font-bold text-white">Add New Product</h2>
                    <form onSubmit={handleCreate} className="flex flex-col gap-4 md:flex-row">
                        <input
                            type="text"
                            placeholder="Product name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="flex-1 rounded-lg bg-white/20 px-4 py-3 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Price..."
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="flex-1 rounded-lg bg-white/20 px-4 py-3 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            disabled={createProduct.isPending}
                            className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 font-semibold text-white transition-all hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                        >
                            {createProduct.isPending ? "Adding..." : "Add Product"}
                        </button>
                    </form>
                </div>

                {/* Products List */}
                <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-lg">
                    <h2 className="mb-6 text-2xl font-bold text-white">Products List</h2>

                    {isLoading ? (
                        <div className="text-center">
                            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
                            <p className="mt-4 text-white">Loading products...</p>
                        </div>
                    ) : products && products.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="rounded-xl bg-white/10 p-6 transition-all hover:bg-white/20"
                                >
                                    {editingId === product.id ? (
                                        // Edit Mode
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                value={editName}
                                                onChange={(e) => setEditName(e.target.value)}
                                                className="w-full rounded-lg bg-white/20 px-3 py-2 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={editPrice}
                                                onChange={(e) => setEditPrice(e.target.value)}
                                                className="w-full rounded-lg bg-white/20 px-3 py-2 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleUpdate(product.id)}
                                                    disabled={updateProduct.isPending}
                                                    className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                                                >
                                                    {updateProduct.isPending ? "Saving..." : "Save"}
                                                </button>
                                                <button
                                                    onClick={cancelEdit}
                                                    className="flex-1 rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // View Mode
                                        <>
                                            <h3 className="mb-2 text-xl font-bold text-white">
                                                {product.name}
                                            </h3>
                                            <p className="mb-4 text-2xl font-bold text-green-400">
                                                Rp {Number(product.price).toLocaleString("id-ID")}
                                            </p>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        startEdit(product.id, product.name, Number(product.price))
                                                    }
                                                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    disabled={deleteProduct.isPending}
                                                    className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                                                >
                                                    {deleteProduct.isPending ? "Deleting..." : "Delete"}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-xl text-gray-300">No products found</p>
                            <p className="mt-2 text-gray-400">Add your first product above!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}