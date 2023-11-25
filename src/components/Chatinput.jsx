import React, { useState } from 'react';
import { Input } from '@chakra-ui/react';
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

            const { data: profile } = await supabase
                .from('profiles')
                .select('id, username, email');

            const userId = profile[0].id;

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
            <form action="" onSubmit={handleSendMessage}>
                <Input
                    border={"1px"}
                    bg={"transparent"}
                    py={7}
                    placeholder="Type a Message"
                    value={message}
                    onChange={handleMessageChange}
                    style={{ position: 'relative' }}
                />
                <button onClick={handleSendMessage} style={{ position: 'absolute',right:30, top:80, background:'black', padding:'0.7em 1.5em 0.7em 1.5em', color:'#F7F1ED', borderRadius:'10px',  }}>
                    <span>
                        Send
                    </span>
                </button>
            </form>
        </>
    )
}

export default Chatinput