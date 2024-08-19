import { MultibaseConfig, Properties } from "./types/base";
export declare class Multibase {
    private __loaded;
    private config;
    private queuedEvents;
    private eventQueueTimer;
    constructor();
    init(token: string, configuration?: Partial<MultibaseConfig>): this;
    track(event: string, properties?: Record<string, any>): void;
    identify(address: string, properties?: Properties): Promise<void>;
    private isDisabled;
    private startEventQueueTimer;
    private executeEventQueue;
    private request;
}
export declare function initAsModule(): Multibase;
export declare function track(event: string, properties?: Properties): void;
export declare function identify(address: string, properties?: Properties): void;
export declare function init(token: string, configuration?: Partial<MultibaseConfig>): void;
