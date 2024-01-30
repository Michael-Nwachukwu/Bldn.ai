import React, { useEffect, useState } from 'react'
import { Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import useWatchListStore from '../Stores/watchListStore'
import useGetUserIdStore from '../Stores/getUserIdStore'
import useTokenDetailsStore from '../Stores/tokenDetailsStore'
import useBaseUrl from '../Stores/baseUrlStore'

const Watchlist = () => {
    const watchlistStore = useWatchListStore(state => state.watchlist) || [];
    const fetchWatchList = useWatchListStore(state => state.fetchWatchList);
    const userId = useGetUserIdStore(state => state.userId);
    const fetchDetails = useTokenDetailsStore(state => state.fetchDetails);
    const baseUrl = useBaseUrl(state => state.baseUrl);

    const [localWatchlist, setLocalWatchlist] = useState(watchlistStore);

    useEffect(() => {
        setLocalWatchlist(watchlistStore);
        fetchWatchList(userId);
    }, [watchlistStore])
    
    return (
        <>
            <Menu isLazy>
                <MenuButton fontWeight={'semibold'} fontSize={'sm'}>⭐️Watchlist</MenuButton>
                <MenuList minH={20}>
                    {localWatchlist.length === 0 ? <MenuItem>Watchlist empty 🫤</MenuItem> : localWatchlist.map((coin, index) => (
                        <MenuItem key={index}>
                            <Link _hover={{ textDecoration:'none' }} onClick={() => fetchDetails(coin, baseUrl)}>
                                {coin}
                            </Link>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </>
    )
    
}

export default Watchlist