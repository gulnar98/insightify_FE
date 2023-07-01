import { getETHBalance } from "./getETHBalance";
import { getTopAssets } from "./getTopAssets";
import { getWalletAge } from "./getWalletAge";
import { getWalletENS } from "./getWalletENS";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const ETHERSCAN_API_BASE_URL = process.env.ETHERSCAN_API_BASE_URL || ''; 

export async function getWeb3Data (wallets) {
    const statistics = {};
    for(let [wallet, address] of Object.entries(wallets)) {
        if (!Object.hasOwn(statistics, wallet)) {
            statistics[wallet] = {
                address
            };
        }

        statistics[wallet].balance = await getETHBalance(address);
        statistics[wallet].age = await getWalletAge(address);
        statistics[wallet].ens = await getWalletENS(address);
        statistics[wallet].topAssets = await getTopAssets(address);
    }

    return statistics;
}