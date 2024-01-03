import { Box, Flex, Text, Spacer, Card, CardBody, Grid, GridItem,  useColorMode, useColorModeValue, List, ListItem , Divider, Stat, StatHelpText, StatNumber ,StatArrow, Heading, VStack, Tag, TagLabel, } from '@chakra-ui/react'
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

const CryptyHome = () => {
    const fetchDetails = useTokenDetailsStore(state => state.fetchDetails);
    const fetchGlobal = useGlobalStore(state => state.fetchGlobal);
    const { colorMode } = useColorMode()
    const borderColor = useColorModeValue('#e3ccbf', '#212d3b')
    const color = useColorModeValue('gray', '#dfe5ed')
    const topCardColor= useColorModeValue('brand.600', '#dfe5ed');
    const smallStatsValueColor= useColorModeValue('red', '#f8c6a9');
    const statCardColor = useColorModeValue('#F7F1ED', '#888b8d');

    useEffect(() => {
        fetchDetails('ethereum');
        fetchGlobal();
    }, []);

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
            


            <Categories />

            {/* <Grid display={{ base:'none', sm:'grid' }} templateColumns={{ base:'repeat(1, 1fr)', md:'repeat(3, 1fr)' }} gap={2} mt={6}>
                <GridItem w='100%'>
                    <Card size={'sm'} h={'auto'} minH={48} variant={'outline'} bg={'transparent'} borderRadius={10} border={'2px'} borderColor={borderColor} >
                        <CardBody>
                            <VStack>
                                <Flex alignItems={'center'} w={'100%'}>
                                    <Text fontSize={18} fontWeight={'semibold'} color={colorMode === "light" ? 'gray.600' : 'white'}>🔥 Trending</Text>
                                    <Spacer />
                                    <Box w={4} h={4} borderRadius={'full'} bg={colorMode === "light" ? 'gray.700' : '#dfe5ed'}></Box>
                                </Flex>
                                <List w={'100%'} spacing={2.5} mt={2.5} color={color}>
                                    <ListItem>
                                        <Flex alignItems={'center'}>
                                            <Flex alignItems={'center'} gap={4}>
                                                <Image
                                                    borderRadius='full'
                                                    boxSize='24px'
                                                    src="https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg?1696523566"
                                                    alt='Dan Abramov'
                                                />
                                                <Text fontWeight={'semibold'} fontSize={14}>
                                                    APE
                                                </Text>
                                            </Flex>
                                            <Spacer />
                                            <Text>1.56568341</Text>
                                        </Flex>
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <Flex alignItems={'center'}>
                                            <Flex alignItems={'center'} gap={4}>
                                                <Image
                                                    borderRadius='full'
                                                    boxSize='24px'
                                                    src="https://assets.coingecko.com/coins/images/28600/small/bonk.jpg?1696527587"
                                                    alt='Dan Abramov'
                                                />
                                                <Text fontWeight={'semibold'} fontSize={14}>
                                                    BONK
                                                </Text>
                                            </Flex>
                                            <Spacer />
                                            <Text>1.56568341</Text>
                                        </Flex>
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <Flex alignItems={'center'}>
                                            <Flex alignItems={'center'} gap={4}>
                                                <Image
                                                    borderRadius='full'
                                                    boxSize='24px'
                                                    src="https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg?1696523566"
                                                    alt='Dan Abramov'
                                                />
                                                <Text fontWeight={'semibold'} fontSize={14}>
                                                    COQ INU
                                                </Text>
                                            </Flex>
                                            <Spacer />
                                            <Text>1.56568341</Text>
                                        </Flex>
                                    </ListItem>
                                </List>
                            </VStack>
                        </CardBody>
                    </Card>
                </GridItem>
                
                <GridItem w='100%'>
                    <Card size={'sm'} h={'auto'} minH={48} variant={'outline'} bg={'transparent'} borderRadius={10} border={'2px'} borderColor={borderColor} >
                        <CardBody>
                            <VStack>
                                <Flex alignItems={'center'} w={'100%'}>
                                    <Text fontSize={18} fontWeight={'semibold'} color={colorMode === "light" ? 'gray.600' : 'white'}>🚀 Top Gainers</Text>
                                    <Spacer />
                                    <Box w={4} h={4} borderRadius={'full'} bg={colorMode === "light" ? 'gray.700' : '#dfe5ed'}></Box>
                                </Flex>
                                <List w={'100%'} spacing={2.5} mt={2.5} color={color}>
                                    <ListItem>
                                        <Flex alignItems={'center'}>
                                            <Flex alignItems={'center'} gap={4}>
                                                <Image
                                                    borderRadius='full'
                                                    boxSize='24px'
                                                    src="https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg?1696523566"
                                                    alt='Dan Abramov'
                                                />
                                                <Text fontWeight={'semibold'} fontSize={14}>
                                                    APE
                                                </Text>
                                            </Flex>
                                            <Spacer />
                                            <Text>1.56568341</Text>
                                        </Flex>
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <Flex alignItems={'center'}>
                                            <Flex alignItems={'center'} gap={4}>
                                                <Image
                                                    borderRadius='full'
                                                    boxSize='24px'
                                                    src="https://assets.coingecko.com/coins/images/28600/small/bonk.jpg?1696527587"
                                                    alt='Dan Abramov'
                                                />
                                                <Text fontWeight={'semibold'} fontSize={14}>
                                                    BONK
                                                </Text>
                                            </Flex>
                                            <Spacer />
                                            <Text>1.56568341</Text>
                                        </Flex>
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <Flex alignItems={'center'}>
                                            <Flex alignItems={'center'} gap={4}>
                                                <Image
                                                    borderRadius='full'
                                                    boxSize='24px'
                                                    src="https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg?1696523566"
                                                    alt='Dan Abramov'
                                                />
                                                <Text fontWeight={'semibold'} fontSize={14}>
                                                    COQ INU
                                                </Text>
                                            </Flex>
                                            <Spacer />
                                            <Text>1.56568341</Text>
                                        </Flex>
                                    </ListItem>
                                </List>
                            </VStack>
                        </CardBody>
                    </Card>
                </GridItem>

                <GridItem w='100%'>
                    <Card size={'sm'} h={'auto'} minH={48} variant={'outline'} bg={'transparent'} borderRadius={10} border={'2px'} borderColor={borderColor} >
                        <CardBody>
                            <VStack>
                                <Flex alignItems={'center'} w={'100%'}>
                                    <Text fontSize={18} fontWeight={'semibold'} color={colorMode === "light" ? 'gray.600' : 'white'}>🎱 Top Pools</Text>
                                    <Spacer />
                                    <Box w={4} h={4} borderRadius={'full'} bg={colorMode === "light" ? 'gray.700' : '#dfe5ed'}></Box>
                                </Flex>
                                <List w={'100%'} spacing={2.5} mt={2.5} color={color}>
                                    <ListItem>
                                        <Flex alignItems={'center'}>
                                            <Flex alignItems={'center'} gap={4}>
                                                <Image
                                                    borderRadius='full'
                                                    boxSize='24px'
                                                    src="https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg?1696523566"
                                                    alt='Dan Abramov'
                                                />
                                                <Text fontWeight={'semibold'} fontSize={14}>
                                                    APE
                                                </Text>
                                            </Flex>
                                            <Spacer />
                                            <Text>1.56568341</Text>
                                            <Tag ml={2} py={0.5} colorScheme='brand' opacity={useColorModeValue('70%', '100%')}>
                                                <TagLabel>
                                                    Ftm
                                                </TagLabel>
                                            </Tag>
                                        </Flex>
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <Flex alignItems={'center'}>
                                            <Flex alignItems={'center'} gap={4}>
                                                <Image
                                                    borderRadius='full'
                                                    boxSize='24px'
                                                    src="https://assets.coingecko.com/coins/images/28600/small/bonk.jpg?1696527587"
                                                    alt='Dan Abramov'
                                                />
                                                <Text fontWeight={'semibold'} fontSize={14}>
                                                    BONK
                                                </Text>
                                            </Flex>
                                            <Spacer />
                                            <Text>1.56568341</Text>
                                            <Tag ml={2} py={0.5} colorScheme='brand' opacity={useColorModeValue('70%', '100%')}>
                                                <TagLabel>
                                                    Eth
                                                </TagLabel>
                                            </Tag>
                                        </Flex>
                                    </ListItem>
                                    <Divider />
                                    <ListItem>
                                        <Flex alignItems={'center'}>
                                            <Flex alignItems={'center'} gap={4}>
                                                <Image
                                                    borderRadius='full'
                                                    boxSize='24px'
                                                    src="https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg?1696523566"
                                                    alt='Dan Abramov'
                                                />
                                                <Text fontWeight={'semibold'} fontSize={14}>
                                                    COQ INU
                                                </Text>
                                            </Flex>
                                            <Spacer />
                                            <Text>1.56568341</Text>
                                            <Tag ml={2} py={0.5} colorScheme='brand' opacity={useColorModeValue('70%', '100%')}>
                                                <TagLabel>
                                                    BNB
                                                </TagLabel>
                                            </Tag>
                                        </Flex>
                                    </ListItem>
                                </List>
                            </VStack>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid> */}


            
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