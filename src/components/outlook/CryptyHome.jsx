import { Box, Flex, Spacer, Grid, GridItem, useColorMode, Skeleton, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState, useRef } from 'react'

import Chart from './Chart'
import PriceStats from './Micros/PriceStats'
import GlobalMarket from './GlobalMarket'

import WatchlistBtn from './Micros/WatchlistBtn'
import ListDetails from './ListDetails'
import SearchInput from './Micros/SearchInput'
import Categories from './Categories'
import TokenDetailsCard from './TokenDetailsCard'
import TokenDescription from './TokenDescription'
import LineGlobalStats from './LineGlobalStats'

import useTokenDetailsStore from './Stores/tokenDetailsStore'
import useGlobalStore from './Stores/globalMarketStore'
import useBaseUrl from './Stores/baseUrlStore'
import useActiveTokenStore from './Stores/activeTokenStore'
import useWatchListStore from './Stores/watchListStore'
import useGetUserIdStore from './Stores/getUserIdStore'

const CryptyHome = () => {
    const baseUrl = useBaseUrl(state => state.baseUrl);
    const activeToken = useActiveTokenStore(state => state.activeToken);
    const fetchDetails = useTokenDetailsStore(state => state.fetchDetails);
    const fetchGlobal = useGlobalStore(state => state.fetchGlobal);

    const [globalLoading, setGlobalLoading] = useState(false);
    const [tokenLoading, setTokenLoading] = useState(false);

    const fetchWatchList = useWatchListStore(state => state.fetchWatchList);
    const userId = useGetUserIdStore(state => state.userId);


    const { colorMode } = useColorMode()

    const color = useColorModeValue('gray', '#dfe5ed');

    const intervalIdRef = useRef(null);

    // I am using a loading state here and attaching the toggling to the fetch functions .then method. this is because i only want to display the loading skeleton on initial page load. 

    useEffect(() => {
        setTokenLoading(true);

        // console.log(activeToken);
        fetchDetails(activeToken, baseUrl).then(() => {
            // seeing as we are setting our loading function here. once fetch is done is turns off loading sometimes it takes a while after before the content is set in the store and reflects in the dom. so im using setimeout to delay the dismissal of loading. 
            setTimeout(() => {
                setTokenLoading(false);
            }, 1000);
        });

    }, [activeToken]);


    useEffect(() => {

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible' && navigator.onLine) {
                intervalIdRef.current = setInterval(() => {
                    fetchDetails(activeToken, baseUrl);
                }, 30000); // 30000 milliseconds = 30 seconds
            } else {
                clearInterval(intervalIdRef.current);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('online', handleVisibilityChange);
        window.addEventListener('offline', handleVisibilityChange);

        handleVisibilityChange(); // Initial check

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('online', handleVisibilityChange);
            window.removeEventListener('offline', handleVisibilityChange);
            clearInterval(intervalIdRef.current);
        };
    }, [activeToken]);


    useEffect(() => {
        setGlobalLoading(true);
        fetchGlobal(baseUrl).then(() => setGlobalLoading(false));
    }, []);


    useEffect(() => {
        fetchWatchList(userId);
    }, []);


    return (
        <>
            <Box w={'100%'} pt={4}>

                <div className='global-line-metrics'>
                    <Box display={{ lg: 'none' }} >
                        <Skeleton isLoaded={!globalLoading} borderRadius={10}>

                            <LineGlobalStats />

                        </Skeleton>
                    </Box>
                </div>


                {/* PriceStars and global stats details */}
                <Flex align={'center'} justify={'space-between'} direction={{ base: 'column', md: 'row' }}>

                    {/* custom component fro price display */}
                    <PriceStats loading={tokenLoading} />

                    <Spacer />

                    {/* smallDetails for only lg screens and startsCard for md and lg screens */}
                    <Flex direction={'column'} alignItems={{ lg: 'end' }} gap={2} display={{ base: 'none', sm: 'flex' }}>

                        {/* Visible only on lg screens. */}

                        <Box display={{ base: 'none', lg: 'block' }}>
                            <Skeleton isLoaded={!globalLoading} borderRadius={10}>

                                <LineGlobalStats />

                            </Skeleton>
                        </Box>



                        <Flex alignItems={"center"} display={{ base: 'none', md: 'flex' }} gap={3}>

                            {/* Add to watchlist md/lg screens */}
                            <div className='btn'>
                                <WatchlistBtn colorMode={colorMode} />
                            </div>


                            <GlobalMarket loading={globalLoading} />

                        </Flex>

                    </Flex>

                </Flex>
            </Box>

            <Box mt={2} w={'100%'}>
                <Flex direction={{ base: 'column', sm: 'row' }} justify={{ sm: 'space-between' }} align={{ base: 'end', lg: 'center' }}>

                    {/* Active token market stats: stats under the pricestats */}
                    <Box w={{ base: '100%', lg: '50%' }} mr={'auto'}>
                        <ListDetails color={color} loading={tokenLoading} />
                    </Box>


                    {/* search input component for md and lg screens only */}
                    <Box w={{ base: '100%', lg: '100%' }} ml={'auto'}>
                        <SearchInput />
                    </Box>


                </Flex>
            </Box>

            {/* categories component; trending, updated and pools */}
            <Box w={'100%'}>

                <Categories />
            </Box>

            <Grid templateColumns={{ lg: 'repeat(5, 1fr)' }} gap={2} my={6}>

                <GridItem colSpan={{ lg: 2 }}>
                    <TokenDetailsCard />
                </GridItem>

                <GridItem colSpan={{ lg: 3 }} w={'100%'}>

                    <Chart />

                    <TokenDescription loading={tokenLoading} />

                </GridItem>

            </Grid>

            {/* <Floating /> */}
        </>
    )
}

export default CryptyHome
