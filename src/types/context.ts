export interface Context {
    ip?: string;
    locale?: string;
    location?: {
        city?: string;
        country?: string;
        latitude?: number;
        longitude?: number;
        region?: string;
    }
    page?: {
        path?: string;
        referrer?: string;
        search?: string;
        title?: string;
        url?: string;
    }
    userAgent?: string;
    userAgentData?: {
        brands?: {
            brand?: string;
            version?: string;
        }[]
        mobile?: boolean;
        platform?: string;
        architecture?: string;
        bitness?: number; 
        model?: string;
        platformVersion?: string;
    }
    library?: {
        name: string;
        version: string;
    }
    campaign?: {
        name?: string;
        source?: string;
        medium?: string;
        term?: string;
        content?: string;
    }
    referrer?: {
        id?: string;
        type?: string;
        name?: string;
        url?: string;
        link?: string;
    }
    os?: {
        name?: string;
        version?: string;
    }
    device?: {
        id?: string;
        type?: string;
        manufacturer?: string;
        model?: string;
    }
    screen?: {
        width?: number;
        height?: number;
        density?: number;
    }
    timezone?: string;
    headers?: object;
    network?: {
        bluetooth?: boolean;
        carrier?: string;
        cellular?: boolean;
        wifi?: boolean;
    }
}

