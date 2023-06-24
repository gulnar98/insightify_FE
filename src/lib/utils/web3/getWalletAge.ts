const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const ETHERSCAN_API_BASE_URL = process.env.ETHERSCAN_API_BASE_URL || ''; 

export async function getWalletAge (address) {
    try {
        const result = await (await fetch(`${ETHERSCAN_API_BASE_URL}?module=account&action=txlist&address=${address}&apikey=${ETHERSCAN_API_KEY}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc`)).json();

        if (result?.message != 'OK') {
            return 0;
        }

        const seconds = (Date.now() / 1000) - result?.result?.[0]?.timeStamp;
        return Math.floor(seconds / (60 * 60 * 24));
    } catch {}

    return 0;
}