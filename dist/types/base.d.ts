declare global {
    interface Window {
        multibase: any;
    }
}
export type Chain = {
    id: number;
    multibaseId: string;
    validIds: string[];
};
export type MultibaseConfig = {
    enabled: boolean;
    debug: boolean;
};
export declare const validateMultibaseConfig: import("ajv").ValidateFunction<unknown>;
export interface IMultibaseCore {
    apiKey: string;
    config: MultibaseConfig;
    queuedEvents: Array<Event>;
    eventQueueTimer: any;
    getAPIKey(): string;
    getUser(): User;
    addToEventQueue(event: string, properties: object): void;
    startEventQueueTimer(): void;
    executeEventQueue(): void;
    identify(params: IdentifyParams): void;
}
export declare const defaultConfig: MultibaseConfig;
export declare class Event {
    timestamp: string;
    name: string;
    properties: object;
    context: object;
    constructor({ name, properties }: {
        name: string;
        properties: object;
    });
    toJSON(): object;
}
export type IdentifyParams = {
    type: "custom";
    id: string;
    properties?: object;
} | {
    type: "address";
    address: string;
    chain: string | number;
    properties?: object;
};
export type ValidIdentifyParameters = {
    type: "custom";
    id: string;
    properties?: object;
} | {
    type: "address";
    address: string;
    chain: string;
    properties?: object;
};
export declare class Identify {
    type: string;
    timestamp: string;
    context: object;
    id?: string;
    address?: string;
    chain?: string;
    properties?: object;
    constructor(params: ValidIdentifyParameters);
    toJSON(): object;
}
export declare class User {
    anonymousId: string;
    id?: string;
    address?: string;
    chain?: string;
    properties: object;
    constructor({ anonymousId, id, address, chain, properties }: {
        anonymousId: string;
        id?: string;
        address?: string;
        chain?: string;
        properties: object;
    });
    toJSON(): object;
}
