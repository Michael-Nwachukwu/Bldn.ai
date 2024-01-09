import { create } from "zustand";
import useActiveTokenStore from "./activeTokenStore";

var getAssetPlatformId = async (contractAddress) => {
    var response = await fetch('https://api.coingecko.com/api/v3/coins/list?x_cg_demo_api_key=CG-xEDfyZh1gVhZ5LFCEuzwUW6M');
    var data = await response.json();
    var coin = data.find(coin => coin.contract_address === contractAddress);
    return coin ? coin.id : null;
}

var formatUsdCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

var useTokenDetailsStore = create(set => ({
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
    
    fetchDetails: async (input, baseUrl) => {
        set({ loading: true });
        let url;
        var isContractAddress = /^0x[a-fA-F0-9]{40}$/.test(input);

        if (isContractAddress) {
            var assetPlatformId = await getAssetPlatformId(input);
            url = `${baseUrl}/coins/${assetPlatformId}/contract/${input}?x_cg_demo_api_key=CG-xEDfyZh1gVhZ5LFCEuzwUW6M`;
        } else {
            url = `${baseUrl}/coins/${input}?x_cg_demo_api_key=CG-xEDfyZh1gVhZ5LFCEuzwUW6M`;
        }

        try {
            // var response = await axios.get(url);
            var response = await fetch(url);
            if (!response.ok) throw new Error('Error fetching token details');
            useActiveTokenStore.setState({ activeToken: input });
            var data = await response.json();
            // console.log(data);

            // Split the URL at the "?" character, insert the new string, and join them back together
            var urlParts = url.split('?');
            var chartUrl = `${urlParts[0]}/market_chart/?vs_currency=usd&days=7?${urlParts[1]}`;

            var tokenChartResponse = await fetch(chartUrl);
            if (!tokenChartResponse.ok) throw new Error('Error fetching market chart');
            var tokenData = await tokenChartResponse.json();
            // console.log(tokenData.prices);


            var price = formatUsdCurrency(data.market_data.current_price.usd);
            var name = data.name;
            var symbol = data.symbol;
            var priceChangePercentageDaily = data.market_data.price_change_percentage_24h;
            var image = data.image.thumb;
            var marketCap =  formatUsdCurrency(data.market_data.market_cap.usd);
            var tradingVolume = formatUsdCurrency(data.market_data.total_volume.usd);
            var fdv = formatUsdCurrency(data.market_data.fully_diluted_valuation.usd);
            var dailyLow = formatUsdCurrency(data.market_data.low_24h.usd);
            var dailyHigh = formatUsdCurrency(data.market_data.high_24h.usd);
            var marketCapRank = data.market_data.market_cap_rank;
            var ath = formatUsdCurrency(data.market_data.ath.usd);
            var athChangePercentage = data.market_data.ath_change_percentage.usd;
            var athDate = data.market_data.ath_date.usd;
            var atl = formatUsdCurrency(data.market_data.atl.usd);
            var atlChangePercentage = data.market_data.atl_change_percentage.usd;
            var atlDate = data.market_data.atl_date.usd;
            var totalSupply = data.market_data.total_supply;
            var circulatingSupply = data.market_data.circulating_supply;
            var description = data.description.en;
            var tokenChartData = tokenData.prices;


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
            
        } catch (error) {
            // set({ error: 'Coin not found' });
            alert(error);
        }
    },

}));

export default useTokenDetailsStore;