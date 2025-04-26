import React, { useEffect } from "react";
import {
    Flex,
} from "@chakra-ui/react";
import { useTour } from "@reactour/tour";
import Chatwidget from "../Chatwidget";
import Chatinput from "../Chatinput";
import { onSendMessage } from "../../services/supabaseService";

const Chat = () => {

    // reactTour methods
    const { setIsOpen, setSteps, setCurrentStep } = useTour();

    useEffect(() => {
        // check if local storage has items, to signal if user has taken tour or not. the item is set after the first tour for new users.
        const isExtractorToured = localStorage.getItem('extractorToured') === true || localStorage.getItem('extractorToured') === null;
        if (isExtractorToured) {
            setTimeout(() => {
                // reset current step
                setCurrentStep(0);
                // set steps for first tour
                setSteps([
                    {
                        selector: '.username',
                        content: 'Stand out by setting a unique username for your account',
                        // action to run after first tour. sets item to local storage to signify is user has toured or not  
                        action: () => {
                            localStorage.setItem('extractorToured', true);
                        },
                    },
                    {
                        selector: '.light-dark-mode',
                        content: 'Toggle between light and dark mode',
                    },
                    {
                        selector: '.chatbox',
                        content: 'Go ahead and paste in some text and our AI powered bot will extract the keywords for you',
                    },
                ])
            }, 5000);
            // trigger tour
            setIsOpen(true);
        }
    }, []);

    return (

        <Flex direction="column" overflowY={'hidden'}>
            <Chatwidget flex="1" />
            <Chatinput onSendMessage={onSendMessage} />
        </Flex>

    );
};

export default Chat;
