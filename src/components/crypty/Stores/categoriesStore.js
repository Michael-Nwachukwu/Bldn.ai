import { create } from "zustand";
import useBaseUrl from './baseUrlStore';  // import useBaseUrl from baseUrlStore.js

const useCategoriesStore = create(set => ({
  trending: [],
  topGainers: [],
  trendingPools: [],
  fetchTrending: async () => {
    try {
      const baseUrl = useBaseUrl(state => state.baseUrl);

      // Fetch the trnding coins
      const response = await fetch(`${baseUrl}/search/trending`);
      if (!response.ok) throw new Error('Error fetching trending coins');
      const data = await response.json();

      // Slice the first 3 items in response and map through to extract only the symbol, image, and price from the first 3 trending
      const trending = data.slice(0, 3).map(coin => ({
        symbol: coin.item.symbol,
        image: coin.item.thumb,
        price: coin.item.data.price,
        priceChangePercentage24h: coin.item.data.price_change_percentage_24h.usd
      }))

      set({ trending: trending });

    } catch (error) {
      console.error(error);
      alert(error);
    }
  },

  fetchTopGainers: async () => {
    try {
      const baseUrl = useBaseUrl(state => state.baseUrl);

      // Fetch the 3 top gainers from coingecko API
      const response = await fetch(`${baseUrl}/coins/markets?vs_currency=usd&order=price_change_percentage_24h_desc&per_page=3&page=1&sparkline=false`);
      if (!response.ok) throw new Error('Error fetching top gainers');
      const data = await response.json();

      // Extract only the symbol, image, and price from the response
      const topGainers = data.map(coin => ({
        symbol: coin.symbol,
        image: coin.image,
        price: coin.current_price,
        priceChangePercentage24h: coin.price_change_percentage_24h,
      }));
      set({ topGainers: topGainers });

    } catch (error) {
      console.error(error);
      alert(error);
    }
  },


  fetchTrendingPools: async () => {
    try {
      const response = await fetch('https://api.geckoterminal.com/api/v2/networks/trending_pools');
      if (!response.ok) throw new Error('Error fetching trending pools');
      const data = await response.json();
      
      const trendingPools = data.slice(0, 3).map(pool => ({
        symbol: pool.attributes.name,
        volume: pool.attributes.volume_usd.h24,
        network: pool.relationships.network.data.id,
        image: pool.attributes.image_url,
        
      }));
      set({ trendingPools: trendingPools });

    } catch (error) {
      console.error(error);
      alert(error);
    }
  },
}))

export default useCategoriesStore;
