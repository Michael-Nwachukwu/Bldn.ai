import React from 'react'
import { Card, CardBody, Text, List, ListItem, Flex, Divider, Box, Stat, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'
import { OpenAi } from '../Icons';
import useTokenDetailsStore from './Stores/tokenDetailsStore';
import dateFormat from 'dateformat';

const TokenDetailsCard = () => {
    const { symbol, price, marketCap, tradingVolume, fdv, dailyLow, dailyHigh, marketCapRank, ath, athChangePercentage, athDate, atl, atlChangePercentage, atlDate, description, totalSupply, circulatingSupply } = useTokenDetailsStore();



    const statCardColor = useColorModeValue('#F7F1ED', '#888b8d');
    const background = useColorModeValue('brand.700', '#191e22');
    const smallColor = useColorModeValue('white', '#888b8d');

    return (
        <>
            <Card bg={background} borderRadius={15} className='token-details'>
                <CardBody>
                    <Text fontSize={25} fontWeight={'bold'} color={useColorModeValue('white', '#e1e2e2')}>{symbol} Price Statistics</Text>

                    <List w={'100%'} spacing={2.5} mt={4} fontSize={{ base:'sm', sm:'md' }}>
                        <ListItem>
                            <Flex justify={'space-between'} align={'center'}>
                                <Text color={statCardColor}>{symbol} Price</Text>
                                <Text color={'white'} fontWeight={'semibold'}>{price}</Text>
                            </Flex>
                        </ListItem>
                        
                        <Divider />
                        <ListItem>
                            <Flex justify={'space-between'} align={'center'}>
                                <Text color={statCardColor}>24h Low / 24h High</Text>
                                <Text color={'white'} fontWeight={'semibold'}>{dailyLow} / {dailyHigh}</Text>
                            </Flex>
                        </ListItem>

                        <Divider />
                        <ListItem>
                            <Flex justify={'space-between'} align={'center'}>
                                <Text color={statCardColor}>Total Supply</Text>
                                <Text color={'white'} fontWeight={'semibold'}>{totalSupply}</Text>
                            </Flex>
                        </ListItem>

                        <Divider />
                        <ListItem>
                            <Flex justify={'space-between'} align={'center'}>
                                <Text color={statCardColor}>Circulating supply</Text>
                                <Text color={'white'} fontWeight={'semibold'}>{circulatingSupply}</Text>
                            </Flex>
                        </ListItem>
                        

                        <Divider />
                        <ListItem>
                            <Flex justify={'space-between'} align={'center'}>
                                <Text color={statCardColor}>Trading Volume</Text>
                                <Text color={'white'} fontWeight={'semibold'}>{tradingVolume}</Text>
                            </Flex>
                        </ListItem>

                        <Divider />
                        <ListItem>
                            <Flex justify={'space-between'} align={'center'}>
                                <Text color={statCardColor}>Market Cap Rank</Text>
                                <Text color={'white'} fontWeight={'semibold'}>{marketCapRank}</Text>
                            </Flex>
                        </ListItem>

                        <Divider />
                        <ListItem>
                            <Flex justify={'space-between'} align={'center'}>
                                <Text color={statCardColor}>Market Cap</Text>
                                <Text color={'white'} fontWeight={'semibold'}>{marketCap}</Text>
                            </Flex>
                        </ListItem>

                        <Divider />
                        <ListItem>
                            <Flex justify={'space-between'} align={'center'}>
                                <Text color={statCardColor}>All-Time High</Text>
                                <Box>
                                    <Stat>
                                        <Flex direction={'column'} align={'end'} justify={'end'}>
                                            <Flex align={'center'} fontWeight={'bold'} gap={1.5} mb={-2}>
                                                <StatNumber fontSize={'md'} color={'white'}>{ath} </StatNumber>
                                                <StatHelpText color={useColorModeValue('red.200', 'red')} fontSize={'md'} pt={2}>
                                                    {athChangePercentage}
                                                    <StatArrow color={'red'} type='decrease' />
                                                </StatHelpText>
                                            </Flex>
                                            {/* <small style={{ color: smallColor }}>Feb 24, 2018 (almost 6 years)</small> */}
                                            <small style={{ color: smallColor }}>
                                                {dateFormat(athDate, "h:MM TT, mmmm dS, yyyy")}
                                            </small>
                                        </Flex>
                                    </Stat>
                                </Box>
                            </Flex>
                        </ListItem>

                        <Divider />
                        <ListItem>
                            <Flex justify={'space-between'} align={'center'}>
                                <Text color={statCardColor}>All-Time Low</Text>
                                <Box>
                                    <Stat>
                                        <Flex direction={'column'} align={'end'} justify={'end'}>
                                            <Flex align={'center'} fontWeight={'bold'} gap={1.5} mb={-2}>
                                                <StatNumber fontSize={'md'} color={'white'}>{atl} </StatNumber>
                                                <StatHelpText color={useColorModeValue('green.200', 'green.300')} fontSize={'md'} pt={2}>
                                                    {atlChangePercentage}
                                                    <StatArrow color={'green.300'} mb={2} type='increase' />
                                                </StatHelpText>
                                            </Flex>
                                            <small style={{ color: smallColor }}>
                                                {dateFormat(atlDate, "h:MM TT, mmmm dS, yyyy")}
                                            </small>
                                        </Flex>
                                    </Stat>
                                </Box>
                            </Flex>
                        </ListItem>
                    </List>

                    <Card bg={"#0e1217"} opacity={'60%'} borderRadius={20} minH={48} mt={3}>
                        <CardBody>
                            {/* <Flex direction={'column'} justify={'space-between'} gap={{ base:4, sm:3 }}>
                                <Text fontSize={'sm'} color={'white'}>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui error est sit officiis eum ea? Expedita molestiae ipsam rem nisi placeat impedit porro cupiditate culpa rerum ipsa. Accusantium, nulla id! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, commodi!
                                </Text>
                                <Flex justify={'end'}>
                                    <Flex align={'center'} gap={1.5} fontSize={'sm'} color={'white'} fontWeight={'light'}>
                                        Genereated by 
                                        <OpenAi />
                                        <span style={{ fontWeight:'bold' }}>
                                            Open AI
                                        </span>
                                    </Flex>
                                </Flex>
                            </Flex> */}
                            <Flex justify={'center'} align={'center'} h={'100%'}>
                                <Text color={'white'} px={6} textAlign={'center'} mt={12}>
                                    CRYPTO CURRENCY CONVERSIONS ARE COMING SOON
                                </Text>
                            </Flex>
                        </CardBody>
                    </Card>

                </CardBody>
            </Card>
        </>
    )
}

export default TokenDetailsCard