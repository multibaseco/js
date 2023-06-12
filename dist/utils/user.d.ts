import { User, ValidIdentifyParameters } from "../types/base";
export declare function getSavedUser(): User;
export declare function resetAnonymousId(): void;
export declare function associateUser(params: ValidIdentifyParameters): void;
