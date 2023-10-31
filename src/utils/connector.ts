import { logError } from "."
import { CONFIG } from "../constants"
import { IMultibaseCore } from "../types/base"

export async function postRequest(
    { endpoint, body, client }: { endpoint: string, body: object, client: IMultibaseCore }) {
    const apiKey = client.getAPIKey()
    const user = client.getUser()

    try {
        const res = await fetch(`${CONFIG.url}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            },
            body: JSON.stringify({
                ...user.toJSON(),
                ...body,
            })
        })
        return res
    }catch{
        logError("There was an error connecting to the server.")
    }
    return null
}