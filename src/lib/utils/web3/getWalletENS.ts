const BLOCKSPAN_API_KEY = process.env.BLOCKSPAN_API_KEY || '';
const BLOCKSPAN_API_BASE_URL = process.env.BLOCKSPAN_API_BASE_URL || ''; 

export async function getWalletENS (address) {
    try {
        const result = await (await fetch(`${BLOCKSPAN_API_BASE_URL}/ens/addresses/search/?addresses=${address}`, {
            headers: {
                'X-API-KEY': BLOCKSPAN_API_KEY
            }
        })).json();

        return result;
    } catch {}

    return [
        ""
    ];
}