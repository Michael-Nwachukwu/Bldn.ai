import React, { useEffect } from "react";
import {
    useMediaQuery,
    VStack
} from "@chakra-ui/react";
import { useTour } from "@reactour/tour";
import CryptyHome from "../outlook/CryptyHome";

const Outlook = () => {
    // reactTour methods
    const { setIsOpen, setSteps, setCurrentStep } = useTour();
    // media query, im using this to tour through different classes between mobile and lg screens
    const [isMobile] = useMediaQuery("(max-width: 767px)");

    useEffect(() => {
        const isCryptyToured = localStorage.getItem('cryptyToured') === true || localStorage.getItem('cryptyToured') === null;
        if (isCryptyToured) {
            // reset tour steps
            setCurrentStep(0);
            // set steps for first tour
            setSteps([
                {
                    selector: '.price',
                    content: 'Monitor price of tokens, metrics are updated every 30 seconds',
                    // action to run after first tour. sets item to local storage to signify is user has toured or not
                    action: () => {
                        localStorage.setItem('cryptyToured', true);
                    },
                },
                {
                    selector: isMobile ? '.global-line-metrics' : '.global-metrics',
                    content: 'Keep an eye on global market data',
                },
                {
                    selector: isMobile ? '.btn-mobile' : '.btn',
                    content: 'Use the button to add active tokens to watchlist',
                },
                {
                    selector: isMobile ? '.watchlist-mobile' : '.watchlist',
                    content: 'Coins added to watchlist can be found here',
                },
                {
                    selector: isMobile ? '.search-mobile' : '.search',
                    content: 'Search for token by contract address or id name example(bitcoin, ethereum, solane, fantom)',
                },
                {
                    selector: '.token-details',
                    content: 'Check out important metric data about searched token',
                },
                {
                    selector: '.chart',
                    content: '7 day historical price chart of active token',
                },
            ]);
            setTimeout(() => {
                // trigger tour
                setIsOpen(true);
            }, 3000);
        }
    }, []);

    return (
        <VStack p={-10} maxW={'100%'}>
            <CryptyHome />
        </VStack>
    );
};

export default Outlook;
