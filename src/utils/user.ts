import { generateUserId, getSaved, setSaved } from ".";
import { User } from "../types/base";

export function getSavedUser(): User {
    let mbId = getSaved('mbjs_anonymous_id');
    if (mbId == null) {
        mbId = generateUserId();
    }
    setSaved('mbjs_anonymous_id', mbId);
    const user = new User({
        anonymousId: mbId!,
        properties: {},
    })
    return user;
}