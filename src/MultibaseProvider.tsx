import React, { createContext, useMemo } from 'react';
import { Multibase } from './MultibaseCore';

export const MultibaseContext = createContext<Multibase | null>(null)

export function MultibaseProvider({ children, client }: { children?: React.ReactNode, client: Multibase }) {

    const multibase = useMemo(() => {
        if (client) {
            return client
        }

        throw new Error('MultibaseProvider: client is required')
    }, [client])

    return <MultibaseContext.Provider value={multibase}>
        {children}
    </MultibaseContext.Provider >
}