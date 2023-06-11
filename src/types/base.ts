import { ajv } from '../constants';
import { getExactUTCTimeISO } from '../utils';
import { generateContext } from '../utils/context';

declare global {
    interface Window {
        multibase: any;
    }
}

export type Chain = {
    id: number;
    multibaseId: string;
    validIds: string[];
}

export type MultibaseConfig = {
    enabled: boolean;
    debug: boolean;
}

const multibaseConfigSchema = {
    type: "object",
    properties: {
        enabled: { type: "boolean" },
        debug: { type: "boolean" },
    },
    required: [],
    additionalProperties: false,
    // errorMessage: {
    //     properties: {
    //         enabled: "config.enabled must be boolean",
    //         debug: "config.debug must be boolean",
    //     },
    // },
}
export const validateMultibaseConfig = ajv.compile(multibaseConfigSchema)

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


export const defaultConfig: MultibaseConfig = {
    enabled: true,
    debug: false,
}

export class Event {
    timestamp: string;
    name: string;
    properties: object;
    context: object;

    constructor({ name, properties }: { name: string, properties: object }) {
        this.timestamp = getExactUTCTimeISO();
        this.name = name;
        this.properties = properties;
        this.context = generateContext();
    }

    toJSON(): object {
        return {
            timestamp: this.timestamp,
            name: this.name,
            properties: this.properties,
            context: this.context,
        }
    }
}

export type IdentifyParams =
    | { type: "custom", id: string, properties?: object }
    | { type: "address", address: string, chain: string | number; properties?: object }

export type ValidIdentifyParameters =
    | { type: "custom", id: string, properties?: object }
    | { type: "address", address: string, chain: string; properties?: object }

export class Identify {
    type: string;
    timestamp: string;
    context: object;
    id?: string;
    address?: string;
    chain?: string;
    properties?: object;

    constructor(params: ValidIdentifyParameters) {
        const { type, properties } = params;
        this.type = type;
        this.timestamp = getExactUTCTimeISO();
        this.properties = properties;
        this.context = generateContext();
        if (type === "custom") this.id = params.id;
        if (type === "address") {
            this.address = params.address;
            this.chain = params.chain;
        }
    }

    toJSON(): object {
        return {
            timestamp: this.timestamp,
            properties: this.properties,
            context: this.context,
            type: this.type,
            id: this.id,
            address: this.address,
            chain: this.chain,
        }
    }
}

export class User {
    anonymousId: string;
    id?: string;
    address?: string;
    chain?: string;
    properties: object;

    constructor({ anonymousId, id, address, chain, properties }: { anonymousId: string, id?: string, address?: string, chain?: string, properties: object }) {
        this.anonymousId = anonymousId;
        this.id = id;
        this.address = address;
        this.chain = chain;
        this.properties = properties;
    }

    toJSON(): object {
        return {
            anonymousId: this.anonymousId,
            userId: this.id,
            address: this.address,
            chain: this.chain,
        }
    }
}