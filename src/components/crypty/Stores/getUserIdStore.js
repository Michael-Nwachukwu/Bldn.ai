import { create } from "zustand";
import { supabase } from "../../../services/supabase";

const useGetUserIdStore = create(set => ({
    userId: '',
    getUserId: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        set({ userId: user.id });
    }
}))

export default useGetUserIdStore;
