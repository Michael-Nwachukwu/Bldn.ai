import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input,
  VStack,
  Flex
} from "@chakra-ui/react";
import Chatinput from "./Chatinput";
import { onSendMessage } from "../services/supabaseService";
import Header from "./Header";
import Chatwidget from "./Chatwidget";

const Main = ({ session, heading}) => {
  const headings = [
    "Paste in your text below and we'll extract the keywords for you.",
    "Pate in an address and we'll extract the details for you.",
    "Ask a question about taxt and we'll fetch the answers for you."
  ];
  
  return (
    <VStack maxH="100vh" spacing={0}>
      <Header session={session} />
      <Tabs isFitted variant="enclosed" mx={{ lg:20 }} w={'100%'} mt={{ base:3, md:10, lg:5 }}>
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
          >
            Crypty
          </Tab>
          <Tab
            borderBottom={"1px"}
            _selected={{ border: "1px", borderBottom: "none" }}
            fontSize={{ base:'10px', md:'13px' }}
          >
            Toll
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel >
            <Flex direction="column">
              <Chatwidget flex="1" />
              <Chatinput onSendMessage={onSendMessage} />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Input
              border={"1px"}
              bg={"transparent"}
              py={7}
              placeholder="Basic usage"
            />
          </TabPanel>
          <TabPanel>
            <Input
              border={"1px"}
              bg={"transparent"}
              py={7}
              placeholder="Basic usage"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default Main;
