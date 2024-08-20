import { Event, Identify, MultibaseConfig, Properties, defaultConfig, isMultibaseConfigValid, multibaseConfigErrors } from "./types/base"
import { getSavedUser } from "./utils/user"
import { debugLog, getValidAddress, isBlockedUA, logError, logWarning } from "./utils"
import { CONFIG } from './constants';

let instance: Multibase;

export class Multibase {

    private __loaded: boolean = false
    private config: MultibaseConfig;
    private queuedEvents: Array<Event> = []
    private eventQueueTimer: any

    constructor() {
        this.config = defaultConfig
    }

    init(token: string, configuration?: Partial<MultibaseConfig>) {
        if (token == null || token === "") {
            logError("API key is required")
            return this
        }

        if (this.__loaded) {
            logWarning("Multibase SDK already initialized")
            return this
        }

        const isValid = isMultibaseConfigValid(configuration)

        if (!isValid) {
            const errors = multibaseConfigErrors(configuration)
            for (let err of errors) {
                logError(`Error in ${err.instancePath}: ${err.message}`);
            }
            logError("Invalid configuration for Multibase SDK")
            return this
        }

        this.__loaded = true
        this.config = {
            ...defaultConfig,
            token,
            ...configuration || {},
        }

        return this
    }

    track(event: string, properties?: Record<string, any>) {
        if (!this.__loaded) {
            logError("Multibase SDK not initialized")
            return
        }
        if (this.isDisabled()) return
        debugLog(`Tracking event '${event}'...`, this.config.debug)
        const e = new Event({
            name: event,
            properties,
        })

        this.queuedEvents.push(e)
        this.startEventQueueTimer()
    }

    async identify(address: string, properties?: Properties) {
        if (!this.__loaded) {
            logError("Multibase SDK not initialized")
            return
        }
        if (this.isDisabled()) return

        debugLog(`Identifying user with address '${address}'...`, this.config.debug)

        const validAddress = getValidAddress(address)
        if (validAddress == null) {
            logError("Invalid address")
            return
        }

        const identify = new Identify(validAddress, properties)

        await this.request({
            endpoint: "user/identify",
            body: identify.toJSON(),
        })
    }

    private isDisabled(): boolean {
        if (isBlockedUA()) return true
        if (!this.config.enabled) return true
        return false
    }

    private startEventQueueTimer() {
        if (this.isDisabled()) return
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

    private async executeEventQueue() {
        if (this.isDisabled()) return
        if (this.queuedEvents.length === 0) return
        await this.request({
            endpoint: "event/track",
            body: {
                events: this.queuedEvents.map((e) => e.toJSON()),
            },
        })
        this.queuedEvents = []
    }

    private async request(
        { endpoint, body }: { endpoint: string, body: object }) {
        const token = this.config.token;
        const user = getSavedUser()

        try {
            const res = await fetch(`${CONFIG.url}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': token
                },
                body: JSON.stringify({
                    ...user.toJSON(),
                    ...body,
                })
            })
            return res
        } catch {
            logError("There was an error connecting to the server.")
        }
        return null
    }
}

export function initAsModule() {
    instance = new Multibase()
    return instance
}

export function track(event: string, properties?: Properties) {
    if (instance == null) {
        logError("Multibase SDK not initialized")
        return
    }
    instance.track(event, properties)
}

export function identify(address: string, properties?: Properties) {
    if (instance == null) {
        logError("Multibase SDK not initialized")
        return
    }
    instance.identify(address, properties)
}

export function init(token: string, configuration?: Partial<MultibaseConfig>) {
    if (instance == null) {
        logError("Multibase SDK not initialized")
        return
    }
    instance.init(token, configuration)
}