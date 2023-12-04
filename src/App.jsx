// rafce for gen
import React from "react";
import { useState, useEffect } from "react";
import { Container, Box, Center, VStack } from "@chakra-ui/react";
import Main from "./components/Main";
import Auth from "./components/Auth";
import { supabase } from "./services/supabase";


const App = () => {
  // State variable to manage the user session
  const [session, setSession] = useState(null);

  // useEffect hook to fetch and update the user session
  useEffect(() => {
    // Fetch the current user session using Supabase authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Set the user session in the component state
      setSession(session);
    });

    // Subscribe to changes in the authentication state (user login/logout)
    supabase.auth.onAuthStateChange((_event, session) => {
      // Update the user session in the component state on state changes
      setSession(session);
    });

    
  }, []); // Run the effect only once on component mount
  return (
    <Box bg="#F7F1ED" minW="100vw" minH="100vh">
      <VStack>
        <Container minW={{ md:'90%', lg:'6xl' }}>
          <Box py={{ md:"3" }}>
            {!session ? <Auth /> : <Main session={session} setSession={setSession} />}
          </Box>
        </Container>
      </VStack>
    </Box>
  );
};

export default App;
