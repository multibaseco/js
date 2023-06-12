import { IMultibaseCore } from "../types/base";
export declare function postRequest({ endpoint, body, client }: {
    endpoint: string;
    body: object;
    client: IMultibaseCore;
}): Promise<Response>;
