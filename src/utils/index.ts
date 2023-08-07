import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Cookies from 'js-cookie';
import { CONFIG } from '../constants';
import { IdentifyParams, ValidIdentifyParameters } from '../types/base';

export function getSaved(key: string) {
    // first check if cookie exists
    const cookieValue = getCookie(key);
    const storageValue = getStorage(key);
    if (cookieValue != null && storageValue != null) {
        if (cookieValue === storageValue) {
            // 99% of the time, this will be the case
            return cookieValue;
        }
        if (cookieValue !== storageValue) {
            // if cookie and storage are different, use cookie and update storage
            setStorage(key, cookieValue);
            return cookieValue;
        }
    }

    if (cookieValue != null && storageValue == null) {
        setStorage(key, cookieValue);
        return cookieValue;
    }

    if (cookieValue == null && storageValue != null) {
        setCookie(key, storageValue, 365);
        return storageValue;
    }

    return undefined
}

export function setSaved(key: string, value: string) {
    setCookie(key, value, 365);
    setStorage(key, value);
}

function setStorage(key: string, value: string) {
    localStorage.setItem(key, value);
}

function getStorage(key: string): string | null {
    const value = localStorage.getItem(key);
    return value ? value : null;
}

function getCookie(name: string): string | null {
    const cookie = Cookies.get(name);
    return cookie ? cookie : null;
}

function setCookie(key: string, value: string, days: number) {
    Cookies.set(key, value, { expires: days });
}

export function generateUserId() {
    return uuidv4();
}

export function getExactUTCTimeISO() {
    const nowUTC = moment().utc().format("YYYY-MM-DD HH:mm:ss.SSS");
    return nowUTC;
}

export function debugLog(message: string, debug: boolean) {
    if (!debug) { return }
    console.log(`[@multibase/js] ${message}`);
}

export function logError(message: string) {
    console.error(`[@multibase/js] ${message}`);
}

export function validateIdentifyParams(params: IdentifyParams): | {
    isValid: true,
    message: null,
    params: ValidIdentifyParameters,
    properties?: object
} | {
    isValid: false,
    message: string,
    params: null,
    properties?: object
} {
    if (params == null) {
        return { isValid: false, message: "Missing parameters for 'identify' call.", params: null };
    }

    const { address, chain, properties } = params;
    const validAddress = getValidAddress(address);
    if (validAddress == null) return { isValid: false, message: "Missing or invalid 'address' parameter for 'identify' call.", params: null };
    const validChain = getValidChain(chain);
    if (validChain == null) return { isValid: false, message: "Missing or invalid 'chain' parameter for 'identify' call.", params: null };
    return { isValid: true, message: null, params: { address: validAddress, chain: validChain, properties } };
}

export function validateAddress(address: string) {
    return /^(0x)?[0-9a-f]{40}$/i.test(address);
}

export function getValidAddress(address: string) {
    if (!validateAddress(address)) return null;
    return address.toLowerCase();
}

export function validateChain(chain: string | number) {
    // if chain is number, parse int and check
    if (typeof chain === 'number') {
        const chainInt = Math.floor(chain);
        const isValid = CONFIG.chains.some((c) => c.id === chainInt);
        return isValid;
    }

    if (typeof chain !== 'string') {
        const isValid = CONFIG.chains.some((c) => c.validIds.includes(chain));
        return isValid;
    }

    return false;
}

export function getValidChain(chain: string | number) {
    if (typeof chain === 'number') {
        const chainInt = Math.floor(chain);
        const chainObj = CONFIG.chains.find((c) => c.id === chainInt);
        if (chainObj == null) return null;
        return chainObj!.multibaseId;
    }

    if (typeof chain === 'string') {
        const chainObj = CONFIG.chains.find((c) => c.validIds.includes(chain));
        if (chainObj == null) return null;
        return chainObj!.multibaseId;
    }

    return null;
}