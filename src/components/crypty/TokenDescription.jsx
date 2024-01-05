import React from 'react'
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import useTokenDetailsStore from './Stores/tokenDetailsStore'

const TokenDescription = () => {
  const { description } = useTokenDetailsStore();
  return (
    <>
        <Box p={3}>
            <Heading py={3}>
                About Coin.
            </Heading>
            <Text h={{ base:'auto', sm:60 }} overflow={'scroll'} color={useColorModeValue('','#9fa0a2')}>
                {description}
            </Text>
        </Box>
    </>
  )
}

export default TokenDescription;