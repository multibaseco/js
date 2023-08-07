import { Event, IMultibaseCore, Identify, IdentifyParams, MultibaseConfig, User, ValidIdentifyParameters, defaultConfig, validateMultibaseConfig } from "./types/base"
import { associateUser, getSavedUser } from "./utils/user"
import { postRequest } from "./utils/connector"
import { debugLog, logError, validateIdentifyParams } from "./utils"
import { TypeError } from "./exceptions"

let multibase: MultibaseCore | null = null

class MultibaseCore implements IMultibaseCore {

    apiKey: string
    config: MultibaseConfig
    queuedEvents: Array<Event> = []
    eventQueueTimer: any

    constructor({ apiKey, configuration }: { apiKey: string, configuration: MultibaseConfig }) {
        this.apiKey = apiKey
        this.config = configuration
    }

    getUser(): User {
        return getSavedUser()
    }

    getAPIKey() {
        return this.apiKey
    }

    addToEventQueue(event: string, properties: object) {
        if (!this.config.enabled) return
        debugLog(`Tracking event '${event}'...`, this.config.debug)
        const e = new Event({
            name: event,
            properties,
        })

        this.queuedEvents.push(e)
        this.startEventQueueTimer()
    }

    startEventQueueTimer() {
        if (!this.config.enabled) return
        if (this.eventQueueTimer) {
            clearTimeout(this.eventQueueTimer)
        }

        this.eventQueueTimer = setTimeout(async () => {
            try {
                await this.executeEventQueue()
            } catch {
                logError("There was an error executing the event queue")
            }
        }, 1000)
    }

    async executeEventQueue() {
        if (!this.config.enabled) return
        if(this.queuedEvents.length === 0) return
        await postRequest({
            endpoint: "event/track",
            body: {
                events: this.queuedEvents.map((e) => e.toJSON()),
            },
            client: this,
        })
        this.queuedEvents = []
    }

    async identify(params: ValidIdentifyParameters) {
        if (!this.config.enabled) return
        const identify = new Identify(params)
        associateUser(params)

        await postRequest({
            endpoint: "user/identify",
            body: identify.toJSON(),
            client: this,
        })
    }
}

function init(apiKey: string, configuration?: MultibaseConfig) {
    if (typeof window === 'undefined') return
    const mc: MultibaseConfig = {
        ...defaultConfig,
        ...configuration || {},
    }
    if (!validateMultibaseConfig(mc)) {
        const errors = validateMultibaseConfig.errors || []
        for (let err of errors) {
            logError(`Error in ${err.instancePath}: ${err.message}`);
        }
        throw new TypeError("Invalid 'init' configuration.");
    }
    debugLog("Initializing Multibase SDK...", mc.debug)
    const sdkInstance = multibase
    if (sdkInstance != null) {
        return
    }
    multibase = new MultibaseCore({ apiKey, configuration: mc })
}

function track(event: string, properties: object) {
    if (multibase == null) {
        logError("Multibase SDK not initialized")
        return
    }
    multibase.addToEventQueue(event, properties)
}

async function identify(params: IdentifyParams) {
    if (multibase == null) {
        logError("Multibase SDK not initialized")
        return
    }
    const validationObj = validateIdentifyParams(params)
    const { isValid, message, params: validatedParams } = validationObj
    if (!isValid) {
        logError(message)
        return
    }
    // try {
        await multibase.identify(validatedParams)
    // } catch (e) {
    //     console.error(e)
    //     logError("There was an unknown error identifying the user")
    // }
}

export { init, track, identify }