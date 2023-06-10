import { Chain } from "../types/base"

export const ethereum: Chain = {
    id: 1,
    multibaseId: 'eth',
    validIds: ["eth", "ethereum", "mainnet", "homestead"] 
}

export const arbitrum: Chain = {
    id: 42_161,
    multibaseId: 'arb',
    validIds: ["arb", "arbitrum", "arbitrum-one"]
}

export const polygon: Chain = {
    id: 137,
    multibaseId: 'matic',
    validIds: ["matic", "polygon", "polygon-pos", "polygon-pos-v1"]
}

export const avalanche: Chain = {
    id: 43_114,
    multibaseId: 'avax',
    validIds: ["avax", "avalanche", "avalanche-mainnet", "avalanche-c-chain"]
}

export const fantom: Chain = {
    id: 250,
    multibaseId: 'ftm',
    validIds: ["ftm", "fantom", "fantom-mainnet"]
}

export const bsc: Chain = {
    id: 56,
    multibaseId: 'bsc',
    validIds: ["bsc", "binance", "binance-smart-chain", "binance-smart-chain-mainnet"]
}