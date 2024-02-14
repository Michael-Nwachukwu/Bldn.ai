import React, { useEffect, useState } from 'react'
import { Flex, Link, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from '@chakra-ui/react'
import useWatchListStore from '../Stores/watchListStore'
import useGetUserIdStore from '../Stores/getUserIdStore'
import useTokenDetailsStore from '../Stores/tokenDetailsStore'
import useBaseUrl from '../Stores/baseUrlStore'

const Watchlist = () => {
    const watchlist = useWatchListStore(state => state.watchlist) || [];
    const fetchWatchList = useWatchListStore(state => state.fetchWatchList);
    const userId = useGetUserIdStore(state => state.userId);
    const fetchDetails = useTokenDetailsStore(state => state.fetchDetails);
    const baseUrl = useBaseUrl(state => state.baseUrl);

    useEffect(() => {
        // fetch watchlist on mount
        fetchWatchList(userId);
    }, [userId]);


    return (
        <>
            <Menu isLazy>
                <MenuButton fontWeight={'semibold'} fontSize={'sm'} color={'black'}>
                    <Flex align={'center'} color={useColorModeValue('brand.700', 'gray.400')} gap={1} className='watchlist'>
                        <Text fontSize={'xs'}>
                            WATCHLIST
                        </Text>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" style={{ width:'15px' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </Flex>
                </MenuButton>
                <MenuList bg={useColorModeValue('#F7F1ED', '#0e1217')} zIndex={2}>
                    {watchlist.length === 0 ? <MenuItem>Watchlist empty 🫤</MenuItem> : watchlist.map((coin, index) => (
                        <MenuItem key={index} bg={useColorModeValue('#F7F1ED', '#0e1217')} border={'30px'} borderColor={'brand.700'} shadow={'lg'} _hover={{ bg:'brand.300', color:'white' }} zIndex={2} onClick={() => fetchDetails(coin, baseUrl)}>
                            <Link _hover={{ textDecoration:'none' }}>
                                {coin}
                            </Link>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </>
    )
}

export default Watchlist;
