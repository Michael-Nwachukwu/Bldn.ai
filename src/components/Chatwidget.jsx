// Chatwidget.js
import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Spinner } from '@chakra-ui/react';
import { supabase } from '../services/supabase';

const Chatwidget = () => {
    const [messages, setMessages] = useState([]);
    // const [loading, setLoading] = useState(true);

    const fetchRecentMessagest = async () => {
        
        try {
            const { data: chat_messages, error } = await supabase
                .from('chat_messages')
                .select('*')
                // .order('created_at', { ascending: false }) // Order by timestamp in descending order
                // .range(0, 9); // Fetch the most recent 5 messages

            if (error) {
                console.error('Error fetching recent messages:', error);
                return;
            }else{
                console.log(chat_messages);
            }

            setMessages(chat_messages.reverse()); // Reverse the order to display the most recent message at the bottom
            // console.log(messages);
            // setLoading(false);
        } catch (error) {
            console.error('Error fetching recent messages:', error);
        }
    };

    const fetchRecentMessages = async () => {
        let { data: todos, error } = await supabase
            .from("chat_messages")
            .select("*")
            // .order("id", { ascending: false });
        if (error) console.log("error", error);
        else setMessages(todos);
        console.log(messages);
    };

    useEffect(() => {
        // const conversations = supabase.channel('conversations') // set your topic here

        // Fetch initial set of messages
        fetchRecentMessages();

        // // Function to handle real-time updates
        // const handleRealtimeUpdate = (payload) => {

        //     // Extract the new message from the payload
        //     const newMessage = payload.new;

        //     console.log(newMessage.id);

        //     // Update the state with the new message
        //     setMessages((prevMessages) => [...prevMessages, newMessage]);
            
        // };

        // // Subscribe to real-time updates for the 'chat_messages' table
        // conversations
        //     .on(
        //         'postgres_changes',
        //         {
        //             event: 'INSERT',
        //             schema: 'public', 
        //             table: 'chat_messages'
        //         },
        //         (payload) => handleRealtimeUpdate(payload)
        //     )
        // .subscribe()

    }, []);

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