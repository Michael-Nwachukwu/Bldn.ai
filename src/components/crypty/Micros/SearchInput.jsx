import React from 'react'
import { useColorMode, Input, InputGroup, InputRightElement, Box, Flex, useColorModeValue } from '@chakra-ui/react'
import { Search } from '../../Icons';
import { useEffect } from 'react';

const SearchInput = () => {
    const colorMode = useColorMode();
    
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === '/') {
                event.preventDefault();
                document.getElementById('searchInput').focus();
            }
        };
        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

    return (
        <>
            {/* search input component for md and lg screens only */}
            <InputGroup ml={'auto'} size='md' display={{ base:'none', md:'flex' }} maxW={'xs'}>
                <Input
                    id="searchInput"
                    focusBorderColor={ useColorModeValue('brand.800', '#dfe5ed') }
                    border={useColorModeValue('1px', '')}
                    bg={colorMode == 'light' ? 'transparent' : "#1b232d"}
                    py={5}
                    placeholder='Search'
                    color={useColorModeValue('brand.800', 'white')}
                    name={"password"}
                    _hover={{ border:'' }}
                    _placeholder={{ color: useColorModeValue('brand.800', '#dfe5ed') }}
                    required
                />
                <InputRightElement width='4.5rem'>
                    <Flex justifyContent={'center'} w={6} bg={colorMode == 'light' ? 'brand.700' : "#384a61"} opacity={'70%'} color={"white"} borderRadius={5} fontWeight={'bold'}
                        _hover={{ bg:'' }} 
                    >
                        /
                    </Flex>
                </InputRightElement>
            </InputGroup>
                        
            <Box w={'70%'} ml={'auto'} pt={3} display={{ sm:'none' }}>
                <div className="form-control">
                    <input className="input-search input-alt" placeholder='Search' required="" type="text" style={{ textAlign: 'right' }} />
                    <span className="input-border input-border-alt"></span>
                    <Search fill={'#464a4d'} />
                </div>
            </Box>
            
        </>
    )
}

export default SearchInput;