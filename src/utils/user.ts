import { generateUserId, getSaved, setSaved } from ".";
import { User, ValidIdentifyParameters } from "../types/base";

export function getSavedUser():User {
    let mbId = getSaved('mbjs_anonymous_id');
    if(mbId == null){
        mbId = generateUserId();
    }
    setSaved('mbjs_anonymous_id', mbId);
    const address = getSaved('mbjs_address');
    const user = new User({
        anonymousId: mbId!,
        address: address,
        properties: {},
    })
    return user;
}

export function resetAnonymousId() {
    setSaved('mbjs_anonymous_id', generateUserId());
}

export function associateUser(params: ValidIdentifyParameters){
    if(params == null) return
    const { address } = params;
    const existingAddress = getSaved("mbjs_address");
    if(existingAddress === address) return
    if(existingAddress != null) resetAnonymousId();
    setSaved("mbjs_address", address);
}