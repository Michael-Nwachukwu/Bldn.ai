import React from 'react'
import { Box, Flex, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Tag, TagRightIcon, useColorMode } from '@chakra-ui/react'
import { starSvg } from '../../Icons'
import Watchlist from './Watchlist';
import useTokenDetailsStore from '../Stores/tokenDetailsStore';

const PriceStats = () => {
    const {image, name, symbol, price, priceChangePercentageDaily, } = useTokenDetailsStore();
    const colorMode = useColorMode();
    const type = () => {
        if( priceChangePercentageDaily.includes('-') ){
            return 'negative'
        }else{
            return 'poisitive'
        }
    }
    
    return (
        <>
            {/* PriceStat, statArrow and percentage, and Add to watchlist starSvg button that shows only on small screens*/}
            <Box p={2} minW={{ sm:'sm' }} w={{ base:'100%', sm:'auto' }}>
                <Flex justify={'space-between'} align={'center'}>

                    {/* priceStat */}
                    <Stat>
                        <StatLabel>
                            <Flex align={'center'} gap={1.5} fontWeight={'semibold'}>
                                <img src={image} alt="" />
                               {name} {symbol}
                            </Flex>
                        </StatLabel>
                        <Flex align={'center'} gap={2}>
                            <StatNumber 
                                fontSize={{ base:27, lg:50 }}
                                fontFamily={'syncopate'}
                            >{price}</StatNumber>
                            <StatHelpText fontSize={{ base:14, sm:18 }}>
                                <StatArrow color={type == 'negative' ? 'red' : 'green'} type={type == 'negative' ? 'decrease' : 'increase'} />
                                {priceChangePercentageDaily}
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