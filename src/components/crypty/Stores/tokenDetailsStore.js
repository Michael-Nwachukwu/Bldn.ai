import { create } from "zustand";

const getAssetPlatformId = async (contractAddress) => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
    const data = await response.json();
    const coin = data.find(coin => coin.contract_address === contractAddress);
    return coin ? coin.id : null;
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
    dailyLowHigh: '',
    weeklyLowHigh: '',
    marketCapRank: '',
    marketCapDominance: '',
    ath: '',
    athChangePercentage: '',
    athDate: '',
    atl: '',
    atlChangePercentage: '',
    atlDate: '',
    tokenChart: [],
    description: '',
    
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
            if (!response.ok) throw new Error('Error fetching trending coins');
            const data = await response.json();
            console.log(data);

            const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.market_data.current_price.usd);
            const name = data.name;
            const symbol = data.symbol;
            const priceChangePercentageDaily = data.market_data.price_change_percentage_24h;
            const image = data.image.thumb;
            
            



            set({
                price: price,
                name: name,
                symbol: symbol,
                priceChangePercentageDaily: priceChangePercentageDaily,
                image: image,
            });
        } catch (error) {
            // set({ error: 'Coin not found' });
            alert(error);
        }
    },

}));

export default useTokenDetailsStore;