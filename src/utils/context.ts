import { CONFIG } from "../constants";
import { Context } from "../types/context";

type campaign = {
    name?: string;
    source?: string;
    medium?: string;
    term?: string;
    content?: string;
}

function getCampaignFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const keys = ["utm_campaign", "utm_source", "utm_medium", "utm_term", "utm_content"]
    if (!keys.every(key => urlParams.has(key))) {
        return null;
    }

    const campaign: campaign = {}
    if(urlParams.get("utm_campaign")) campaign.name = urlParams.get("utm_campaign")!
    if(urlParams.get("utm_source")) campaign.source = urlParams.get("utm_source")!
    if(urlParams.get("utm_medium")) campaign.medium = urlParams.get("utm_medium")!
    if(urlParams.get("utm_term")) campaign.term = urlParams.get("utm_term")!
    if(urlParams.get("utm_content")) campaign.content = urlParams.get("utm_content")!

    return campaign;
}

type referrer = {
    name?: string;
    url?: string;
    link?: string;
}

function getReferrerFromURL() {
    if(document.referrer === "") return null;
    const referrerUrl = new URL(document.referrer);
    const referrer: referrer = {}

    if(referrerUrl.hostname) referrer.name = referrerUrl.hostname
    if(referrerUrl.href) referrer.url = referrerUrl.href
    if(referrerUrl.origin) referrer.link = referrerUrl.origin

    return referrer;
}

function getPage(){
    const vals = [
        window.location.pathname,
        document.referrer,
        window.location.search,
        document.title,
        window.location.href,
    ]
    // if all null, return null
    if(vals.every(val => val === "" || val == null)) return null;
    return {
        path: window.location.pathname,
        referrer: document.referrer,
        search: window.location.search,
        title: document.title,
        url: window.location.href,
    }
}

export function generateContext():Context {
    const locale = navigator.language;
    const userAgent = navigator.userAgent;
    const userAgentData = navigator.userAgentData;
    const page = getPage()
    const library = { name: CONFIG.name, version: CONFIG.version}
    const campaign = getCampaignFromURL()
    const referrer = getReferrerFromURL()
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const context: Context = {}
    if(locale) context.locale = locale
    if(userAgent) context.userAgent = userAgent
    if(userAgentData) context.userAgentData = userAgentData
    if(page) context.page = page
    if(library) context.library = library
    if(campaign) context.campaign = campaign
    if(referrer) context.referrer = referrer
    if(timezone) context.timezone = timezone

    return context;
}