import { Box, Flex, Spacer, Grid, GridItem,  useColorMode, useColorModeValue} from '@chakra-ui/react'
import React, { useEffect } from 'react'

import Chart from './Chart'
import PriceStats from './Micros/PriceStats'
import GlobalMarket from './GlobalMarket'
import Watchlist from './Micros/Watchlist'
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

const CryptyHome = () => {
    const baseUrl = useBaseUrl(state => state.baseUrl);
    const activeToken = useActiveTokenStore(state => state.activeToken);
    const fetchDetails = useTokenDetailsStore(state => state.fetchDetails);
    const fetchGlobal = useGlobalStore(state => state.fetchGlobal);

    const { colorMode } = useColorMode()

    const color = useColorModeValue('gray', '#dfe5ed')

    useEffect(() => {
        console.log(activeToken);
        fetchDetails(activeToken, baseUrl);
        fetchGlobal(baseUrl);

        // Set up interval to fetch details every 30 seconds
        const intervalId = setInterval(() => {
            // alert(activeToken);
            fetchDetails(activeToken, baseUrl);
        }, 30000); // 30000 milliseconds = 30 seconds

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [activeToken]);

    return (
        <>
            <Box overflowX={'hidden'}>

                <Box display={{ sm:'none' }}>
                    <LineGlobalStats />
                </Box>

                {/* PriceStars and global stats details */}
                <Flex align={'center'} justify={'space-between'} direction={{ base:'column', md:'row' }}>

                    {/* custom component fro price display */}
                    <PriceStats />

                    <Spacer />
                    
                    {/* smallDetails for only lg screens and startsCard for md and lg screens */}
                    <Flex direction={'column'} alignItems={{ lg:'end' }} gap={2} >

                        {/* Visible only on lg screens. */}
                        <Box display={{ base:'none', lg:'block' }}>
                            <LineGlobalStats />
                        </Box>
                        
                        
                        <Flex alignItems={"center"} display={{ base:'none', md:'flex' }} gap={3}>

                            {/* Add to watchlist md/lg screens */}
                            <Watchlist colorMode={colorMode} />

                            <GlobalMarket />

                        </Flex>

                    </Flex>

                </Flex>
            </Box>

            <Box>
                <Flex direction={{ base:'column', sm:'row' }} justify={{ sm:'space-between' }} align={{base:'end',  lg:'center' }}>

                    {/* Active token market stats: stats under the pricestats */}
                    <ListDetails color={color} />
                    
                    {/* search input component for md and lg screens only */}
                    <SearchInput />
                </Flex>
            </Box>
            
            {/* categories component; trending, updated and pools */}
            <Categories />
            
            <Grid templateColumns={{ lg:'repeat(5, 1fr)' }} gap={2} my={6}>

                <GridItem colSpan={{ lg:2 }}>
                   <TokenDetailsCard />
                </GridItem>

                <GridItem colSpan={{ lg:3 }} w={'100%'}>

                    <Chart />

                    <TokenDescription />

                </GridItem>

            </Grid>

            {/* <Floating /> */}

        </>
    )
}

export default CryptyHome