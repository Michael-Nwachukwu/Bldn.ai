import React from 'react'
import { Box, Heading, Text, useColorModeValue, SkeletonText } from '@chakra-ui/react'
import useTokenDetailsStore from './Stores/tokenDetailsStore'

const TokenDescription = ({loading}) => {
  const { description, symbol } = useTokenDetailsStore();
  return (
    <>
        <Box p={3}>
            <Heading py={3}>
                About {symbol}.
            </Heading>
            <SkeletonText isLoaded={!loading} noOfLines={10} skeletonHeight='3'>    
              <Text h={{ base:'auto', sm:60 }} overflow={'scroll'} color={useColorModeValue('','#9fa0a2')} dangerouslySetInnerHTML={{ __html: description }} />
            </SkeletonText>
        </Box>
    </>
  )
}

export default TokenDescription;