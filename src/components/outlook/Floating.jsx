import React from 'react';
import { Search } from '../Icons';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

const Floating = () => {
  return (
    <>
      <Flex display={{ sm:'none' }} position={'fixed'} maxW={'md'} p={4} right={4} bottom={5} bg={useColorModeValue('#e3ccbf', '#212d3b')} shadow={'md'}  borderRadius={'full'} justify={'center'} align={'center'} className='search'>
        <Box>
          <Search fill={useColorModeValue('black', 'white')} />
        </Box>
      </Flex>
    </>
  )
}

export default Floating