import React from 'react'
import { Box, Heading, Text, useColorModeValue, SkeletonText } from '@chakra-ui/react'
import useTokenDetailsStore from './Stores/tokenDetailsStore'

const TokenDescription = ({loading}) => {
  const { description } = useTokenDetailsStore();
  return (
    <>
        <Box p={3}>
            <Heading py={3}>
                About Coin.
            </Heading>
            <SkeletonText isLoaded={!loading} noOfLines={10} skeletonHeight='3'>    
              <Text h={{ base:'auto', sm:60 }} overflow={'scroll'} color={useColorModeValue('','#9fa0a2')}>
                  {description}
              </Text>
            </SkeletonText>
        </Box>
    </>
  )
}

export default TokenDescription;