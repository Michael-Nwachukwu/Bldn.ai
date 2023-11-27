// Chatwidget.js
import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Spinner } from '@chakra-ui/react';
import { supabase } from '../services/supabase';

const Chatwidget = () => {
    const [messages, setMessages] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    const fetchRecentMessages = async () => {
        
        try {
            const { data: chat_messages, error } = await supabase
                .from('chat_messages')
                .select('*')
                .order('created_at', { ascending: false }) // Order by timestamp in descending order
                // .range(0, 9); // Fetch the most recent 5 messages
            if (error) {
                console.error('Error fetching recent messages:', error);
                return;
            }else{
                const { data: { user } } = await supabase.auth.getUser()

                setUserId(user.id);

                // console.log(chat_messages);
                setMessages(chat_messages.reverse()); // Reverse the order to display the most recent message at the bottom
            }

            // console.log(messages);
            // setLoading(false);
        } catch (error) {
            console.error('Error fetching recent messages:', error);
        }
    };

    const fetchRecentMessagest = async () => {
        let { data: todos, error } = await supabase
            .from("chat_messages")
            .select("id, message")
            // .order("id", { ascending: false });
        if (error) {console.log("error", error); return null}
        else {console.log(todos);return todos;}
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
        <Flex direction="column" p={4} maxH={"23rem"}
        overflow={'scroll'}>
            {/* {loading && <Spinner color="green.500" />} */}
            {messages.map((message) => (
                <Flex key={message.id} justify={message.user_id === `${userId}` ? 'flex-end' : 'flex-start'} mb={2}>
                    {/* Blob */}
                    <Box
                        borderRadius={10}
                        p={3}
                        bg={message.user_id === `${userId}` ? 'green.200' : 'blue.200'}
                        color={message.user_id === `${userId}` ? 'black' : 'white'}
                        maxW="60%"
                        
                    >
                        {/* Logo or profile icon */}
                        {message.user_id === `${!userId}` ? (
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