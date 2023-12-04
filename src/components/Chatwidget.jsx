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

        '@media(max-width: 360px)': {
            height:'27.5rem',
        },

        '@media(min-width: 361px)': {
            height:'24rem',
        },

        '@media(min-width: 390px)': {
            height:'25rem',
        },

        '@media(min-width: 414px)': {
            height:'28.5rem',
        },

        '@media(min-width: 428px)': {
            height:'29rem',
        },

        '@media only screen and (min-width: 768px) and (max-width: 1023px)': {
            height:'35rem',
        },

        '@media only screen and (min-width: 800px) and (max-width: 1279px)': {
            height:'46rem',
        },

        '@media only screen and (min-width: 884px) and (max-width: 1104px)': {
            height:'41rem',
        },

        height:'29rem',
        
    })
    

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
            <Flex direction={"column"} pb={'15px'} p={{  lg:4 }} >
                {/* {loading && <Spinner color="green.500" />} */}
                {loading ? (
                    // Render skeletons when messages are being fetched
                    Array.from({ length: 5 }).map((_, index) => (
                        <Flex key={index} justify={index % 2 === 0 ? 'flex-end' : 'flex-start'} mb={2}>
                            <Box
                                className={index % 2 === 0 ? 'right' : 'left'}
                                maxW={{ base:'50%', md:"60%" }}
                            >
                                <Skeleton height="10rem" borderRadius={20} width={{ base:'20rem', md:'35rem', lg:'50rem' }} mb={2} />
                                <Skeleton height="10rem" borderRadius={20} width={{ base:'20rem', md:'35rem', lg:'50rem' }} mb={2} />
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
                                    maxW={{ base:'90%', md:"60%" }}
                                >
                                    <p className='chats'>{message.message}</p>
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