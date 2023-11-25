// Chatwidget.js
import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Spinner } from '@chakra-ui/react';
import { supabase } from '../services/supabase';

const Chatwidget = () => {
    const [messages, setMessages] = useState([]);
    // const [loading, setLoading] = useState(true);

    const fetchRecentMessages = async () => {
        try {
            const { data, error } = await supabase
                .from('chat_messages')
                .select('*')
                .order('created_at', { ascending: false }) // Order by timestamp in descending order
                .range(0, 4); // Fetch the most recent 5 messages

            if (error) {
                console.error('Error fetching recent messages:', error);
                return;
            }

            setMessages(data.reverse()); // Reverse the order to display the most recent message at the bottom
            setLoading(false);
        } catch (error) {
            console.error('Error fetching recent messages:', error);
        }
    };

    useEffect(() => {
        const conversations = supabase.channel('conversations') // set your topic here

        // Fetch initial set of messages
        // fetchRecentMessages();

        // Function to handle real-time updates
        const handleRealtimeUpdate = (payload) => {

            // Extract the new message from the payload
            const newMessage = payload.new;

            // Update the state with the new message
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            
        };

        // Subscribe to real-time updates for the 'chat_messages' table

        // const subscription = supabase
        //     .channel('chat_messages')
        //     .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, handleRealtimeUpdate)
        //     .subscribe()

        // Simple function to log any messages we receive
        function messageReceived(payload) {
            console.log(payload)
        }

        conversations
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public', 
                    table: 'chat_messages'
                },
                (payload) => messageReceived(payload)
            )
        .subscribe()


        // conversations
        //     .on(
        //         'postgres_changes',
        //         {
        //             event: 'INSERT',
        //             schema: 'public',
        //             table: 'chat_messages'
        //         },
        //         (payload) => {
        //             console.log(payload)
        //             handleRealtimeUpdate();
        //         } 
        //     )
        // .subscribe()



    }, []); // Ensure this effect runs only once when the component mounts

    return (
        <Flex direction="column" p={4}>
        {/* {loading && <Spinner color="green.500" />} */}
        {messages.map((message) => (
            <Flex key={message.id} justify={message.user_id === '001' ? 'flex-start' : 'flex-end'} mb={2}>
            {/* Blob */}
            <Box
                borderRadius={10}
                p={3}
                bg={message.user_id === '001' ? 'blue.200' : 'green.200'}
                color={message.user_id === '001' ? 'white' : 'black'}
                maxW="60%"
            >
                {/* Logo or profile icon */}
                {message.user_id === '001' ? (
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