declare global {
    interface Window {
        multibase: any;
    }
}
export type MultibaseConfig = {
    token: string;
    enabled: boolean;
    debug: boolean;
};
export declare const isMultibaseConfigValid: (mc: Partial<MultibaseConfig> | undefined) => boolean;
export declare const multibaseConfigErrors: (mc: Partial<MultibaseConfig> | undefined) => {
    instancePath: string;
    message: string;
}[];
export declare const defaultConfig: MultibaseConfig;
export type Property = any;
export type Properties = Record<string, Property>;
export declare class Event {
    timestamp: string;
    name: string;
    properties: Properties | undefined;
    context: Properties;
    constructor({ name, properties }: {
        name: string;
        properties?: Properties;
    });
    toJSON(): object;
}
export type IdentifyParams = {
    address: string;
    properties?: Properties;
};
export declare class Identify {
    timestamp: string;
    address?: string;
    properties?: Properties;
    context: object;
    constructor(address: string, properties?: Properties);
    toJSON(): object;
}
export declare class User {
    anonymousId: string;
    address?: string;
    properties: object;
    constructor({ anonymousId, address, properties }: {
        anonymousId: string;
        address?: string;
        properties: object;
    });
    toJSON(): object;
}
