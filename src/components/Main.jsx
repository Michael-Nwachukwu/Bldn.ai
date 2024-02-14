import React, { useEffect } from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input,
  VStack,
  Flex,
  useMediaQuery
} from "@chakra-ui/react";
import Chatinput from "./Chatinput";
import { onSendMessage } from "../services/supabaseService";
import Header from "./Header";
import Chatwidget from "./Chatwidget";
import CryptyHome from "./crypty/CryptyHome";
import { useTour } from "@reactour/tour";

const Main = ({ session}) => {
  // reactTour methods
  const { setIsOpen, setSteps, setCurrentStep } = useTour();
  // media query, im using this to tour through different classes between mobile and lg screens
  const [isMobile] = useMediaQuery("(max-width: 767px)");

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

  const handleCryptyTour = () => {
    const isCryptyToured = localStorage.getItem('cryptyToured') === true || localStorage.getItem('cryptyToured') === null;
    if(isCryptyToured){
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
        localStorage.setItem('toured', 'extractor&crypty');
      }, 3000);
    }
  }

  return (
    <VStack  spacing={0}>
      <Header session={session} />
      <Tabs 
        isFitted 
        variant="enclosed" 
        mx={{ lg:20 }} 
        w={'100%'} 
        mt={{ base:3, md:10, lg:5 }} 
      >
        <TabList mb="0.5em" fontFamily="syncopate">
          <Tab
            borderBottom={"1px"}
            _selected={{ border: "1px", borderBottom: "none" }}
            fontSize={{ base:'10px', md:'13px' }}
          >
            Extractor
          </Tab>
          <Tab
            borderBottom={"1px"}
            _selected={{ border: "1px", borderBottom: "none" }}
            fontSize={{ base:'10px', md:'13px' }}
            onClick={handleCryptyTour}
          >
            Crypty
          </Tab>
          
        </TabList>

        <TabPanels>

          <TabPanel overflowY={'hidden'}>
            <Flex direction="column" overflowY={'hidden'}>
              <Chatwidget flex="1" />
              <Chatinput onSendMessage={onSendMessage} />
            </Flex>
          </TabPanel>

          <TabPanel p={-10}>
            <CryptyHome />
          </TabPanel>
          
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default Main;
