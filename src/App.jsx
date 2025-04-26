import React from "react";
import { useState, useEffect } from "react";
import { Container, Box, useColorModeValue, VStack } from "@chakra-ui/react";
import Main from "./components/Main";
import Auth from "./components/Auth";
import { supabase } from "./services/supabase";
import useGetUserIdStore from "./components/outlook/Stores/getUserIdStore";
import { TourProvider } from "@reactour/tour";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from "./components/pages/chat";
import Outlook from "./components/pages/outlook";
import Layout from "./components/pages/layout";


const App = () => {
  // State variable to manage the user session
  const [session, setSession] = useState(null);

  // get user id from store
  const getUserId = useGetUserIdStore(state => state.getUserId);

  // app bg based on light and dark mode
  const bg = useColorModeValue('white', '#0e1217');

  // reacttour var
  const radius = 10;

  // const steps = useTourStepStore(state => state.steps);

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


  useEffect(() => {
    getUserId();
  })

  const lightBgColor = "#FFFFFF";
  const lightTextColor = "#000000";
  const darkBgColor = "#1A202C";
  const darkTextColor = "#FFFFFF";


  return (
    <Router>
      <TourProvider
        steps={[]}
        scrollSmooth
        startAt={0}
        styles={{
          popover: (base) => ({
            ...base,
            '--reactour-accent': '#a86b48',
            borderRadius: 10,
            backgroundColor: useColorModeValue("#FFFFFF", "#1A202C"),
            color: useColorModeValue("#000000", "#FFFFFF"),
          }),
          maskArea: (base) => ({ ...base, rx: 10 }),
          maskWrapper: (base) => ({ ...base, color: '#ffe5c686' }),
          badge: (base) => ({ ...base, left: 'auto', right: '-0.8125em' }),
          controls: (base) => ({ ...base, marginTop: 100 }),
          close: (base) => ({ ...base, right: 'auto', left: 8, top: 8 }),
        }}
      >
        <Box bg={bg} minW="100vw" minH="100vh">
          <VStack>
            <Container minW={{ md: '90%', lg: '6xl' }}>
              <Box py={{ md: "3" }}>
                {!session ? (
                  <Auth />
                ) : (
                  <Routes>
                    <Route element={<Layout session={session} setSession={setSession} />}>
                      <Route path="/" index element={<Outlook />} />
                      <Route path="/chat" element={<Chat />} />
                    </Route>
                  </Routes>
                )}
              </Box>
            </Container>
          </VStack>
        </Box>
      </TourProvider>
    </Router>

  );
};

export default App;
