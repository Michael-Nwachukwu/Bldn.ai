import { Box, Flex, Text, Spacer } from '@chakra-ui/react'
import React from 'react'

const Home = () => {
  return (
    <>
        <Box>
            <Flex>
                <Box>
                    <Text>Bitcoin BTC</Text>
                    <Text
                        fontSize={50}
                        fontWeight={"bold"}
                    >
                        $42,222.62
                    </Text>
                </Box>
                <Spacer />
                <Flex direction={"column"} alignItems={"center"} gap={3}>
                    <Box 
                        bg={"brand.300"}
                        h={12}
                        w={60}
                        borderRadius={10}
                    >
                    </Box>
                    <Box 
                        bg={"brand.300"}
                        h={12}
                        w={60}
                        borderRadius={10}
                    >
                    </Box>
                </Flex>
            </Flex>
        </Box>
    </>
  )
}

export default Home