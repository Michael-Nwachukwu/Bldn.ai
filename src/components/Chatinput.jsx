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

            const { data: { user } } = await supabase.auth.getUser()
            const userId = user.id;

            // Use the userId in sendMessageToSupabase
            const messageId = await sendMessageToSupabase(userId, message);

            // reset inputs
            setMessage('');

            // commence sending message to chatgpt
            onSendMessage(message, messageId, messageId);
        }else{
            alert('empty');
        }
    }
    return (
        <>
            {/* <InputGroup size='md' mt={3}>
                <Textarea
                    border={"1px"}
                    bg={"transparent"}
                    pr={24}
                    placeholder="Enter your prompt"
                    value={message}
                    onChange={handleMessageChange}
                    _hover={{ border:'' }}
                    focusBorderColor='brand.700'
                    borderRadius={{ base:10, md:20 }}
                    
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
            </InputGroup> */}
            
            <div className="fixed-container">
                <div className="textarea-container">
                    <textarea
                        onChange={handleMessageChange}
                        placeholder="Message.."
                        className="input"
                        type="text"
                    ></textarea>
                    <button className='go' onClick={handleSendMessage}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='send' fill='#e3ccbf' height="16" width="16" viewBox="0 0 512 512"><path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
                    </button>
                </div>
            </div>

        </>
    )
}

export default Chatinput