import React from 'react'
import { Box, Grid, GridItem, useColorModeValue, Skeleton } from '@chakra-ui/react'
import SmallCard from './Micros/SmallCard'
import useGlobalStore from './Stores/globalMarketStore'
import MySwiper from './Micros/Swiper'

const GlobalMarket = ({loading}) => {
  const { globalMarketCap, globalVolume } = useGlobalStore();
  const bulletColor = useColorModeValue('#672f19', '#ffe5c6');
    
  return (
    <>
        <Grid display={{ md:'none', lg:'grid' }} templateColumns={{ base:'1fr', lg:"1fr 1fr" }} gap={2}>
            <GridItem>
                <Skeleton isLoaded={!loading} borderRadius={10}>
                    <SmallCard value={globalMarketCap} title={'Total Market Cap'} />
                </Skeleton>
            </GridItem>

            <GridItem>
                <Skeleton isLoaded={!loading} borderRadius={10}>
                  <SmallCard value={globalVolume} title={'Total Trading Volume'} />
                </Skeleton>
            </GridItem>
        </Grid>

        <Box display={{ lg:'none' }}>
          <Skeleton isLoaded={!loading} borderRadius={10}>
            <MySwiper bulletColor={bulletColor} space={0}>
              <SmallCard value={globalMarketCap} title={'Total Market Cap'} />
              <SmallCard value={globalVolume} title={'Total Trading Volume'} />
              <SmallCard value={globalMarketCap} title={'Total Market Cap'} />
              <SmallCard value={globalVolume} title={'Total Trading Volume'} />
            </MySwiper>
          </Skeleton>
        </Box>
    </>
  )
}

export default GlobalMarket