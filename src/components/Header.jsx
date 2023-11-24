import {
  Heading,
  Image,
  Text,
  Flex,
  Spacer,
  Box,
  Link,
  Button,
  Divider
} from "@chakra-ui/react";
import logo from "../assets/bldn xb.png";
import { supabase } from "../services/supabase";

const Header = () => {

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
  }
  
  return (
    <Box>
      <Box borderBottom={'1px'} borderColor="gray.300" pb={3}>
        <Flex minWidth="max-content" alignItems="center">
          <Image src={logo} alt="logo" width={90} marginBottom="1rem" />
          <Spacer />
          <Box>
            <Flex alignItems="center" gap={14} fontFamily='syncopate'>

              <Link  fontWeight={600} letterSpacing="0.2px" fontSize='sm' color="#030202" href="https://chakra-ui.com" isExternal>
                GitHub
              </Link>

              <Link  fontWeight={600} letterSpacing="0.2px" fontSize='sm' color="#030202" href="https://chakra-ui.com" isExternal>
                Contact
              </Link>

              <Button
                fontSize={'xs'}
                bg=''
                _hover={{ bg: 'brand.500', color: 'white' }}
                size="md"
                fontWeight="600" 
                letterSpacing="0.4px"
                border="1px"
                borderColor="#E3CCBF"
                boxShadow='md'
                onClick={()=>signOut()}
                rounded='lg'
              >
                Sign Out
              </Button>

            </Flex>
          </Box>
        </Flex>
      </Box>

      {/* <Divider /> */}
      
      <Heading fontWeight='bold' textAlign="center" pt={14} >
        Paste in your text below and we'll extract the keywords for you.
      </Heading>
      
    </Box>
  );
};

export default Header;
