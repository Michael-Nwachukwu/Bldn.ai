// Chatwidget.js
import React, { useEffect, useState, useRef } from 'react';
import { Box, Flex, Image, Spinner } from '@chakra-ui/react';
import { supabase } from '../services/supabase';

const Chatwidget = () => {
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(null);
    // const [loading, setLoading] = useState(true);
    const ref = useRef(<HTMLDivElement />);

    function scrollToBottom() {
        ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }

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

                setMessages(chat_messages.reverse()); // Reverse the order to display the most recent message at the bottom

            }

            scrollToBottom();

            // setLoading(false);
        } catch (error) {
            console.error('Error fetching recent messages:', error);
        }
    };
    
    useEffect(() => {
        // Fetch initial set of messages
        fetchRecentMessages();

        // Function to handle real-time updates
        const handleRealtimeUpdate = (payload) => {

            // Extract the new message from the payload
            const newMessage = payload.new;

            // Update the state with the new message
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            
            scrollToBottom();
            
        };

        const conversations = supabase.channel('conversations') // set your topic here

        // Subscribe to real-time updates for the 'chat_messages' table
        conversations
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public', 
                    table: 'chat_messages'
                },
                (payload) => handleRealtimeUpdate(payload)
            )
        .subscribe()


    }, []);

    return (
        <Flex direction="column" p={4} maxH={"23rem"} overflow="auto" className='widget'>
            {/* {loading && <Spinner color="green.500" />} */}
            {messages.map((message) => (
                <Flex key={message.id} justify={message.user_id === `${userId}` ? 'flex-end' : 'flex-start'} mb={2}>
                    {/* Blob */}
                    <Box
                        className={message.user_id === `${userId}` ? 'right' : 'left'}
                        p={3}
                        bg={message.user_id === `${userId}` ? '#e3ccbf' : '#a86b48'}
                        color={message.user_id === `${userId}` ? 'brand.900' : 'white'}
                        maxW="60%"
                    >
                        <p>{message.message}</p>
                    </Box>
                </Flex>
            ))}
            <div ref={ref} />
        </Flex>
    );
};

export default Chatwidget;