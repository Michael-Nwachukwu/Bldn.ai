// rafce for gen
import React from "react";
import { Container, Box, Center, VStack } from "@chakra-ui/react";
import Header from "./components/Header";
import Main from "./components/Main";
import Auth from "./components/Auth";


const App = () => {
  return (
    <Box bg="#F7F1ED" minW="100vw" minH="100vh">
      <VStack>
        <Container minW='6xl'>
          <Box py={"3"}>
            {/* <Header />
            <Main /> */}
            <Auth />
          </Box>
        </Container>
      </VStack>
    </Box>
  );
};

export default App;
