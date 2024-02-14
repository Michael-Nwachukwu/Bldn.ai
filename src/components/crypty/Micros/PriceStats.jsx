import React from 'react';
import { Box, Flex, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, useColorMode, SkeletonText, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import useTokenDetailsStore from '../Stores/tokenDetailsStore';
import WatchlistBtn from './WatchlistBtn';

const PriceStats = ({loading}) => {
    const {image, name, symbol, price, priceChangePercentageDaily } = useTokenDetailsStore();
    const colorMode = useColorMode();
    
    const negativeChange = priceChangePercentageDaily < 0;
    
    return (
        <>
            {/* PriceStat, statArrow and percentage, and Add to watchlist starSvg button that shows only on small screens*/}
            <Box p={2} minW={{ sm:'sm' }} w={{ base:'100%', sm:'auto' }}>
                <Flex justify={'space-between'} align={'center'} className='price'>

                    {/* priceStat */}
                    <Stat>
                        <StatLabel>
                            <Flex align={'center'} gap={1.5} fontWeight={'semibold'}>
                                <SkeletonCircle isLoaded={!loading} size='6'>
                                    <img src={image} alt="" />
                                </SkeletonCircle>
                                <Skeleton isLoaded={!loading} minW={{ base:10, lg:20 }} minH={4} borderRadius={10}>
                                    {name} {symbol}
                                </Skeleton>
                            </Flex>
                        </StatLabel>
                        <Flex align={'center'} gap={2} mt={2}>
                            <Skeleton isLoaded={!loading} minW={{ base: loading ? 32 : 'auto', lg: loading ? 48 : 'auto' }} minH={{ base:10, lg:16}}>
                                <StatNumber 
                                    fontSize={{ base:27, lg:50 }}
                                    fontFamily={'syncopate'}
                                >{price}</StatNumber>
                            </Skeleton>

                            <Skeleton isLoaded={!loading} minW={14} minH={7} borderRadius={10}>
                                <StatHelpText fontSize={{ base:14, sm:18 }}>
                                    <StatArrow color={negativeChange ? 'red' : 'green'} type={negativeChange ? 'decrease' : 'increase'} />
                                    {priceChangePercentageDaily}%
                                </StatHelpText>
                            </Skeleton>

                        </Flex>
                    </Stat>

                    {/* Add to watclist icon btn */}
                    <Box display={{ sm:'none' }} className='btn-mobile'>
                        <WatchlistBtn colorMode={colorMode} />
                    </Box>

                </Flex>
            </Box>
        </>
    )
}

export default PriceStats