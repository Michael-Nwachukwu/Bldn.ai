import React from 'react'
import { useColorModeValue, Card, CardBody, VStack, Text } from '@chakra-ui/react';

const SmallCard = ({value, title}) => {
    const borderColor = useColorModeValue('gray.400', '#212d3b');
    const valueColor = useColorModeValue('gray.600', '#dfe5ed');
    const titleColor = useColorModeValue('gray.600', '#dfe5ed');

    return (
        <>
            <Card size={'sm'} variant={'outline'} bg={'transparent'} shadow={'sm'} border={''} borderColor={borderColor} borderRadius={10}>
                <CardBody>
                    <VStack align={'start'}>
                        <Text fontSize={'lg'} fontWeight={'bold'} color={valueColor}>
                            {value}
                        </Text>
                        <Text fontSize={'sm'} color={titleColor} >
                            {title}
                        </Text>
                    </VStack>
                </CardBody>
            </Card>
        </>
    )
}

export default SmallCard