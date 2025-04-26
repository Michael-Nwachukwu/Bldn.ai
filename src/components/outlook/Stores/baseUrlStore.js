import { create } from "zustand";

const useBaseUrl = create(() => ({
    baseUrl:'https://api.coingecko.com/api/v3'
}))

export default useBaseUrl;
