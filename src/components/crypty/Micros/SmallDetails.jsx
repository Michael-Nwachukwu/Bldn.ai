import React from 'react'
import { useColorModeValue } from '@chakra-ui/react';

const SmallDetails = ({label,value}) => {
    const smallStatsLabelColor= useColorModeValue('black', '#dfe5ed');
    const smallStatsValueColor= useColorModeValue('red', '#f8c6a9');
    return (
        <>
            <small style={{ color:smallStatsLabelColor, marginLeft:'7px' }}>
                {label} <span style={{ color:smallStatsValueColor }}>{value}</span>
            </small>
        </>
    )
}

export default SmallDetails