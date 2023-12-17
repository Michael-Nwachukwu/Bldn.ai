import { Box, Flex, Text, Spacer, Card, CardBody, VStack } from '@chakra-ui/react'
import React from 'react'

const Home = () => {
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
                    <Card size={'sm'} variant={'outline'} bg={'transparent'} borderRadius={10} outline={'brand.300'}>
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
                    <Card size={'sm'} variant={'outline'} bg={'transparent'} borderRadius={10} outline={'brand.300'}>
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
    </>
  )
}

export default Home