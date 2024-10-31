import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { BLOCKED_UAS } from '../constants';

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
    // get the current time
    const localNow = new Date();
    // the output of toISOString is always UTC.
    // format is always: YYYY-MM-DDTHH:mm:ss.sssZ
    // as long as we dont get to year 10000 any time soon.
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
    const isoString = localNow.toISOString();
    // the target format is yyyy-MM-dd HH:mm:ss.SSS
    // we can safely replace the T with a space, since T will never be in the format
    let outputString = isoString.replace('T', ' ');
    // we can safely remove the Z at the end, as it will always be the last character
    if(outputString.endsWith('Z')) {
        outputString = outputString.substring(0, outputString.length - 1);
    }
    return outputString;
}

export function debugLog(message: string, debug: boolean) {
    if (!debug) { return }
    console.log(`[@multibase/js] ${message}`);
}

export function logError(message: string) {
    console.error(`[@multibase/js] ${message}`);
}

export function logWarning(message: string) {
    console.warn(`[@multibase/js] ${message}`);
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
