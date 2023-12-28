import React from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, CardBody, VStack, Flex, Text, Spacer, Box, List, ListItem, Image, Divider, useColorMode, useColorModeValue } from '@chakra-ui/react';

import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';



const GeneralStats = () => {
  const colorMode = useColorMode();
  const color = useColorModeValue('gray', '#dfe5ed');
  const borderColor = useColorModeValue('#e3ccbf', '#212d3b');
  const bulletColor = useColorModeValue('#672f19', '#ffe5c6');

  return (
    <>
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
        <SwiperSlide>
          <Card size={'sm'} h={'auto'} minH={48} variant={'outline'} bg={'transparent'} borderRadius={10} border={'2px'} borderColor={borderColor} >
              <CardBody>
                  <VStack>
                      <Flex alignItems={'center'} w={'100%'}>
                          <Text fontSize={18} fontWeight={'semibold'} color={colorMode === "light" ? 'gray.600' : 'white'}>🔥 Trending</Text>
                          <Spacer />
                          <Box w={4} h={4} borderRadius={'full'} bg={colorMode === "light" ? 'gray.700' : '#dfe5ed'}></Box>
                      </Flex>
                      <List w={'100%'} spacing={2.5} mt={2.5} color={color}>
                          <ListItem>
                              <Flex alignItems={'center'}>
                                  <Flex alignItems={'center'} gap={4}>
                                      <Image
                                          borderRadius='full'
                                          boxSize='24px'
                                          src="https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg?1696523566"
                                          alt='Dan Abramov'
                                      />
                                      <Text fontWeight={'semibold'} fontSize={14}>
                                          APE
                                      </Text>
                                  </Flex>
                                  <Spacer />
                                  <Text>1.56568341</Text>
                              </Flex>
                          </ListItem>
                          <Divider />
                          <ListItem>
                              <Flex alignItems={'center'}>
                                  <Flex alignItems={'center'} gap={4}>
                                      <Image
                                          borderRadius='full'
                                          boxSize='24px'
                                          src="https://assets.coingecko.com/coins/images/28600/small/bonk.jpg?1696527587"
                                          alt='Dan Abramov'
                                      />
                                      <Text fontWeight={'semibold'} fontSize={14}>
                                          BONK
                                      </Text>
                                  </Flex>
                                  <Spacer />
                                  <Text>1.56568341</Text>
                              </Flex>
                          </ListItem>
                          <Divider />
                          <ListItem>
                              <Flex alignItems={'center'}>
                                  <Flex alignItems={'center'} gap={4}>
                                      <Image
                                          borderRadius='full'
                                          boxSize='24px'
                                          src="https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg?1696523566"
                                          alt='Dan Abramov'
                                      />
                                      <Text fontWeight={'semibold'} fontSize={14}>
                                          COQ INU
                                      </Text>
                                  </Flex>
                                  <Spacer />
                                  <Text>1.56568341</Text>
                              </Flex>
                          </ListItem>
                      </List>
                  </VStack>
              </CardBody>
          </Card>
        </SwiperSlide>

        <SwiperSlide>
          <Card size={'sm'} h={'auto'} minH={48} variant={'outline'} bg={'transparent'} borderRadius={10} border={'2px'} borderColor={borderColor} >
              <CardBody>
                  <VStack>
                      <Flex alignItems={'center'} w={'100%'}>
                          <Text fontSize={18} fontWeight={'semibold'} color={colorMode === "light" ? 'gray.600' : 'white'}>🔥 Tr</Text>
                          <Spacer />
                          <Box w={4} h={4} borderRadius={'full'} bg={colorMode === "light" ? 'gray.700' : '#dfe5ed'}></Box>
                      </Flex>
                      <List w={'100%'} spacing={2.5} mt={2.5} color={color}>
                          <ListItem>
                              <Flex alignItems={'center'}>
                                  <Flex alignItems={'center'} gap={4}>
                                      <Image
                                          borderRadius='full'
                                          boxSize='24px'
                                          src="https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg?1696523566"
                                          alt='Dan Abramov'
                                      />
                                      <Text fontWeight={'semibold'} fontSize={14}>
                                          APE
                                      </Text>
                                  </Flex>
                                  <Spacer />
                                  <Text>1.56568341</Text>
                              </Flex>
                          </ListItem>
                          <Divider />
                          <ListItem>
                              <Flex alignItems={'center'}>
                                  <Flex alignItems={'center'} gap={4}>
                                      <Image
                                          borderRadius='full'
                                          boxSize='24px'
                                          src="https://assets.coingecko.com/coins/images/28600/small/bonk.jpg?1696527587"
                                          alt='Dan Abramov'
                                      />
                                      <Text fontWeight={'semibold'} fontSize={14}>
                                          BONK
                                      </Text>
                                  </Flex>
                                  <Spacer />
                                  <Text>1.56568341</Text>
                              </Flex>
                          </ListItem>
                          <Divider />
                          <ListItem>
                              <Flex alignItems={'center'}>
                                  <Flex alignItems={'center'} gap={4}>
                                      <Image
                                          borderRadius='full'
                                          boxSize='24px'
                                          src="https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg?1696523566"
                                          alt='Dan Abramov'
                                      />
                                      <Text fontWeight={'semibold'} fontSize={14}>
                                          COQ INU
                                      </Text>
                                  </Flex>
                                  <Spacer />
                                  <Text>1.56568341</Text>
                              </Flex>
                          </ListItem>
                      </List>
                  </VStack>
              </CardBody>
          </Card>
        </SwiperSlide>

        <SwiperSlide>
          <Card size={'sm'} h={'auto'} minH={48} variant={'outline'} bg={'transparent'} borderRadius={10} border={'2px'} borderColor={borderColor} >
              <CardBody>
                  <VStack>
                      <Flex alignItems={'center'} w={'100%'}>
                          <Text fontSize={18} fontWeight={'semibold'} color={colorMode === "light" ? 'gray.600' : 'white'}>🔥 winnn</Text>
                          <Spacer />
                          <Box w={4} h={4} borderRadius={'full'} bg={colorMode === "light" ? 'gray.700' : '#dfe5ed'}></Box>
                      </Flex>
                      <List w={'100%'} spacing={2.5} mt={2.5} color={color}>
                          <ListItem>
                              <Flex alignItems={'center'}>
                                  <Flex alignItems={'center'} gap={4}>
                                      <Image
                                          borderRadius='full'
                                          boxSize='24px'
                                          src="https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg?1696523566"
                                          alt='Dan Abramov'
                                      />
                                      <Text fontWeight={'semibold'} fontSize={14}>
                                          APE
                                      </Text>
                                  </Flex>
                                  <Spacer />
                                  <Text>1.56568341</Text>
                              </Flex>
                          </ListItem>
                          <Divider />
                          <ListItem>
                              <Flex alignItems={'center'}>
                                  <Flex alignItems={'center'} gap={4}>
                                      <Image
                                          borderRadius='full'
                                          boxSize='24px'
                                          src="https://assets.coingecko.com/coins/images/28600/small/bonk.jpg?1696527587"
                                          alt='Dan Abramov'
                                      />
                                      <Text fontWeight={'semibold'} fontSize={14}>
                                          BONK
                                      </Text>
                                  </Flex>
                                  <Spacer />
                                  <Text>1.56568341</Text>
                              </Flex>
                          </ListItem>
                          <Divider />
                          <ListItem>
                              <Flex alignItems={'center'}>
                                  <Flex alignItems={'center'} gap={4}>
                                      <Image
                                          borderRadius='full'
                                          boxSize='24px'
                                          src="https://assets.coingecko.com/coins/images/24383/small/apecoin.jpg?1696523566"
                                          alt='Dan Abramov'
                                      />
                                      <Text fontWeight={'semibold'} fontSize={14}>
                                          COQ INU
                                      </Text>
                                  </Flex>
                                  <Spacer />
                                  <Text>1.56568341</Text>
                              </Flex>
                          </ListItem>
                      </List>
                  </VStack>
              </CardBody>
          </Card>
        </SwiperSlide>

      </Swiper>
    </>
  )
}

export default GeneralStats