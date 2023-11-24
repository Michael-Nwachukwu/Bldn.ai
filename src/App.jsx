import React, { useState, useEffect } from "react";
import { Container, Box, Center, VStack } from "@chakra-ui/react";
import Header from "./components/Header";
import Main from "./components/Main";
import Auth from "./components/Auth";
import { supabase } from "./services/supabase";

const App = () => {
  // State variable to manage the user session
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: session }) => {
      setUser(session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
      }
    );

    return () => {
      if(user){
        authListener?.unsubscribe();
      }
    };
  }, [user]);

  return (
    <Box bg="#F7F1ED" minW="100vw" minH="100vh">
      <VStack>
        <Container minW='6xl'>
          <Box py={"3"}>
            {!user ? <Auth /> : <Main />}
          </Box>
        </Container>
      </VStack>
    </Box>
  );
};

export default App;