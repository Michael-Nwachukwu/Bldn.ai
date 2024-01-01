import React, {useEffect} from 'react'
import useGlobalStore from './Stores/globalMarketStore';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import SmallDetails from './Micros/SmallDetails';
import { Gas } from '../Icons';

const LineGlobalStats = () => {
    const { cryptos, markets, globalMarketCap, globalVolume, btcDominance, ethDominance, gwei, fetchGwei } = useGlobalStore();
    const smallStatsValueColor= useColorModeValue('red', '#f8c6a9');

    useEffect(() => {
        fetchGwei();
    }, []);

    return (
        <>
            <Flex alignItems={'center'} 
                whiteSpace={{ base:"nowrap", sm:'normal' }}
                overflowX={{ base:"auto", sm:'' }}  
                p={{ base:1, sm:0 }}
                bg={{ base:useColorModeValue('rgba(248, 198, 169, 0.25)', '#1b232d'), sm:'transparent' }}
                borderRadius={{ base:'15px 0 0 15px', sm:0 }}
                mb={{ base:1, sm:0 }}
            >
                <SmallDetails label={'Cryptos:'} value={cryptos} />
                
                <SmallDetails label={'Exchanges:'} value={markets} />

                <Box display={{ lg:'none' }}>
                    <SmallDetails label={'Market Cap:'} value={globalMarketCap} />
                </Box>

                <Box display={{ lg:'none' }}>
                    <SmallDetails label={'24H Volume:'} value={globalVolume} />
                </Box>
                

                <SmallDetails label={'Dominance:'} value={`BTC: ${btcDominance} ETH: ${ethDominance}`} />

                <Box display={{ lg:'none' }}>
                    <SmallDetails label={'ETH GAS:'} value={ gwei[2] + 'GWEI' } />
                </Box>

                <Flex align={'center'} fontSize={'xs'} ml={2} gap={1} display={{ base:'none', lg:'flex' }}>
                    <Flex  align={'center'} gap={1}>
                        <Gas />
                        ETH GAS: 
                    </Flex>
                    <span style={{ color:smallStatsValueColor }}>{gwei[2]} GWEI </span>
                </Flex>
                
            </Flex>
        </>
    )
}

export default LineGlobalStats