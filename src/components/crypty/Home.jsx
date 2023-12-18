import { Box, Flex, Text, Spacer, Card, CardBody, VStack, Grid, GridItem,  useColorMode, useColorModeValue, List, ListItem , Image} from '@chakra-ui/react'
import React from 'react'

const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const borderColor = useColorModeValue('#e3ccbf', '#212d3b')
  const color = useColorModeValue('gray', '#dfe5ed')

    return (
        <>
            <Box>
                <Flex>
                    <Box>
                        <Text>Bitcoin BTC</Text>
                        <Text
                            fontSize={50}
                            fontWeight={"extrabold"}
                            fontFamily={'syncopate'}
                        >
                            $42,222.62
                        </Text>
                    </Box>
                    <Spacer />
                    <Flex alignItems={"center"} gap={3}>
                        <Card size={'sm'} variant={'outline'} bg={'transparent'} shadow={'sm'} border={''} borderColor={borderColor} borderRadius={10} outline={'brand.300'}>
                            <CardBody>
                                <VStack align={'start'}>
                                    <Text fontSize={'lg'} fontWeight={'extrabold'} color={'gray-200'}>
                                        $1,655,669,299,690
                                    </Text>
                                    <Text fontSize={'sm'} >
                                        Market Capitalization 
                                    </Text>
                                </VStack>
                            </CardBody>
                        </Card>
                        <Card size={'sm'} variant={'outline'} bg={'transparent'} shadow={'sm'} border={''} borderColor={borderColor} borderRadius={10} outline={'brand.300'}>
                            <CardBody >
                            <VStack align={'start'}>
                                    <Text fontSize={'lg'} fontWeight={'extrabold'} color={'gray-200'}>
                                    $54,691,566,748
                                    </Text>
                                    <Text fontSize={'sm'} >
                                        24h Trading Volume
                                    </Text>
                                </VStack>
                            </CardBody>
                        </Card>
                    </Flex>
                </Flex>
            </Box>

            <Grid templateColumns='repeat(3, 1fr)' gap={6} mt={6}>
                <GridItem w='100%'>
                    <Card size={'sm'} h={48} variant={'outline'} bg={'transparent'} borderRadius={10} shadow={'md'} border={'1px'} borderColor={borderColor} outline={'brand.300'}>
                        <CardBody>
                            <VStack>
                                <Flex alignItems={'center'} w={'100%'}>
                                    <Text fontSize={18} fontWeight={'semibold'} color={colorMode === "light" ? 'gray.600' : 'white'}>🔥 Trending</Text>
                                    <Spacer />
                                    <Box w={4} h={4} borderRadius={'full'} bg={colorMode === "light" ? 'gray.700' : 'white'}></Box>
                                </Flex>
                                <List w={'100%'} spacing={6} mt={2} color={color}>
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
                    <Card size={'sm'} h={48} variant={'outline'} bg={'transparent'} borderRadius={10} shadow={'md'} border={'1px'} borderColor={borderColor} outline={'brand.300'}>
                        <CardBody>

                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem w='100%'>
                    <Card size={'sm'} h={48} variant={'outline'} bg={'transparent'} borderRadius={10} shadow={'md'} border={'1px'} borderColor={borderColor} outline={'brand.300'}>
                        <CardBody>
                            
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>

        </>
    )
}

export default Home