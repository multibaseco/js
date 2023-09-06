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

export const isMultibaseConfigValid = (mc: MultibaseConfig) => {
    if(mc.enabled != null && typeof mc.enabled !== 'boolean') return false
    if(mc.debug != null && typeof mc.debug !== 'boolean') return false
    return true
}

export const multibaseConfigErrors = (mc: MultibaseConfig) => {
    if(mc.enabled != null && typeof mc.enabled !== 'boolean') return [{ instancePath: 'enabled', message: 'enabled must be a boolean' }]
    if(mc.debug != null && typeof mc.debug !== 'boolean') return [{ instancePath: 'debug', message: 'debug must be a boolean' }]
    return []
}

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
    | { address: string, chain: string | number; properties?: object }

export type ValidIdentifyParameters =
    | { address: string, chain: string; properties?: object }

export class Identify {
    timestamp: string;
    context: object;
    id?: string;
    address?: string;
    chain?: string;
    properties?: object;

    constructor(params: ValidIdentifyParameters) {
        const { properties } = params;
        this.timestamp = getExactUTCTimeISO();
        this.properties = properties;
        this.context = generateContext();
        this.address = params.address;
        this.chain = params.chain;
    }

    toJSON(): object {
        return {
            timestamp: this.timestamp,
            properties: this.properties,
            context: this.context,
            id: this.id,
            address: this.address,
            chain: this.chain,
        }
    }
}

export class User {
    anonymousId: string;
    address?: string;
    chain?: string;
    properties: object;

    constructor({ anonymousId, address, properties }: { anonymousId: string, address?: string, chain?: string, properties: object }) {
        this.anonymousId = anonymousId;
        this.address = address;
        this.properties = properties;
    }

    toJSON(): object {
        return {
            anonymousId: this.anonymousId,
            address: this.address,
        }
    }
}