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

const Main = () => {
  return (
    <>
      <Tabs isFitted variant="enclosed" colorScheme="green" mx={24} mt={12}>
        <TabList mb="1em">
          <Tab
            borderBottom={"1px"}
            _selected={{ border: "1px", borderBottom: "none" }}
          >
            Key word Extractor
          </Tab>
          <Tab
            borderBottom={"1px"}
            _selected={{ border: "1px", borderBottom: "none" }}
          >
            Crypty
          </Tab>
          <Tab
            borderBottom={"1px"}
            _selected={{ border: "1px", borderBottom: "none" }}
          >
            Toll
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Chatinput />
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
