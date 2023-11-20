// rafce for gen
import React from "react";
import { Container, Box, Center, VStack } from "@chakra-ui/react";
import Header from "./components/Header";
import Main from "./components/Main";


const App = () => {
  return (
    <Box bg="#F7F1ED" w="100vw" h="100vh">
      <VStack>
        <Container minW='6xl'>
          <Box py={"3"}>
            <Header />
            <Main />
          </Box>
        </Container>
      </VStack>
    </Box>
  );
};

export default App;
