import React, { useEffect } from 'react';
import BigCard from './Micros/BigCard';
import { Grid, GridItem } from '@chakra-ui/react';
import useCategoriesStore from './Stores/categoriesStore';
import useBaseUrl from './Stores/baseUrlStore';


const Categories = () => {
    const baseUrl = useBaseUrl(state => state.baseUrl);
    const { fetchTrending, fetchRecentlyUpdated, fetchTrendingPools } = useCategoriesStore();
    const categories = ['🔥 Trending', '🚀 Updated', '🎱 Trending pools'];
    
    useEffect(() => {
        fetchTrending(baseUrl);
        fetchRecentlyUpdated();
        fetchTrendingPools();
    }, [])


    return (
        <Grid display={{ base:'none', sm:'grid' }} templateColumns={{ base:'repeat(1, 1fr)', md:'repeat(3, 1fr)' }} gap={2} mt={6}>
            {categories.map((category, index) => (
                <GridItem key={index} w='100%'>
                    <BigCard heading={category} />
                </GridItem>
            ))}
        </Grid>
    )
}

export default Categories