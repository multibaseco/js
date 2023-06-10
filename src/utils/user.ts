import { generateUserId, getSaved, setSaved } from ".";
import { User, ValidIdentifyParameters } from "../types/base";

export function getSavedUser():User {
    let mbId = getSaved('mbjs_anonymous_id');
    if(mbId == null){
        mbId = generateUserId();
    }
    setSaved('mbjs_anonymous_id', mbId);
    const uid = getSaved('mbjs_user_id');
    const address = getSaved('mbjs_address');
    const chain = getSaved('mbjs_chain');
    const user = new User({
        anonymousId: mbId!,
        id: uid,
        address: address,
        chain: chain,
        properties: {},
    })
    return user;
}

export function resetAnonymousId() {
    setSaved('mbjs_anonymous_id', generateUserId());
}

export function associateUser(params: ValidIdentifyParameters){
    if(params == null) return
    if(params.type === "custom"){
        return associateUserByCustomID(params.id);
    }
    if(params.type === "address"){
        return associateUserByAddress(params.address, params.chain);
    }
}

function associateUserByCustomID(id: string){
    const existingId = getSaved('mbjs_user_id');
    if(existingId == null) {
        setSaved('mbjs_user_id', id);
        return
    }
    if(id === existingId) return
    resetAnonymousId();
    setSaved('mbjs_user_id', id);
}

function associateUserByAddress(address: string, chain: string){
    const existingAddress = getSaved("mbjs_address");
    const existingChain = getSaved("mbjs_chain");
    if(existingAddress === address && existingChain === address) return
    if(existingAddress == null && existingChain == null){
        setSaved("mbjs_address", address);
        setSaved("mbjs_chain", chain);
        return
    }
    // we know here that existingAddress is not null and existingChain is not null
    // we also know either existingAddress != address or existingChain != chain
    resetAnonymousId();
    setSaved("mbjs_address", address);
    setSaved("mbjs_chain", chain);
}