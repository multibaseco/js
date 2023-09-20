import { arbitrum, avalanche, bsc, ethereum, fantom, polygon } from "./chains";

const environment: string = process.env.NODE_ENV || "development";
const sdkLogUrl: string = environment === "production" ? "https://api.multibase.co/v1/log-sdk" : "http://localhost:8001";
const chains = [ethereum, polygon, arbitrum, fantom, bsc, avalanche];

export const CONFIG = {
    url: sdkLogUrl,
    chains: chains,
    name: "PACKAGE_NAME",
    version: "PACKAGE_VERSION",
}

export const BLOCKED_UAS = [
    'ahrefsbot',
    'baiduspider',
    'bingbot',
    'bingpreview',
    'facebookexternal',
    'petalbot',
    'pinterest',
    'prerender',
    'screaming frog',
    'yahoo! slurp',
    'yandexbot',

    'adsbot-google',
    'apis-google',
    'duplexweb-google',
    'feedfetcher-google',
    'google favicon',
    'google web preview',
    'google-read-aloud',
    'googlebot',
    'googleweblight',
    'mediapartners-google',
    'storebot-google'
]