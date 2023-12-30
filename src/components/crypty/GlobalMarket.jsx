import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import SmallCard from './Micros/SmallCard'

const GlobalMarket = () => {
  return (
    <>
        <Grid templateColumns={{ base:'1fr', lg:"1fr 1fr" }} gap={2}>
            <GridItem>
                <SmallCard value={'$1,655,669,299,690'} title={'Market Capitalization'} />
            </GridItem>

            <GridItem display={{ base:'none', lg:'block' }}>
                <SmallCard value={'$54,691,566,748'} title={'24h Trading Volume'} />
            </GridItem>
            
        </Grid>
    </>
  )
}

export default GlobalMarket