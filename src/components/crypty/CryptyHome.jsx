import { Box, Flex, Spacer, Grid, GridItem,  useColorMode, Skeleton, useColorModeValue, InputGroup, Input, InputRightElement} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import Chart from './Chart'
import PriceStats from './Micros/PriceStats'
import GlobalMarket from './GlobalMarket'
import Watchlist from './Micros/Watchlist'
import ListDetails from './ListDetails'
// import SearchInput from './Micros/SearchInput'
import Categories from './Categories'
import TokenDetailsCard from './TokenDetailsCard'
import TokenDescription from './TokenDescription'
import LineGlobalStats from './LineGlobalStats'

import { Search } from '../Icons'

import useTokenDetailsStore from './Stores/tokenDetailsStore'
import useGlobalStore from './Stores/globalMarketStore'
import useBaseUrl from './Stores/baseUrlStore'
import useActiveTokenStore from './Stores/activeTokenStore'

const CryptyHome = () => {
    const baseUrl = useBaseUrl(state => state.baseUrl);
    const activeToken = useActiveTokenStore(state => state.activeToken);
    const fetchDetails = useTokenDetailsStore(state => state.fetchDetails);
    const fetchGlobal = useGlobalStore(state => state.fetchGlobal);

    const [input, setInput] = useState('');

    
    const [globalLoading, setGlobalLoading] = useState(false);
    const [tokenLoading, setTokenLoading] = useState(false);


    const { colorMode } = useColorMode()

    const color = useColorModeValue('gray', '#dfe5ed')

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

        // Set up interval to fetch details every 30 seconds
        const intervalId = setInterval(() => {
            // alert(activeToken);
            fetchDetails(activeToken, baseUrl);
        }, 30000); // 30000 milliseconds = 30 seconds

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [activeToken]);
    
    useEffect(() => {
        setGlobalLoading(true);
        fetchGlobal(baseUrl).then(() => setGlobalLoading(false));
    }, []);



    const handleUpdateInput = (e) => {
        const value = e.target.value;
        setInput(value);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (input === ''){
            alert('Please enter an address or serch by coin id');
        }else{
            fetchDetails(input, baseUrl);
            console.log('Active Token:', input);
        };
        setInput('');
    };


    return (
        <>
            <Box overflowX={'hidden'}>

                <Box display={{ lg:'none' }}>
                    <Skeleton isLoaded={!globalLoading} borderRadius={10}>
                        <LineGlobalStats />
                    </Skeleton>
                </Box>

                {/* PriceStars and global stats details */}
                <Flex align={'center'} justify={'space-between'} direction={{ base:'column', md:'row' }}>

                    {/* custom component fro price display */}
                    <PriceStats loading={tokenLoading} />
                   
                    <Spacer />
                    
                    {/* smallDetails for only lg screens and startsCard for md and lg screens */}
                    <Flex direction={'column'} alignItems={{ lg:'end' }} gap={2} display={{ base:'none', sm:'flex' }}>

                        {/* Visible only on lg screens. */}
                        <Box display={{ base:'none', lg:'block' }}>
                            <Skeleton isLoaded={!globalLoading} borderRadius={10}>
                                <LineGlobalStats />
                            </Skeleton>
                        </Box>
                        
                        
                        <Flex alignItems={"center"} display={{ base:'none', md:'flex' }} gap={3}>

                            {/* Add to watchlist md/lg screens */}
                            <Watchlist colorMode={colorMode} />

                            <GlobalMarket loading={globalLoading} />

                        </Flex>

                    </Flex>

                </Flex>
            </Box>

            <Box mt={2}>
                <Flex direction={{ base:'column', sm:'row' }} justify={{ sm:'space-between' }} align={{base:'end',  lg:'center' }}>

                    {/* Active token market stats: stats under the pricestats */}
                    
                        <ListDetails color={color} loading={tokenLoading} />
                   
                    
                    {/* search input component for md and lg screens only */}
                    {/* <SearchInput /> */}


                    <form onSubmit={handleSubmit} style={{ width:'100%' }}>
                        <InputGroup ml={'auto'} size='md' display={{ base:'none', md:'flex' }} maxW={'xs'}>
                            <Input
                                id="searchInput"
                                focusBorderColor={ useColorModeValue('brand.800', '#dfe5ed') }
                                border={useColorModeValue('1px', '')}
                                bg={useColorModeValue('transparent', "#1b232d")}
                                py={5}
                                placeholder='Search'
                                color={useColorModeValue('brand.800', 'white')}
                                onChange={handleUpdateInput}
                                value={input}
                                name={"password"}
                                _hover={{ border:'' }}
                                _placeholder={{ color: useColorModeValue('brand.800', '#dfe5ed') }}
                                required
                            />
                            <InputRightElement width='4.5rem' pl={6}>
                                <Flex justifyContent={'center'} w={6} bg={useColorModeValue('brand.700', "#384a61")} opacity={'70%'} color={"white"} borderRadius={5} fontWeight={'bold'}
                                    _hover={{ bg:'' }} 
                                >
                                    /
                                </Flex>
                            </InputRightElement>
                        </InputGroup>
                    </form>

                    <Box w={'70%'} ml={'auto'} pt={3} display={{ sm:'none' }} mb={3}>
                        <form onSubmit={handleSubmit} style={{ width:'100%' }} className="form-control">
                            <input className="input-search input-alt" value={input} onChange={handleUpdateInput} placeholder='Search' required="" type="text" style={{ textAlign: 'right', paddingRight:'30px' }} />
                            <span className="input-border input-border-alt"></span>
                            <a href="#" type='submit' onClick={handleSubmit}>
                                <Search fill={'#464a4d'} />
                            </a>
                        </form>
                    </Box>



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

                    <TokenDescription loading={tokenLoading} />

                </GridItem>

            </Grid>

            {/* <Floating /> */}

        </>
    )
}

export default CryptyHome