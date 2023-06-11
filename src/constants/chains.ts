import { Chain } from "../types/base"

export const ethereum: Chain = {
    id: 1,
    multibaseId: 'eth',
    validIds: ["1", "eth", "ethereum", "mainnet", "homestead"] 
}

export const arbitrum: Chain = {
    id: 42_161,
    multibaseId: 'arb',
    validIds: ["42_161", "42161", "arb", "arbitrum", "arbitrum-one"]
}

export const polygon: Chain = {
    id: 137,
    multibaseId: 'matic',
    validIds: ["137", "matic", "polygon", "polygon-pos", "polygon-pos-v1"]
}

export const avalanche: Chain = {
    id: 43_114,
    multibaseId: 'avax',
    validIds: ["43_114", "43114", "avax", "avalanche", "avalanche-mainnet", "avalanche-c-chain"]
}

export const fantom: Chain = {
    id: 250,
    multibaseId: 'ftm',
    validIds: ["250", "ftm", "fantom", "fantom-mainnet"]
}

export const bsc: Chain = {
    id: 56,
    multibaseId: 'bsc',
    validIds: ["56", "bsc", "binance", "binance-smart-chain", "binance-smart-chain-mainnet"]
}