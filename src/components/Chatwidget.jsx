// Chatwidget.js
import React from 'react';
import { Box, Flex, Image } from '@chakra-ui/react'; // Import Chakra UI components

const Chatwidget = ({ messages }) => {
    return (
        <Flex direction="column" p={4}>
            {messages.map((message) => (
                <Flex key={message.id} justify={message.user_id === 'ai' ? 'flex-start' : 'flex-end'} mb={2}>
                    
                    {/* Blob */}
                    <Box
                        borderRadius={10}
                        p={3}
                        bg={message.user_id === 'ai' ? 'blue.200' : 'green.200'}
                        color={message.user_id === 'ai' ? 'white' : 'black'}
                        maxW="60%"
                    >

                        {/* Logo or profile icon */}
                        {message.user_id === 'ai' ? (
                            <Image src="/ai-logo.png" alt="AI Logo" boxSize="30px" mr={2} />
                        ) : (
                            <Image src="/user-icon.png" alt="User Icon" boxSize="30px" ml={2} />
                        )}
                        <p>{message.message}</p>

                    </Box>
                </Flex>
            ))}
        </Flex>
    );
};

export default Chatwidget;