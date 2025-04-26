import React from 'react'
import { starSvg } from '../../Icons'
import { Link, Tag, TagLabel, TagRightIcon } from '@chakra-ui/react'

import useWatchListStore from '../Stores/watchListStore'
import useActiveTokenStore from '../Stores/activeTokenStore'
import useGetUserIdStore from '../Stores/getUserIdStore'

const WatchlistBtn = ({colorMode}) => {
  const addToWatchList = useWatchListStore(state => state.addToWatchList);
  const watchlist = useWatchListStore((state) => state.watchlist) || [];

  const activeToken = useActiveTokenStore(state => state.activeToken);

  const userId = useGetUserIdStore(state => state.userId);

  const isTokenInWatchlist = watchlist.includes(activeToken);

  // function that handles adding tokens to watchlist, we first check to be sure token isnt already in the watchlist
  const handleClick = () => {
    if (!isTokenInWatchlist) {
      addToWatchList(userId, activeToken);
    }
  };

  return (
    <>
      <Link onClick={handleClick} disabled={isTokenInWatchlist}>
        <Tag 
          size={'md'} 
          variant={colorMode == 'light' ? 'outline' : 'subtle'} 
          colorScheme={isTokenInWatchlist ? 'green' : 'red'} 
          py={1}
        >
          <TagLabel display={{ base:'none', lg:'block' }} pr={2}>
            {isTokenInWatchlist ? 'Added' : 'Add to watchlist'}
          </TagLabel>
          <TagRightIcon as={starSvg} />
        </Tag>
      </Link>
    </>
  )  
}

export default WatchlistBtn;