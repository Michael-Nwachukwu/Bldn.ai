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
            <Card size={'sm'} h={'auto'} minH={48} variant={'outline'} bg={'transparent'} borderRadius={10} border={'2px'} borderColor={borderColor} >
                <CardBody>
                    <VStack>
                        <Flex alignItems={'center'} w={'100%'}>
                            <Text fontSize={18} fontWeight={'semibold'} color={colorMode === "light" ? 'gray.600' : 'white'}>
                                {heading}
                            </Text>
                            <Spacer />
                            <Box w={4} h={4} borderRadius={'full'} bg={colorMode === "light" ? 'gray.700' : '#dfe5ed'}></Box>
                        </Flex>
                        <List w={'100%'} spacing={2.5} mt={2.5} color={color}>
                            {data.map((item, index) => (
                                <React.Fragment key={index}>
                                    <ListItem>
                                        <Flex alignItems={'center'}>
                                            <Flex alignItems={'center'} gap={4}>
                                                { item.network ? 
                                                    <Tag 
                                                        ml={2} 
                                                        py={0.5} 
                                                        colorScheme='brand' 
                                                        opacity={useColorModeValue('70%', '100%')}
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
                                                        boxSize='24px'
                                                        src={item.image}
                                                        alt={item.symbol}
                                                    />
                                                    : null
                                                }
                                                

                                                <Text fontWeight={'semibold'} fontSize={14}>
                                                    {item.symbol}
                                                </Text>
                                            </Flex>
                                            <Spacer />
                                            <Text>{item.price ? item.price : item.volume}</Text>
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