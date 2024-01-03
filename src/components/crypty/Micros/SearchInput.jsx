import React, { useState } from 'react'
import { useColorMode, Input, InputGroup, InputRightElement, Box, Flex, useColorModeValue, FormControl, FormHelperText, FormErrorMessage } from '@chakra-ui/react'
import { Search } from '../../Icons';
import { useEffect } from 'react';
import useTokenDetailsStore from '../Stores/tokenDetailsStore';

const SearchInput = () => {
    const fetchDetails = useTokenDetailsStore(state => state.fetchDetails);
    const colorMode = useColorMode();
    const [input, setInput] = useState();

    const handleUpdateInput = (e) => {setInput(e.target.value)};


    // let isError;

    const handleSubmit = (event) => {
        event.preventDefault();
        // const input = event.target.elements.searchInput.value;
        // isError = inputValue === ''
        fetchDetails(input);
        setInput('');
    };
    
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
            <form onSubmit={handleSubmit} style={{ width:'100%' }}>
                <InputGroup ml={'auto'} size='md' display={{ base:'none', md:'flex' }} maxW={'xs'}>
                    <Input
                        id="searchInput"
                        focusBorderColor={ useColorModeValue('brand.800', '#dfe5ed') }
                        border={useColorModeValue('1px', '')}
                        bg={useColorModeValue('transparent', "#1b232d")}
                        py={5}
                        placeholder='Search'
                        color={useColorModeValue('brand.800', 'white')}
                        onChange={handleUpdateInput}
                        name={"password"}
                        _hover={{ border:'' }}
                        _placeholder={{ color: useColorModeValue('brand.800', '#dfe5ed') }}
                        required
                    />
                    <InputRightElement width='4.5rem'>
                        <Flex justifyContent={'center'} w={6} bg={useColorModeValue('brand.700', "#384a61")} opacity={'70%'} color={"white"} borderRadius={5} fontWeight={'bold'}
                            _hover={{ bg:'' }} 
                        >
                            /
                        </Flex>
                    </InputRightElement>
                </InputGroup>
            </form>

            <Box w={'70%'} ml={'auto'} pt={3} display={{ sm:'none' }}>
                <form onSubmit={handleSubmit} style={{ width:'100%' }} className="form-control">
                    <input className="input-search input-alt" onChange={handleUpdateInput} placeholder='Search' required="" type="text" style={{ textAlign: 'right' }} />
                    <span className="input-border input-border-alt"></span>
                    <a href="#" type='submit'>
                        <Search fill={'#464a4d'} />
                    </a>
                </form>
            </Box>
            
        </>
    )
}

export default SearchInput;