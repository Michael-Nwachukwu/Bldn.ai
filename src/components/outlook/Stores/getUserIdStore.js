import { create } from "zustand";
import { supabase } from "../../../services/supabase";

const useGetUserIdStore = create( set => ({
    userId: '',
    getUserId: async () => {
        console.log('getUserId called');  // Debug log
        const { data: { user } } = await supabase.auth.getUser();
        console.log('User ID:', user.id);  // Debug log
        set({ userId: user.id });
    }
}))

export default useGetUserIdStore;