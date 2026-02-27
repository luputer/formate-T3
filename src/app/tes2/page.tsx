"use client";

import React, { useState } from 'react'
import { Button } from '~/components/ui/button'

export default function page2() {
    const [data, setData] = useState(100);

    const tambah = () => {
        setData(data + 1);
    }

    const kurang = () => {
        setData(data - 1);
    }
  return (
    <>
    <div>
        <Button variant="outline" size="lg" onClick={tambah}>
            +
        </Button>
        <p>{data}</p>
         <Button variant="secondary" size="lg" onClick={kurang}> 
            -
        </Button>
    </div>
    </>
  )
}
