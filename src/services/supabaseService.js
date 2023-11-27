// supabaseService.js
import { supabase } from './supabase';

// Function to send a message to Supabase
export const sendMessageToSupabase = async (userId, message) => {
    try {
        // Insert the message into the 'chat_messages' table
        const { data, error } = await supabase
            .from('chat_messages')
            .insert([{ user_id: userId, message: message }]);

        if (error) {
            console.error('Error sending message to Supabase:', error);
        }
        return data;
    } catch (error) {
        console.error('Error sending message to Supabase:', error);
        throw error;
    }
};

// Function to get the current logged-in user's ID
export const getCurrentUserId = async () => {

   
};

export const onSendMessage = async (message) => {
    // setLoading(true);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt:
                'Extract keywords from this text. Make the first letter of every word uppercase and separate with commas:\n\n' +
                message +
                '',
            temperature: 0.5,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.8,
            presence_penalty: 0.0,
        }),
    };
    
    try {
        const response = await fetch(import.meta.env.VITE_OPENAI_API_URL, options);
        const json = await response.json();
        if (json.choices && json.choices.length > 0) {
            let message = json.choices[0].text.trim();
            await sendMessageToSupabase('49fce734-a6ec-431f-9afe-651edee8f9f7', message);
        } else {
            console.error('Invalid response from OpenAI API:', json);
        }
        // setLoading(false);
    } catch (error) {
        console.error(error);
        alert(error);
    }

};


