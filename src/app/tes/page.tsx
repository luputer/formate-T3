"use client";

import React from 'react'
import { Button } from '~/components/ui/button'
import { api } from '~/trpc/react';

export default function tesPage() {
    const { data: tes, isLoading } = api.tes.getAll.useQuery();
  return (
    <>
        {isLoading ? (
            <p>Loading tes...</p>
          ) : tes ? (
            <ul className="mb-4 space-y-2">
              {tes.map((tes) => (
                <div>
                <li key={tes.id} className="p-2 bg-white/20 rounded">
                  {tes.nama}
                </li>
                <h1 key={tes.id}>{tes.deskripsi}</h1>
                </div>
              ))}
            </ul>
          ) : (
            <p>No tes found</p>
          )}
    </>
  )
}
