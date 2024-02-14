import { create } from "zustand";
import { supabase } from "../../../services/supabase";

// Function to update the watchlist in the profiles table
const updateWatchlist = async (userId, watchlist) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ watchlist: watchlist })
    .eq('id', userId)
    .select();

  if (error) {
    console.error('Error updating watchlist:', error.message);
  } else {
    console.log('Watchlist updated successfully:', data);
  }

};

const useWatchListStore = create( set => ({

  watchlist: [],

  fetchWatchList: async (userId) => {
    try {
      // Check if userId is a non-empty string before making the query
      if (!userId || typeof userId !== 'string') {
        console.error('Invalid userId:', userId);
        return [];
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('watchlist')
        .eq('id', userId);

      if (error) {
        console.error('Error fetching watchlist:', error.message);
        return [];
      }

      // Extract and return the watchlist array, ensuring it's not undefined
      const watchlist = data?.[0]?.watchlist || [];

      set({ watchlist });
      return watchlist;
    } catch (error) {
      console.error('Error fetching watchlist:', error.message);
      return [];
    }
  },

  addToWatchList: async (userId, coinId) => {
    
    // Fetch the existing watchlist
    const { data, error } = await supabase
      .from('profiles')
      .select('watchlist')
      .eq('id', userId);

    if (error) {
      console.error('Error fetching watchlist:', error.message);
      return;
    }

    // Extract existing watchlist array or initialize as an empty array
    const existingWatchlist = data?.[0]?.watchlist || [];

    // Add the new coin to the watchlist
    const newWatchlist = [...existingWatchlist, coinId];

    // Update the watchlist in the profiles table
    updateWatchlist(userId, newWatchlist);

    // set new updated watchlist
    set({ watchlist: newWatchlist });

  }
    
}))

export default useWatchListStore;