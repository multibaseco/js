import { getExactUTCTimeISO } from '../utils';
import { generateContext } from '../utils/context';

declare global {
    interface Window {
        multibase: any;
    }
}

export type MultibaseConfig = {
    token: string;
    enabled: boolean;
    debug: boolean;
}

export const isMultibaseConfigValid = (mc: Partial<MultibaseConfig> | undefined) => {
    if (mc == null) return true
    if (mc.enabled != null && typeof mc.enabled !== 'boolean') return false
    if (mc.debug != null && typeof mc.debug !== 'boolean') return false
    return true
}

export const multibaseConfigErrors = (mc: Partial<MultibaseConfig> | undefined) => {
    if (mc == null) return []
    if (mc.enabled != null && typeof mc.enabled !== 'boolean') return [{ instancePath: 'enabled', message: 'enabled must be a boolean' }]
    if (mc.debug != null && typeof mc.debug !== 'boolean') return [{ instancePath: 'debug', message: 'debug must be a boolean' }]
    return []
}

export const defaultConfig: MultibaseConfig = {
    token: "",
    enabled: true,
    debug: false,
}

export type Property = any
export type Properties = Record<string, Property>;

export class Event {
    timestamp: string;
    name: string;
    properties: Properties | undefined;
    context: Properties;

    constructor({ name, properties }: { name: string, properties?: Properties }) {
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
    | { address: string; properties?: Properties }

export class Identify {
    timestamp: string;
    address?: string;
    properties?: Properties;
    context: object;

    constructor(address: string, properties?: Properties) {
        this.address = address;
        this.properties = properties;
        this.timestamp = getExactUTCTimeISO();
        this.context = generateContext();
    }

    toJSON(): object {
        return {
            timestamp: this.timestamp,
            properties: this.properties,
            context: this.context,
            address: this.address,
        }
    }
}

export class User {
    anonymousId: string;
    address?: string;
    properties: object;

    constructor({ anonymousId, address, properties }: { anonymousId: string, address?: string, properties: object }) {
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