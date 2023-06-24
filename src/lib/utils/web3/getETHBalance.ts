const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const ETHERSCAN_API_BASE_URL = process.env.ETHERSCAN_API_BASE_URL || ''; 

export async function getETHBalance (address) {
    try {
        const result = await (await fetch(`${ETHERSCAN_API_BASE_URL}?module=account&action=balance&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`)).json();

        if (result?.message != 'OK') {
            return 0;
        }

        return parseInt(result.result) / (10 ** 18);
    } catch {}
}