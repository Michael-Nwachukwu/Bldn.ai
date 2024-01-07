import React from 'react'
import { useColorMode, useColorModeValue, Box, Flex, Text, Spacer, VStack, Image, Tag, TagLabel, Divider, List, ListItem, Card, CardBody } from '@chakra-ui/react';
import useCategoriesStore from '../Stores/categoriesStore';


const BigCard = ({heading}) => {
    const { trending, recentlyUpdated, trendingPools } = useCategoriesStore();

    const borderColor = useColorModeValue('#e3ccbf', '#212d3b');
    const color = useColorModeValue('brand.600', '#dfe5ed');
    const colorMode = useColorMode();

    let data;
    switch (heading) {
        case '🔥 Trending':
            data = trending
            break
        case '🚀 Updated':
            data = recentlyUpdated
            break
        case '🎱 Trending pools':
            data = trendingPools
            break
        default:
            data = []
    }

    return (
        <>
            <Card size={{ base:'sm', md:'xs', lg:'sm' }} h={'auto'} minH={{ base:48, sm:'auto', lg:48 }} p={{ md:3, lg:0 }} pb={{ base:5, md:3, lg:0 }} variant={'outline'} bg={'transparent'} borderRadius={10} border={'2px'} borderColor={borderColor} >
                <CardBody>
                    <VStack>
                        <Flex alignItems={'center'} w={'100%'}>
                            <Text fontSize={{ base:18, md:'sm', lg:18 }} fontWeight={'semibold'} color={useColorModeValue('gray.600', 'white')}>
                                {heading}
                            </Text>
                            <Spacer />
                            <Box w={4} h={4} borderRadius={'full'} bg={useColorModeValue('gray.700', '#dfe5ed')}></Box>
                        </Flex>
                        <List w={'100%'} spacing={2.5} mt={2.5} color={color}>
                            {data.map((item, index) => (
                                <React.Fragment key={index}>
                                    <ListItem>
                                        <Flex alignItems={'center'}>
                                            <Flex alignItems={'center'} gap={{ base:4, md:2, lg:4 }}>
                                                { item.network ? 
                                                    <Tag 
                                                        py={0.5} 
                                                        colorScheme='brand' 
                                                        opacity={useColorModeValue('70%', '100%')}
                                                        display={{ md:'none', lg:'block' }}
                                                    >
                                                        <TagLabel>
                                                            {item.network}
                                                        </TagLabel>
                                                    </Tag>
                                                    : null
                                                }

                                                { item.image ?
                                                    <Image
                                                        borderRadius='full'
                                                        boxSize={{ base:'24px', md:'18px',lg:'24px'}}
                                                        src={item.image}
                                                        alt={item.symbol}
                                                    />
                                                    : null
                                                }
                                                

                                                <Text fontWeight={'semibold'} fontSize={{ base:14, md:'xs', lg:14 }}>
                                                    {item.symbol}
                                                </Text>
                                            </Flex>
                                            <Spacer />
                                            <Text fontSize={{ md:'xs', lg:'base' }}>{item.price ? item.price : item.volume}</Text>
                                        </Flex>
                                    </ListItem>
                                    {index < data.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </VStack>
                </CardBody>
            </Card>
        </>
    )
}

export default BigCard