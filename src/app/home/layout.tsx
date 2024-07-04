import type { Metadata } from 'next'
import Aside from "@/components/Aside";
import React from "react";

export const metadata: Metadata = {
    title: 'Enterprise Chai',
    description: 'Enterprise Chai',
}
export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen">
            <Aside />
            {children}
        </div>
    )
}
