import React, { useEffect, useState } from 'react';
import { Box, Flex, Spinner, Skeleton, useBoolean, Text, useClipboard, Button } from '@chakra-ui/react';
import { supabase } from '../services/supabase';
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';
import dateFormat from 'dateformat';

const Chatwidget = () => {
    // Message: Local instantiation of Messages table on db
    const [messages, setMessages] = useState([]);
    // State Logged in User Id
    const [userId, setUserId] = useState(null);

    const [loading, setLoading] = useBoolean(true);
    const [copyable, setCopyable] = useState();
    const { hasCopied, onCopy } = useClipboard(copyable);


    // make css rules for react-scrollToBottom component
    let rule = css({

        '@media(max-width: 360px)': {
            height:'30.5rem',
        },

        '@media(min-width: 361px)': {
            height:'27rem',
        },

        '@media(min-width: 390px)': {
            height:'28rem',
        },

        '@media(min-width: 414px)': {
            height:'31.5rem',
        },

        '@media(min-width: 428px)': {
            height:'32rem',
        },

        '@media only screen and (min-width: 768px) and (max-width: 1023px)': {
            height:'38rem',
        },

        '@media only screen and (min-width: 800px) and (max-width: 1279px)': {
            height:'49rem',
        },

        '@media only screen and (min-width: 884px) and (max-width: 1104px)': {
            height:'44rem',
        },

        height:'32rem',
        
    })


    const fetchRecentMessages = async () => {

        // Function to fetch messages from database.(Messages table on supabase db)
        // Here we are initializing loading with a chakraui Boolean Hook, this is to track when fetch starts and stops to be able to render skeletons, loaders and see how to display "No messages" message if db returns empty.
        // Then we fetch details of logged in user with the auth.getUser() directive.
        // Next we fetch the messages that belongs to logged in user with the  .eq('user_id', user.id).
        // Check for errors and render them if any, else we're setting the global userId variable to logged in user id.

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
                setUserId(user.id);
            }

            // Fetch related messages for each message in chat_messages
            // Here we are fetching another array of replies to logged in users messages. 
            // We are mapping through chat_messages which is the data we got previously from fetching users messages and we are using each message to get its reply from the db with the '.eq('reply_to', message.id)' 
            // We are checking for any errors and responding accordingly and if not we are creating an array assigned to allMessage and adding the relatedMessages as well as the originally fetched message. Hence every message and its reply.
    
            const allMessages = await Promise.all(chat_messages.map(async (message) => {
                const { data: relatedMessages, error: relatedMessagesError } = await supabase
                    .from('chat_messages')
                    .select('*')
                    .eq('reply_to', message.id)
    
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
    
    // Handles copying message to clipboard using the useClipboard Hook
    const handleCopy = () => {
        onCopy();
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
                                    {message.user_id !== `${userId}` && (
                                        <Flex justify={'end'} mb={2}>
                                            {/* Copy button */}
                                            <Button size={'xs'} onClick={() => { setCopyable(message.message); handleCopy(); }}>
                                                {hasCopied ? 'Copied!' : 'Copy'}
                                            </Button>
                                        </Flex>
                                    )}
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