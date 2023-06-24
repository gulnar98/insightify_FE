import { getWeb3Data } from "./web3";

const X_RAPID_API_KEY = process.env.X_RAPID_API_KEY || '';

export function detectBrowserByUserAgent (userAgent: string) {
    userAgent = userAgent.toLowerCase();

    if (userAgent.includes('firefox')) {
        return 'firefox';
    } else if (userAgent.includes('chrome')) {
        return 'chrome';
    } else if (userAgent.includes('safari')) {
        return 'safari';
    } else if (userAgent.includes('opera')) {
        return 'opera';
    } else if (userAgent.includes('edge')) {
        return 'edge';
    } else if (userAgent.includes('msie')) {
        return 'msie';
    } else {
        return 'unknown'
    }
}

export async function getGeolocationByIp (ip) {
    try {
        const result = await (await fetch(`https://ip-geo-location.p.rapidapi.com/ip/${ip}?format=json`, {
            headers: {
                'X-RapidAPI-Key': X_RAPID_API_KEY,
                'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
            }
        })).json();

        return result;
    } catch {
        return {};
    }
}

export const getNormalizedTime = (milliseconds: number): string => {
    milliseconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(milliseconds / 3600);
    const seconds = milliseconds % 60;
    if (isNaN(minutes) || isNaN(seconds)) {
        return '0:0';
    }
    return `${minutes}:${seconds}`;
}

export {
    getWeb3Data
};