import { create } from "zustand";

const useActiveTokenStore = create(() => ({
    activeToken: 'ethereum'
}))

export default useActiveTokenStore;
