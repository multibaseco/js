import { IdentifyParams, MultibaseConfig } from "./types/base";
declare function init(apiKey: string, configuration?: MultibaseConfig): void;
declare function track(event: string, properties: object): void;
declare function identify(params: IdentifyParams): Promise<void>;
export { init, track, identify };
