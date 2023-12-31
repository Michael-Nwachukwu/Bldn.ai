import React, { useEffect } from 'react';
import BigCard from './Micros/BigCard';
import { Box, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';

import useCategoriesStore from './Stores/categoriesStore';
import useBaseUrl from './Stores/baseUrlStore';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';


const Categories = () => {
    const baseUrl = useBaseUrl(state => state.baseUrl);
    const { fetchTrending, fetchRecentlyUpdated, fetchTrendingPools } = useCategoriesStore();
    const categories = ['🔥 Trending', '🚀 Updated', '🎱 Trending pools'];
    const bulletColor = useColorModeValue('#672f19', '#ffe5c6');

    
    useEffect(() => {
        fetchTrending(baseUrl);
        fetchRecentlyUpdated();
        fetchTrendingPools();
    }, [])


    return (
        <>
            <Grid display={{ base:'none', sm:'grid' }} templateColumns={{ base:'repeat(1, 1fr)', md:'repeat(3, 1fr)' }} gap={2} mt={6}>
                {categories.map((category, index) => (
                    <GridItem key={index} w='100%'>
                        <BigCard heading={category} />
                    </GridItem>
                ))}
            </Grid>

            <Box display={{ sm:'none' }}>
                <Swiper
                    spaceBetween={60}
                    loop={"true"}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        renderBullet: (index, className) =>
                            `<span class="${className}" style="background-color: ${bulletColor} ;"></span>`,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                >
                    {categories.map((category, index) => (
                        <SwiperSlide>
                            <BigCard heading={category} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </>
    )
}

export default Categories