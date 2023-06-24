const BLOCKSPAN_API_KEY = process.env.BLOCKSPAN_API_KEY || '';
const BLOCKSPAN_API_BASE_URL = process.env.BLOCKSPAN_API_BASE_URL || ''; 

interface NFTInfo {
    name: string;
    quantity: number;
    description: string;
    url: string;
}

interface Tokens {
    [key: string]: NFTInfo
}

export async function getTopAssets (address) {
    const tokens: Tokens = {};
    
    const pageSize = 100;
    let cursor = undefined;

    while (cursor !== null) {
        try {
            const response = await (await fetch(`${BLOCKSPAN_API_BASE_URL}/nfts/owner/${address}?chain=eth-main&include_nft_details=true&page_size=${pageSize}&${cursor ? '&cursor=' + cursor : ''}`, {
                headers: {
                    'X-API-KEY': BLOCKSPAN_API_KEY
                }
            })).json();

            cursor = response?.cursor;

            for(let result of response?.results || []) {
                const quantity = parseInt(result?.quantity);
                if (result?.nft_details?.token_name && Object.hasOwn(tokens, result?.nft_details?.token_name)) {
                    tokens[result.nft_details.token_name].quantity += !isNaN(quantity) ? quantity : 0;
                } else if (result?.nft_details?.token_name) {
                    tokens[result.nft_details.token_name] = {
                        name: result.nft_details.token_name,
                        quantity: !isNaN(quantity) ? quantity : 0,
                        description: result?.nft_details?.token_description,
                        url: result?.nft_details?.metadata?.url
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    return Object.fromEntries(Object.entries(tokens).sort((a: [string, NFTInfo], b: [string, NFTInfo]) => a[1].quantity - b[1].quantity).slice(0, 3));
}