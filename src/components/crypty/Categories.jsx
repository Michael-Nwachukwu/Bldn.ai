import React, { useEffect, useState } from 'react';
import BigCard from './Micros/BigCard';
import { Box, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';

import useCategoriesStore from './Stores/categoriesStore';
import useBaseUrl from './Stores/baseUrlStore';

import MySwiper from './Micros/Swiper';


const Categories = () => {
    const baseUrl = useBaseUrl(state => state.baseUrl);
    const { fetchTrending, fetchRecentlyUpdated, fetchTrendingPools } = useCategoriesStore();
    const [loading, setLoading] = useState(false);
    
    const bulletColor = useColorModeValue('#672f19', '#ffe5c6');
    
    const categories = ['🔥 Trending coins', '🚀 Updated', '🎱 Trending pools'];
    
    useEffect(() => {
        const fetch = () => {
            setLoading(true);
            fetchTrending(baseUrl).then(() => setLoading(false));
            fetchRecentlyUpdated().then(() => setLoading(false));
            fetchTrendingPools().then(() => setLoading(false));
        }
        fetch();
        // Set up interval to fetch details every 30 seconds
        const intervalId = setInterval(() => {
            // alert(activeToken);
            fetch();
        }, 120000); // 120000 milliseconds = 2 minutes

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);


    return (
        <>
            <Grid display={{ base:'none', sm:'grid' }} templateColumns={{ base:'repeat(1, 1fr)', md:'repeat(3, 1fr)' }} gap={2} mt={6}>
                {categories.map((category, index) => (
                    <GridItem key={index} w='100%'>
                        <BigCard heading={category} loading={loading} />
                    </GridItem>
                ))}
            </Grid>

            <Box display={{ sm:'none' }}>
                <MySwiper bulletColor={bulletColor} space={60}>
                    {categories.map((category, index) => (
                        <BigCard key={index} heading={category} loading={loading} />
                    ))}
                </MySwiper>
            </Box>
        </>
    )
}

export default Categories