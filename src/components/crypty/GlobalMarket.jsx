import React, { useEffect } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import SmallCard from './Micros/SmallCard'
import useBaseUrl from './Stores/baseUrlStore'
import useGlobalStore from './Stores/globalMarketStore'

const GlobalMarket = () => {
  const baseUrl = useBaseUrl(state => state.baseUrl);
  const { globalMarketCap, globalVolume } = useGlobalStore();
    
  return (
    <>
        <Grid templateColumns={{ base:'1fr', lg:"1fr 1fr" }} gap={2}>
            <GridItem>
                <SmallCard value={globalMarketCap} title={'Total Market Cap'} />
            </GridItem>

            <GridItem display={{ base:'none', lg:'block' }}>
                <SmallCard value={globalVolume} title={'Total Trading Volume'} />
            </GridItem>
            
        </Grid>
    </>
  )
}

export default GlobalMarket