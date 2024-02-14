import React from "react";
import { useState, useEffect} from "react";
import { Container, Box, useColorModeValue, VStack } from "@chakra-ui/react";
import Main from "./components/Main";
import Auth from "./components/Auth";
import { supabase } from "./services/supabase";
import useGetUserIdStore from "./components/crypty/Stores/getUserIdStore";
import { TourProvider } from "@reactour/tour";


const App = () => {
  // State variable to manage the user session
  const [session, setSession] = useState(null);

  // get user id from store
  const getUserId = useGetUserIdStore(state => state.getUserId);

  // app bg based on light and dark mode
  const bg = useColorModeValue('#F7F1ED', '#0e1217');

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
    <TourProvider 
      steps={[]}
      scrollSmooth
      startAt={0}
      styles={{
        popover: (base) => ({
          ...base,
          '--reactour-accent': '#a86b48',
          borderRadius: radius,
          backgroundColor: useColorModeValue(lightBgColor, darkBgColor), // Background color based on color mode
          color: useColorModeValue(lightTextColor, darkTextColor), // Text color based on color mode
        }),
        maskArea: (base) => ({ ...base, rx: radius }),
        maskWrapper: (base) => ({ ...base, color: '#ffe5c686' }),
        badge: (base) => ({ ...base, left: 'auto', right: '-0.8125em' }),
        controls: (base) => ({ ...base, marginTop: 100 }),
        close: (base) => ({ ...base, right: 'auto', left: 8, top: 8 }),
      }}
    >
      <Box bg={bg} minW="100vw" minH="100vh">
        <VStack>
          <Container minW={{ md:'90%', lg:'6xl' }}>
            <Box py={{ md:"3" }}>
              {!session ? <Auth /> : <Main session={session} setSession={setSession} />}
            </Box>
          </Container>
        </VStack>
      </Box>
    </TourProvider>
  );
};

export default App;
