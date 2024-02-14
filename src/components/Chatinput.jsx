import React, { useState } from 'react';
// import { Input, InputGroup, InputRightElement, Button, Textarea } from '@chakra-ui/react';
import { sendMessageToSupabase, getCurrentUserId } from '../services/supabaseService';
import { supabase } from '../services/supabase';

import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { color } from 'framer-motion';

const Chatinput = ({ onSendMessage }) => {
    // state to track user input
    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(false);

    const { colorMode } = useColorMode();

    const color = useColorModeValue('white', 'black');

    const circleColor = useColorModeValue("#a86b48", "#fff");


    // Handle input change
    const handleMessageChange = (e) => {setMessage(e.target.value)};

    // handle sending message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(message.trim() !== ''){

            // reset inputs
            setMessage('');

            const { data: { user } } = await supabase.auth.getUser()
            const userId = user.id;

            // Use the userId in sendMessageToSupabase
            const messageId = await sendMessageToSupabase(userId, message);

            // commence sending message to chatgpt
            const messageSent = await onSendMessage(message, messageId);
            if (messageSent) {
                setLoading(false); // Set loading state to false if message sent successfully
            } else {
                // Handle message sending failure
                setLoading(false);
                alert('Failed to process');
            }

        }else{
            alert('Chatbox is empty, please enter some text to extract');
            setLoading(false);
        }
    }
    return (
        <>
            <div style={{ background: colorMode == 'light' ? '#F7F1ED' : '#0e1217' }} className="fixed-container">
                <div className="textarea-container chatbox">
                    <textarea
                        onChange={handleMessageChange}
                        placeholder="Paste text to extract.."
                        className="input"
                        type="text"
                        value={message}
                        color={color}
                        style={{ caretColor: colorMode == 'light' ? '#a86b48' : '#e3ccbf' }}
                    ></textarea>
                    
                    {loading && 
                        <div class="loader">
                            <div class="circle" style={{ background: circleColor }}></div>
                            <div class="circle" style={{ background: circleColor }}></div>
                            <div class="circle" style={{ background: circleColor }}></div>
                            <div class="circle" style={{ background: circleColor }}></div>
                        </div>
                    }

                    { !loading && 
                        <button disabled={message == '' ? true : false} className='go' style={{ background: useColorModeValue( message === '' ? '#e3ccbf' : '#a86b48', message == '' ? '#1b232d' : '#a86b48') }} onClick={handleSendMessage}>
                            <svg xmlns="http://www.w3.org/2000/svg" className='send' fill={ useColorModeValue( message === '' ? 'black' : 'white', message === '' ? '#91a2b8' : 'white')} height="16" width="16" viewBox="0 0 512 512"><path d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"/></svg>
                        </button>
                    }
                </div>
            </div>

        </>
    )
}

export default Chatinput