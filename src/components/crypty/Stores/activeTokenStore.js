import { create } from "zustand";

// Here i am controlling the activeToken state. First declaring the activeToken to be the one saved in local storage if available else set it to bitcoin. 
// Then the setActiveToken function: we call this function everytime the fetchDetails function is called to first update the state then save it to the localStorage for retrieval.

const useActiveTokenStore = create(set => ({
    activeToken: localStorage.getItem('activeToken') || 'bitcoin',
    setActiveToken: (input) => {
        set({ activeToken: input });
        localStorage.setItem('activeToken', input);
    }
}))

export default useActiveTokenStore;
