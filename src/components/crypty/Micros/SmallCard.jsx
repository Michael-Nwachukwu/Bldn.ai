import React from 'react'
import { useColorMode, useColorModeValue, Card, CardBody, VStack, Text } from '@chakra-ui/react';

const SmallCard = ({value, title}) => {
    const borderColor = useColorModeValue('#e3ccbf', '#212d3b');
    const color = useColorModeValue('brand.600', '#dfe5ed');
    const colorMode = useColorMode();

    return (
        <>
            <Card size={'sm'} variant={'outline'} bg={'transparent'} shadow={'sm'} border={''} borderColor={borderColor} borderRadius={10}>
                <CardBody>
                    <VStack align={'start'} mb={{ base:3, lg:0 }}>
                        <Text fontSize={'lg'} fontWeight={'bold'} color={color}>
                            {value}
                        </Text>
                        <Text fontSize={'sm'} color={colorMode == 'light' ? 'brand.600' : '#91a2b8'} >
                            {title}
                        </Text>
                    </VStack>
                </CardBody>
            </Card>
        </>
    )
}

export default SmallCard