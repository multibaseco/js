import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { BLOCKED_UAS } from '../constants';
import { IdentifyParams, ValidIdentifyParameters } from '../types/base';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

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

// export function getExactUTCTimeISO() {
//     const nowUTC = moment().utc().format("YYYY-MM-DD HH:mm:ss.SSS");
//     return nowUTC;
// }
export function getExactUTCTimeISO() {
    const utcDate = utcToZonedTime(new Date(), 'Etc/UTC');
    return format(utcDate, 'yyyy-MM-dd HH:mm:ss.SSS');
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

    const { address, properties } = params;
    const validAddress = getValidAddress(address);
    if (validAddress == null) return { isValid: false, message: "Missing or invalid 'address' parameter for 'identify' call.", params: null };
    return { isValid: true, message: null, params: { address: validAddress, properties } };
}

export function validateAddress(address: string) {
    return /^(0x)?[0-9a-f]{40}$/i.test(address);
}

export function getValidAddress(address: string) {
    if (!validateAddress(address)) return null;
    return address.toLowerCase();
}

export function isBlockedUA() {
    const userAgent = navigator.userAgent;
    const ua = userAgent.toLowerCase();
    return BLOCKED_UAS.some((b) => ua.includes(b));
}