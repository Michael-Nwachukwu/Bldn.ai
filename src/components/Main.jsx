import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input
} from "@chakra-ui/react";
import Chatinput from "./Chatinput";
import { onSendMessage } from "../services/supabaseService";
import Header from "./Header";
import Chatwidget from "./Chatwidget";

const Main = ({ session }) => {

  return (
    <>
      <Header session={session} />
      <Tabs isFitted variant="enclosed" colorScheme="green" mx={{ lg:24 }} mt={{ base:3, md:7 }}>
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
            <Chatwidget />
            <Chatinput onSendMessage={onSendMessage} />
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
    </>
  );
};

export default Main;
