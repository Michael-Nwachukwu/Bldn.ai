import React from 'react'
import { Box, Flex, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Tag, TagRightIcon, useColorMode } from '@chakra-ui/react'
import { starSvg } from '../../Icons'
import Watchlist from './Watchlist';

const PriceStats = () => {
    const colorMode = useColorMode();
    return (
        <>
            {/* PriceStat, statArrow and percentage, and Add to watchlist starSvg button that shows only on small screens*/}
            <Box p={2} minW={{ sm:'sm' }} w={{ base:'100%', sm:'auto' }}>
                <Flex justify={'space-between'} align={'center'}>

                    {/* priceStat */}
                    <Stat>
                        <StatLabel>
                            <Flex align={'center'} gap={1.5} fontWeight={'semibold'}>
                                <img src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1696501400" alt="" />
                                Bitcoin BTC
                            </Flex>
                        </StatLabel>
                        <Flex align={'center'} gap={2}>
                            <StatNumber 
                                fontSize={{ base:27, lg:50 }}
                                fontFamily={'syncopate'}
                            >$42,222.62</StatNumber>
                            <StatHelpText fontSize={{ base:14, sm:18 }}>
                                <StatArrow color={'red'} type='decrease' />
                                23.36%
                            </StatHelpText>
                        </Flex>
                    </Stat>

                    {/* Add to watclist icon btn */}
                    <Box display={{ sm:'none' }}>
                        <Watchlist colorMode={colorMode} />
                    </Box>

                </Flex>
            </Box>
        </>
    )
}

export default PriceStats