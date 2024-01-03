import { create } from "zustand";

const useCategoriesStore = create(set => ({
  trending: [],
  recentlyUpdated: [],
  trendingPools: [],
  fetchTrending: async (baseUrl) => {
    try {
      // Fetch the trnding coins
      const response = await fetch(`${baseUrl}/search/trending`);
      if (!response.ok) throw new Error('Error fetching trending coins');
      const data = await response.json();

      // Slice the first 3 items in response and map through to extract only the symbol, image, and price from the first 3 trending
      const trending = data.coins.slice(0, 3).map(coin => ({
        symbol: coin.item.symbol,
        image: coin.item.thumb,
        price: coin.item.data.price,
        priceChangePercentage24h: coin.item.data.price_change_percentage_24h.usd
      }))

      set({ trending: trending });
      // console.log(trending);

    } catch (error) {
      console.error(error);
      alert(error);
    }
  },

  fetchRecentlyUpdated: async () => {
    try {
      // Fetch the 3 top gainers from coingecko API
      const response = await fetch('https://api.geckoterminal.com/api/v2/tokens/info_recently_updated');
      if (!response.ok) throw new Error('Error fetching top gainers');
      const data = await response.json();
      // console.log('Top gainers Data:', data);

      // Extract only the symbol, image, and price from the response
      const recentlyUpdated = data.data.slice(0, 3).map(coin => ({
        symbol: coin.attributes.symbol,
        image: coin.attributes.image_url,
        price: coin.attributes.gt_score,
      }));
      set({ recentlyUpdated: recentlyUpdated });

      console.log(recentlyUpdated.price);

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
      // console.log(data);
  
      // Assuming 'data' is an array
      const trendingPools = data.data.slice(0, 3).map(pool => ({
        symbol: pool.attributes.name,
        volume: Math.round(pool.attributes.volume_usd.h24 * 100) / 100,
        network: pool.relationships.network.data.id,
      }));
  
      set({ trendingPools: trendingPools });
      // console.log(trendingPools);
  
    } catch (error) {
      console.error(error);
      alert(error);
    }
  },
  

}))

export default useCategoriesStore;
