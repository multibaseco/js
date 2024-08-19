'use client'

import multibase, { MultibaseProvider } from "@multibase/js"

if (typeof window !== 'undefined') {
    multibase.init(process.env.NEXT_PUBLIC_MULTIBASE_KEY!)
}

export function MBProvider({
    children,
}: {
    children: React.ReactNode
}) {
    return <MultibaseProvider client={multibase}>{children}</MultibaseProvider>
}