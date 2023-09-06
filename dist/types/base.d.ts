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
export declare const isMultibaseConfigValid: (mc: MultibaseConfig) => boolean;
export declare const multibaseConfigErrors: (mc: MultibaseConfig) => {
    instancePath: string;
    message: string;
}[];
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
    address: string;
    chain: string | number;
    properties?: object;
};
export type ValidIdentifyParameters = {
    address: string;
    chain: string;
    properties?: object;
};
export declare class Identify {
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
    address?: string;
    chain?: string;
    properties: object;
    constructor({ anonymousId, address, properties }: {
        anonymousId: string;
        address?: string;
        chain?: string;
        properties: object;
    });
    toJSON(): object;
}
