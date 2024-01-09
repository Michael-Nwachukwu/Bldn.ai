import { create } from "zustand";
import useActiveTokenStore from "./activeTokenStore";

const getAssetPlatformId = async (contractAddress) => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/list?x_cg_demo_api_key=CG-xEDfyZh1gVhZ5LFCEuzwUW6M');
    const data = await response.json();
    const coin = data.find(coin => coin.contract_address === contractAddress);
    return coin ? coin.id : null;
}

const formatUsdCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}


const useTokenDetailsStore = create(set => ({
    // ... (other state variables)
    price: '',
    name: '',
    symbol: '',
    priceChangePercentageDaily: '',
    image: '',
    marketCap: '',
    tradingVolume: '',
    fdv: '',
    dailyLow: '',
    dailyHigh: '',
    marketCapRank: '',
    ath: '',
    athChangePercentage: '',
    athDate: '',
    atl: '',
    atlChangePercentage: '',
    atlDate: '',
    totalSupply: '',
    circulatingSupply: '',
    description: '',
    tokenChart: [],
    loading: false,

    fetchDetails: (input, baseUrl) => {
        set({ loading: true });
        
        let url;
        const isContractAddress = /^0x[a-fA-F0-9]{40}$/.test(input);

        if (isContractAddress) {
            // ... (same as before)
        } else {
            url = `${baseUrl}/coins/${input}?x_cg_demo_api_key=CG-xEDfyZh1gVhZ5LFCEuzwUW6M`;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorResponse => {
                        console.log('Error fetching token details:', errorResponse);
                        throw new Error('Error fetching token details');
                    });
                }
                return response.json();
            })
            .then(data => {
                // Split the URL at the "?" character, insert the new string, and join them back together
                const urlParts = url.split('?');
                const chartUrl = `${urlParts[0]}/market_chart/?vs_currency=usd&days=7?${urlParts[1]}`;

                fetch(chartUrl)
                    .then(tokenChartResponse => {
                        if (!tokenChartResponse.ok) {
                            return tokenChartResponse.json().then(tokenChartError => {
                                console.log('Error fetching market chart:', tokenChartError);
                                throw new Error('Error fetching market chart');
                            });
                        }
                        return tokenChartResponse.json();
                    })
                    .then(tokenData => {
                        // Process token data and update state
                        const price = formatUsdCurrency(data.market_data.current_price.usd);
                        const name = data.name;
                        const symbol = data.symbol;
                        const priceChangePercentageDaily = data.market_data.price_change_percentage_24h;
                        const image = data.image.thumb;
                        const marketCap =  formatUsdCurrency(data.market_data.market_cap.usd);
                        const tradingVolume = formatUsdCurrency(data.market_data.total_volume.usd);
                        const fdv = formatUsdCurrency(data.market_data.fully_diluted_valuation.usd);
                        const dailyLow = formatUsdCurrency(data.market_data.low_24h.usd);
                        const dailyHigh = formatUsdCurrency(data.market_data.high_24h.usd);
                        const marketCapRank = data.market_data.market_cap_rank;
                        const ath = formatUsdCurrency(data.market_data.ath.usd);
                        const athChangePercentage = data.market_data.ath_change_percentage.usd;
                        const athDate = data.market_data.ath_date.usd;
                        const atl = formatUsdCurrency(data.market_data.atl.usd);
                        const atlChangePercentage = data.market_data.atl_change_percentage.usd;
                        const atlDate = data.market_data.atl_date.usd;
                        const totalSupply = data.market_data.total_supply;
                        const circulatingSupply = data.market_data.circulating_supply;
                        const description = data.description.en;
                        const tokenChartData = tokenData.prices;
                        // ... (rest of the processing)
                        
                        set({
                            price: price,
                            name: name,
                            symbol: symbol,
                            priceChangePercentageDaily: priceChangePercentageDaily,
                            image: image,
                            marketCap: marketCap,
                            tradingVolume: tradingVolume,
                            fdv: fdv,
                            dailyLow: dailyLow,
                            dailyHigh: dailyHigh,
                            marketCapRank: marketCapRank,
                            ath: ath,
                            athChangePercentage: athChangePercentage,
                            athDate: athDate,
                            atl: atl,
                            atlChangePercentage: atlChangePercentage,
                            atlDate: atlDate,
                            description: description,
                            totalSupply: totalSupply,
                            circulatingSupply: circulatingSupply,
                            
                            tokenChart: tokenChartData,
                            loading: false
                        });
                    })
                    .catch(tokenChartError => {
                        console.error('Error fetching market chart:', tokenChartError);
                        // Handle market chart error if needed
                        set({ loading: false });
                    });
            })
            .catch(error => {
                console.error('Error fetching token details:', error);
                // Handle token details error if needed
                set({ loading: false });
            });
    },
}));

export default useTokenDetailsStore;
