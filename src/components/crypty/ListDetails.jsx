import React from 'react'
import { List, ListItem, Flex, Text, Divider, useColorModeValue } from '@chakra-ui/react'
import useTokenDetailsStore from './Stores/tokenDetailsStore'

const ListDetails = ({color}) => {
    const { marketCap, tradingVolume, fdv } = useTokenDetailsStore();

    return (
        <>
            <List px={3} spacing={1.5} color={color} fontSize={{ base:'xs', sm:'sm' }} w={{ base:'100%', sm:'xl' }}>
                <ListItem>
                    <Flex justify={'space-between'} align={'center'}>
                        <Text color={useColorModeValue('black', '#888b8d')}>Market Cap</Text>
                        <Text fontWeight={'semibold'}>{marketCap}</Text>
                    </Flex>
                </ListItem>
                <Divider />
                <ListItem>
                    <Flex justify={'space-between'} align={'center'}>
                        <Text color={useColorModeValue('black', '#888b8d')}>24 Hour Trading Vol</Text>
                        <Text fontWeight={'semibold'}>{tradingVolume}</Text>
                    </Flex>
                </ListItem>
                <Divider />
                <ListItem>
                    <Flex justify={'space-between'} align={'center'}>
                        <Text color={useColorModeValue('black', '#888b8d')}>Fully Diluted Valuation </Text>
                        <Text fontWeight={'semibold'}>{fdv}</Text>
                    </Flex>
                </ListItem>
            </List>
        </>
    )
}

export default ListDetails