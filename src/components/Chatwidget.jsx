// Chatwidget.js
import React, { useEffect, useState } from 'react';
import { Box, Flex, Spinner, Skeleton, useBoolean, Text } from '@chakra-ui/react';
import { supabase } from '../services/supabase';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';
import dateFormat from 'dateformat';

const Chatwidget = () => {
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useBoolean(true);
    // const [loading, setLoading] = useState(true);

    // make css rules for react-scrollToBottom component
    let rule = css({
        height:'27rem'
    })

    // const fetchRecentMessages = async () => {

    //     const { data: { user } } = await supabase.auth.getUser()
        
    //     try {
    //         const { data: chat_messages, error } = await supabase
    //             .from('chat_messages')
    //             .select('*')
    //             .order('created_at', { ascending: false }) // Order by timestamp in descending order
    //             .eq('user_id', user.id)
    //             .eq('reply_to', messageId)
    //             setMessageid(chat_messages.id)
    //             // .range(0, 9); // Fetch the most recent 5 messages
    //         if (error) {
    //             console.error('Error fetching recent messages:', error);
    //             return;
    //         }else{

    //             setUserId(user.id);
                
    //             setMessages(chat_messages.reverse()); // Reverse the order to display the most recent message at the bottom

    //         }

    //         // setLoading(false);
    //     } catch (error) {
    //         console.error('Error fetching recent messages:', error);
    //     }
    // };
    

    const fetchRecentMessages = async () => {

        setLoading.on();

        try {
            const { data: { user } } = await supabase.auth.getUser();
    
            const { data: chat_messages, error } = await supabase
                .from('chat_messages')
                .select('*')
                .order('created_at', { ascending: false }) // Order by timestamp in descending order
                .eq('user_id', user.id)
    
            if (error) {
                console.error('Error fetching recent messages:', error);
                return;
            }else{
                // chat_messages.length === 0 ? setFlag.off() : setFlag.on();
            }

            setUserId(user.id);
    
            // Fetch related messages for each message in chat_messages
            const allMessages = await Promise.all(chat_messages.map(async (message) => {
                const { data: relatedMessages, error: relatedMessagesError } = await supabase
                    .from('chat_messages')
                    .select('*')
                    .eq('reply_to', message.id)
                    // .range(0, 9);
    
                if (relatedMessagesError) {
                    console.error('Error fetching related messages:', relatedMessagesError);
                    alert('Error fetching related messages:', relatedMessagesError);
                    return [];
                }
    
                return [...relatedMessages, message]; // Include the original message in the array
            }));
    
            // Flatten the array of arrays into a single array
            const flattenedMessages = allMessages.flat();

            
            // Reverse the order to display the most recent message at the bottom
            setMessages(flattenedMessages.reverse());
            
            setLoading.off();

        } catch (error) {
            console.error('Error fetching recent messages:', error);
            setLoading.off();
        }

    };

    useEffect(() => {
        const conversations = supabase.channel('conversations') // set your topic here

        // Fetch initial set of messages
        fetchRecentMessages();

        // Function to handle real-time updates
        const handleRealtimeUpdate = (payload) => {

            // Extract the new message from the payload
            const newMessage = payload.new;

            // Update the state with the new message
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            
        };


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
        <ScrollToBottom className={`${rule}`}>
            <Flex direction={"column"} p={4} >
                {/* {loading && <Spinner color="green.500" />} */}
                {loading ? (
                    // Render skeletons when messages are being fetched
                    Array.from({ length: 5 }).map((_, index) => (
                        <Flex key={index} justify={index % 2 === 0 ? 'flex-end' : 'flex-start'} mb={2}>
                            <Box
                                className={index % 2 === 0 ? 'right' : 'left'}
                                maxW="60%"
                            >
                                <Skeleton height="10rem" borderRadius={20} width={'20rem'} mb={2} />
                                <Skeleton height="10rem" borderRadius={20} width={'20rem'} mb={2} />
                            </Box>
                        </Flex>
                    ))
                ) : (
                    messages.length > 0 ? (
                        // Render actual messages when available
                        messages.map((message) => (
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
                                    <Flex mt={2} justify={'end'}>
                                        <small style={{  opacity: 0.6 }}>
                                            {dateFormat(message.created_at, "h:MM TT, mmmm dS, yyyy")}
                                        </small>
                                    </Flex>
                                </Box>
                            </Flex>
                        ))
                    ) :  (
                        <Text textAlign="center" color="gray.500" mt={4}>
                        No messages available.
                    </Text>
                    )
                )}
                
            </Flex>
        </ScrollToBottom>
    );
};

export default Chatwidget;