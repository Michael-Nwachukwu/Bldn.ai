import React from 'react'
import { useColorModeValue } from '@chakra-ui/react';

const SmallDetails = ({label,value}) => {
    const smallStatsLabelColor= useColorModeValue('black', '#dfe5ed');
    return (
        <>
            <small style={{ color:smallStatsLabelColor,  }}>
                {label} <span style={{ color:"#4FA531", fontWeight:'bold' }}>{value}</span>
            </small>
        </>
    )
}

export default SmallDetails