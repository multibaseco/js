import React from 'react';
import { Multibase } from './MultibaseCore';
export declare const MultibaseContext: React.Context<Multibase | null>;
export declare function MultibaseProvider({ children, client }: {
    children?: React.ReactNode;
    client: Multibase;
}): React.JSX.Element;
