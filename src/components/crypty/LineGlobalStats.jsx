import React, {useEffect} from 'react'
import useGlobalStore from './Stores/globalMarketStore';
import { Box, Flex, useColorModeValue, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, List, ListItem, Text } from '@chakra-ui/react';
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
                whiteSpace={{ base:"nowrap", lg:'normal' }}
                overflowX={{ base:"auto", lg:'' }}  
                p={{ base:1, lg:0 }}
                bg={{ base:useColorModeValue('rgba(248, 198, 169, 0.25)', '#1b232d'), lg:'transparent' }}
                borderRadius={{ base:'15px 0 0 15px', lg:0 }}
                mb={{ base:1, lg:0 }}
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

                <Popover isLazy trigger='hover'>
                    <PopoverTrigger>
                        <Box>
                            <Box display={{ lg:'none' }}>
                                <SmallDetails label={'ETH GAS:'} value={ gwei[2] + 'GWEI' } />
                            </Box>

                            <Flex cursor={'pointer'} align={'center'} fontSize={'xs'} ml={2} gap={1} display={{ base:'none', lg:'flex' }}>
                                <Flex  align={'center'} gap={1}>
                                    <Gas />
                                    ETH GAS: 
                                </Flex>
                                <span style={{ color:smallStatsValueColor }}>{gwei[2]} GWEI </span>
                            </Flex>
                        </Box>
                    </PopoverTrigger>
                    <PopoverContent minW={'auto'} maxW={48} fontSize={'xs'}>
                        <PopoverArrow />
                        <PopoverBody>
                            <List spacing={1}>
                                {gwei.map((gweiValue, index) => (
                                    <ListItem key={index}>
                                        <Flex justify={'space-between'} align={'center'}>
                                            <Text>
                                                {index === 0 && 'Rapid: '}
                                                {index === 1 && 'Fast: '}
                                                {index === 2 && 'Standard: '}
                                                {index === 3 && 'Slow: '}
                                            </Text>
                                            <Text fontWeight={'medium'}>
                                                {gweiValue} GWEI
                                            </Text>
                                        </Flex>
                                    </ListItem>
                                ))}
                                <Text color={'gray'}>Data by EtherChain</Text>
                            </List>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
                
            </Flex>
        </>
    )
}

export default LineGlobalStats