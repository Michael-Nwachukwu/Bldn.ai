import { create } from "zustand";

const useGlobalStore = create(set => ({
    cryptos: '',
    markets: '',
    globalMarketCap: '',
    globalVolume: '',
    btcDominance: '',
    ethDominance: '',
    change: '',
    gwei:[],
    
    fetchGlobal: async (baseUrl) => {
        try {
            // Fetch the trnding coins
            const response = await fetch(`${baseUrl}/global?x_cg_demo_api_key=CG-xEDfyZh1gVhZ5LFCEuzwUW6M`);
            if (!response.ok) throw new Error('Error fetching trending coins');
            const data = await response.json();
            // console.log(data);
            
            const cryptos = data.data.active_cryptocurrencies;
            const globalMarketCap = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.data.total_market_cap.usd);
            const globalVolume = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(data.data.total_volume.usd);
            const btcDominance = `${Math.ceil(data.data.market_cap_percentage.btc * 10) / 10}%`;
            const ethDominance = `${Math.ceil(data.data.market_cap_percentage.eth * 10) / 10}%`;
            const marketCapChangePercentage = data.data.market_cap_change_percentage_24h_usd;
            const markets = data.data.markets;
            
            set({
                cryptos: cryptos,
                globalMarketCap: globalMarketCap,
                globalVolume: globalVolume,
                btcDominance: btcDominance,
                ethDominance: ethDominance,
                change: marketCapChangePercentage,
                markets: markets
            });
    
        } catch (error) {
            console.error(error);
            alert(error);
        }
    },

    fetchGwei: async () => {
        try {
            const response = await fetch('https://beaconcha.in/api/v1/execution/gasnow');
            const data = await response.json();
        
            // Gas prices are provided in Wei, convert to Gwei
            const { rapid, fast, standard, slow } = data.data;
            const weiToGwei = 1e9;
        
            set({ gwei: [Math.ceil(rapid / weiToGwei), Math.ceil(fast / weiToGwei), Math.ceil(standard / weiToGwei), Math.ceil(slow / weiToGwei)] });
            
        } catch (error) {
            console.error('Error fetching gas prices: ', error);
        }
    }
  
}));

export default useGlobalStore;