import React from 'react'
import { starSvg } from '../../Icons'
import { Tag, TagLabel, TagRightIcon } from '@chakra-ui/react'

const Watchlist = ({colorMode}) => {
  return (
    <>
        <Tag size={'md'} variant={colorMode == 'light' ? 'outline' : 'subtle'} colorScheme='brand' py={1} _hover={{ 
            color:'brand.300',
            }}>
            <TagLabel display={{ base:'none', lg:'block' }} pr={2}>Add to Watchlist</TagLabel>
            <TagRightIcon as={starSvg} />
        </Tag>
    </>
  )
}

export default Watchlist