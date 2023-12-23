import { Box, Flex, Text, Spacer, Card, CardBody, VStack, Grid, GridItem,  useColorMode, useColorModeValue, List, ListItem , Image, Divider, InputGroup, Input, InputRightElement, Button, Tag, TagLabel, Stat, StatHelpText, StatLabel, StatNumber ,StatArrow} from '@chakra-ui/react'
import React from 'react'

const CryptyHome = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const borderColor = useColorModeValue('#e3ccbf', '#212d3b')
  const color = useColorModeValue('gray', '#dfe5ed')

    return (
        <>
            <Box>
                <Flex>
                    <Box pt={2}>
                        <Stat>
                            <StatLabel>
                                <Flex align={'center'} gap={1.5} fontWeight={'semibold'}>
                                    <img src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1696501400" alt="" />
                                    Bitcoin BTC
                                </Flex>
                            </StatLabel>
                            <Flex align={'center'} gap={2}>
                                <StatNumber 
                                    fontSize={50}
                                    fontFamily={'syncopate'}
                                >$42,222.62</StatNumber>
                                <StatHelpText fontSize={18}>
                                    <StatArrow color={'red'} type='decrease' />
                                    23.36%
                                </StatHelpText>
                            </Flex>
                        </Stat>
                    </Box>
                    <Spacer />
                    <Flex direction={'column'} alignItems={'end'} gap={2}>
                        <Flex alignItems={'center'} gap={3}>
                            <small style={{ color:'#dfe5ed' }}>
                                Cryptos: <span style={{ color:'#edb3c3' }}>2M+</span>
                            </small>
                            <small style={{ color:'#dfe5ed' }}>
                                Exchanges: <span style={{ color:'#edb3c3' }}>687</span>
                            </small>
                            <small style={{ color:'#dfe5ed' }}>
                                Dominance: <span style={{ color:'#edb3c3' }}>BTC: 51.4% ETH: 16.8%</span>
                            </small>
                            <small style={{ color:'#dfe5ed' }}>
                                ETH GAS: <span style={{ color:'#edb3c3' }}>52 GWEI </span>
                            </small>
                        </Flex>
                        <Flex alignItems={"center"} gap={3}>
                            <Card size={'sm'} variant={'outline'} bg={'transparent'} shadow={'sm'} border={''} borderColor={borderColor} borderRadius={10} outline={'brand.300'}>
                                <CardBody>
                                    <VStack align={'start'}>
                                        <Text fontSize={'lg'} fontWeight={'extrabold'} color={'#dfe5ed'}>
                                            $1,655,669,299,690
                                        </Text>
                                        <Text fontSize={'sm'} fontWeight={'light'} color={'#91a2b8'} >
                                            Market Capitalization 
                                        </Text>
                                    </VStack>
                                </CardBody>
                            </Card>
                            <Card size={'sm'} variant={'outline'} bg={'transparent'} shadow={'sm'} border={''} borderColor={borderColor} borderRadius={10} outline={'brand.300'}>
                                <CardBody >
                                    <VStack align={'start'}>
                                        <Text fontSize={'lg'} fontWeight={'extrabold'} color={'#dfe5ed'}>
                                        $54,691,566,748
                                        </Text>
                                        <Text fontSize={'sm'} fontWeight={'light'} color={'#91a2b8'} >
                                            24h Trading Volume
                                        </Text>
                                    </VStack>
                                </CardBody>
                            </Card>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>

            <Box>
                <Flex justify={'space-between'} align={'center'}>
                    <List minW={'sm'} spacing={1.5} color={color} fontSize={'sm'}>
                        <ListItem>
                            <Flex justify={'space-between'} align={'center'}>
                                <Text color={'#888b8d'}>Market Cap</Text>
                                <Text fontWeight={'semibold'}>$854,003,314,585</Text>
                            </Flex>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Flex justify={'space-between'} align={'center'}>
                                <Text color={'#888b8d'}>24 Hour Trading Vol</Text>
                                <Text fontWeight={'semibold'}>$11,616,118,861</Text>
                            </Flex>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Flex justify={'space-between'} align={'center'}>
                                <Text color={'#888b8d'}>Fully Diluted Valuation </Text>
                                <Text fontWeight={'semibold'}>$916,014,813,000</Text>
                            </Flex>
                        </ListItem>
                    </List>
                    <InputGroup size='md' maxW={'xs'}>
                        <Input
                            focusBorderColor='#91a2b8'
                            bg={"#1b232d"}
                            opacity={'70%'}
                            py={5}
                            // pr='2.5rem'
                            variant='outline' 
                            placeholder='Search'
                            name={"password"}
                            _hover={{ border:'' }}
                            required
                        />
                        <InputRightElement width='4.5rem'>
                            <Flex justifyContent={'center'} w={6} bg={"#384a61"} opacity={'70%'} color={"white"} borderRadius={5}
                                _hover={{ bg:'' }} 
                            >
                                /
                            </Flex>
                        </InputRightElement>
                    </InputGroup>
                </Flex>
            </Box>

            <Grid templateColumns='repeat(3, 1fr)' gap={2} mt={6}>
                <GridItem w='100%'>
                    <Card size={'sm'} h={'auto'} minH={48} variant={'outline'} bg={'transparent'} borderRadius={10} border={'2px'} borderColor={borderColor} outline={'brand.300'}>
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
                    <Card size={'sm'} h={'auto'} minH={48} variant={'outline'} bg={'transparent'} borderRadius={10} border={'2px'} borderColor={borderColor} outline={'brand.300'}>
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
                    <Card size={'sm'} h={'auto'} minH={48} variant={'outline'} bg={'transparent'} borderRadius={10} border={'2px'} borderColor={borderColor} outline={'brand.300'}>
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
                                            <Tag px={2} ml={2} borderRadius={13} py={0.5} border={'1px'} borderColor={'#91a2b8'}>
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
                                            <Tag px={2} ml={2} borderRadius={13} py={0.5} border={'1px'} borderColor={'#91a2b8'}>
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
                                            <Tag px={2} ml={2} borderRadius={13} py={0.5} border={'1px'} borderColor={'#91a2b8'}>
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
            </Grid>


            <Grid templateColumns='repeat(5, 1fr)' gap={2} mt={6}>
                <GridItem colSpan={2}>
                    <Card bg={'#191e22'} borderRadius={15}>
                        <CardBody>
                            <Text fontSize={25} fontWeight={'bold'} color={'#e1e2e2'}>BTC Price Statistics</Text>
                            <List w={'100%'} spacing={3} mt={5}>
                                <ListItem>
                                    <Flex justify={'space-between'} align={'center'}>
                                        <Text color={'#888b8d'}>Bitcoin Price</Text>
                                        <Text fontWeight={'semibold'}>$43,649.80</Text>
                                    </Flex>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Flex justify={'space-between'} align={'center'}>
                                        <Text color={'#888b8d'}>24h Low / 24h High</Text>
                                        <Text fontWeight={'semibold'}>$40,766.45 / $44,217.04</Text>
                                    </Flex>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Flex justify={'space-between'} align={'center'}>
                                        <Text color={'#888b8d'}>7d Low / 7d High</Text>
                                        <Text fontWeight={'semibold'}>$40,766.45 / $44,217.04</Text>
                                    </Flex>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Flex justify={'space-between'} align={'center'}>
                                        <Text color={'#888b8d'}>Trading Volume</Text>
                                        <Text fontWeight={'semibold'}>$13,956,918,615</Text>
                                    </Flex>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Flex justify={'space-between'} align={'center'}>
                                        <Text color={'#888b8d'}>Market Cap Rank</Text>
                                        <Text fontWeight={'semibold'}>#1</Text>
                                    </Flex>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Flex justify={'space-between'} align={'center'}>
                                        <Text color={'#888b8d'}>Market Cap</Text>
                                        <Text fontWeight={'semibold'}>$854,003,314,585</Text>
                                    </Flex>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <Flex justify={'space-between'} align={'center'}>
                                        <Text color={'#888b8d'}>Market Cap Dominance</Text>
                                        <Text fontWeight={'semibold'}>49.309%</Text>
                                    </Flex>
                                </ListItem>
                            </List>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>

        </>
    )
}

export default CryptyHome