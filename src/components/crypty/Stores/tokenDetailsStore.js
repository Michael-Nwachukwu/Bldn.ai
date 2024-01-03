import { create } from "zustand";

const getAssetPlatformId = async (contractAddress) => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
    const data = await response.json();
    const coin = data.find(coin => coin.contract_address === contractAddress);
    return coin ? coin.id : null;
}

const formatUsdCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

const useTokenDetailsStore = create(set => ({
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
    
    fetchDetails: async (input) => {
        let url;
        const isContractAddress = /^0x[a-fA-F0-9]{40}$/.test(input);

        if (isContractAddress) {
            const assetPlatformId = await getAssetPlatformId(input);
            url = `https://api.coingecko.com/api/v3/coins/${assetPlatformId}/contract/${input}`;
        } else {
            url = `https://api.coingecko.com/api/v3/coins/${input}`;
        }

        try {
            // const response = await axios.get(url);
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error fetching token details');
            const data = await response.json();
            console.log(data);

            const tokenChartResponse = await fetch(url + '/market_chart/?vs_currency=usd&days=7');
            if (!tokenChartResponse.ok) throw new Error('Error fetching another API');
            const tokenData = await tokenChartResponse.json();
            console.log(tokenData.prices);

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
            const ath = data.market_data.ath.usd;
            const athChangePercentage = data.market_data.ath_change_percentage.usd;
            const athDate = data.market_data.ath_date.usd;
            const atl = data.market_data.atl.usd;
            const atlChangePercentage = data.market_data.atl_change_percentage.usd;
            const atlDate = data.market_data.atl_date.usd;
            const totalSupply = data.market_data.total_supply;
            const circulatingSupply = data.market_data.circulating_supply;
            const description = data.description.en;
            const tokenChartData = tokenData.prices;

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
                
                tokenChart: tokenChartData
            });
            
        } catch (error) {
            // set({ error: 'Coin not found' });
            alert(error);
        }
    },

}));

export default useTokenDetailsStore;