import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button, Textarea } from '@chakra-ui/react';
import { sendMessageToSupabase, getCurrentUserId } from '../services/supabaseService';
import { supabase } from '../services/supabase';

const Chatinput = ({ onSendMessage }) => {
    // state to track user input
    const [message, setMessage] = useState('');

    // Handle input change
    const handleMessageChange = (e) => {setMessage(e.target.value)};

    // handle sending message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if(message.trim() !== ''){

            // Get the current user's ID
            // const userId = getCurrentUserId();

            // const { data: profile } = await supabase
            //     .from('profiles')
            //     .select('id, username, email')
            //     .eq('id', auth.uid());

            // const userId = profile[0].id;

            const { data: { user } } = await supabase.auth.getUser()
            const userId = user.id;

            // Use the userId in sendMessageToSupabase
            await sendMessageToSupabase(userId, message);

            // reset inputs
            setMessage('');

            // commence sending message to chatgpt
            // onSendMessage(message);
        }else{
            alert('empty');
        }
    }
    return (
        <>
            <InputGroup size='md'>
                <Textarea
                    border={"1px"}
                    bg={"transparent"}
                    // py={7}
                    pr={24}
                    placeholder="Enter your prompt"
                    value={message}
                    onChange={handleMessageChange}
                    _hover={{ border:'' }}
                    focusBorderColor='brand.700'
                />
                <InputRightElement width='6rem'>
                    <Button 
                        h='2.8rem' 
                        size='lg' 
                        mt={10}
                        mr={4} 
                        bg={"black"} 
                        color={"white"} 
                        onClick={handleSendMessage}
                        _hover={{ bg:'' }}
                    >
                        Send
                    </Button>
                </InputRightElement>
            </InputGroup>
        </>
    )
}

export default Chatinput