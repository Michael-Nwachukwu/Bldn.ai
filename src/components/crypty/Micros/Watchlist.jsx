import React from 'react'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

const Watchlist = () => {
    return (
        <>
            <Menu isLazy>
                <MenuButton fontWeight={'semibold'} fontSize={'sm'}>⭐️Watchlist</MenuButton>
                <MenuList>
                    <MenuItem>New Window</MenuItem>
                    <MenuItem>Open Closed Tab</MenuItem>
                    <MenuItem>Open File</MenuItem>
                </MenuList>
            </Menu>
        </>
    )
    
}

export default Watchlist