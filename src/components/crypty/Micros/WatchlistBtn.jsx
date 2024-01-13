import React from 'react'
import { starSvg } from '../../Icons'
import { Link, Tag, TagLabel, TagRightIcon } from '@chakra-ui/react'

import useWatchListStore from '../Stores/watchListStore'
import useActiveTokenStore from '../Stores/activeTokenStore'
import useGetUserIdStore from '../Stores/getUserIdStore'

const WatchlistBtn = ({colorMode}) => {
    const addToWatchList = useWatchListStore(state => state.addToWatchList);
    const activeToken = useActiveTokenStore(state => state.activeToken);
    const userId = useGetUserIdStore(state => state.userId);

    return (
      <>
        <Link onClick={addToWatchList(userId, activeToken)}>
          <Tag size={'md'} variant={colorMode == 'light' ? 'outline' : 'subtle'} colorScheme='brand' py={1} _hover={{ 
              color:'brand.300',
              }}>
              <TagLabel display={{ base:'none', lg:'block' }} pr={2}>Add to Watchlist</TagLabel>
              <TagRightIcon as={starSvg} />
          </Tag>
        </Link>
      </>
    )  
}

export default WatchlistBtn;