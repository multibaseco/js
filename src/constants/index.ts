import { arbitrum, avalanche, bsc, ethereum, fantom, polygon } from "./chains";
import Ajv from "ajv"
export const ajv = new Ajv({allErrors: true})

const environment: string = process.env.NODE_ENV || "development";
const sdkLogUrl: string = environment === "production" ? "https://api.multibase.co" : "http://localhost:8001";
const chains = [ethereum, polygon, arbitrum, fantom, bsc, avalanche];

export const CONFIG = {
    url: sdkLogUrl,
    chains: chains,
    name: "PACKAGE_NAME",
    version: "PACKAGE_VERSION",
}