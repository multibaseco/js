import { IdentifyParams, ValidIdentifyParameters } from '../types/base';
export declare function getSaved(key: string): string | undefined;
export declare function setSaved(key: string, value: string): void;
export declare function generateUserId(): string;
export declare function getExactUTCTimeISO(): string;
export declare function debugLog(message: string, debug: boolean): void;
export declare function logError(message: string): void;
export declare function validateIdentifyParams(params: IdentifyParams): {
    isValid: true;
    message: null;
    params: ValidIdentifyParameters;
    properties?: object;
} | {
    isValid: false;
    message: string;
    params: null;
    properties?: object;
};
export declare function validateAddress(address: string): boolean;
export declare function getValidAddress(address: string): string | null;
export declare function validateChain(chain: string | number): boolean;
export declare function getValidChain(chain: string | number): string | null;
export declare function isBlockedUA(): boolean;
