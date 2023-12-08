import React, { useState, useEffect, useRef } from "react";
import {
  Heading,
  Image,
  Flex,
  Spacer,
  Box,
  Link,
  Button,
  Tag,
  Avatar,
  TagLabel,
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  FocusLock,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Stack,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  useColorModeValue

} from "@chakra-ui/react";
import { EditIcon } from "./EditIcon";
import logo from "../assets/bldn xb.png";
import logoWhite from "../assets/bldn-white.png";
import { supabase } from "../services/supabase";
import avatar from "../assets/avatar.jpg"

// 1. Create a text input component
const TextInput = React.forwardRef((props, ref) => {

  const { id, label, setUsername, ...rest } = props;
  const handleBlur = (e) => {
    setUsername(e.target.value);
  };

  return (
    <FormControl>
      <FormLabel fontSize={"11px"} htmlFor={id}>{label}</FormLabel>
      <Input fontSize={"11px"} ref={ref} id={id} onBlur={handleBlur} {...rest} />
    </FormControl>
  )
})

// 2. Create the form
const Form = ({ firstFieldRef, onCancel, setUsername, updateProfile, username, id }) => {
  return (
    <Stack spacing={4} >
      <TextInput
        label='Username'
        id={id}
        ref={firstFieldRef}
        defaultValue= {username}
        setUsername={setUsername}
      />
      <ButtonGroup display='flex' justifyContent='flex-end'>
                  
        <Button variant='outline' onClick={onCancel} fontSize={"11px"}>
          Cancel
        </Button>
                  
        <Button onClick={(e) => updateProfile(e)} colorScheme='brand' fontSize={"11px"}>
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  )
}


const Header = ({ session, setSession, fill }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = React.useRef(null)
  const { user } = session;
  const [username, setUsername] = useState();
  const { colorMode, toggleColorMode } = useColorMode()
  const [isChecked, setIsChecked] = useState(false);


  const logoUrl = useColorModeValue(logo, logoWhite)
  const color = useColorModeValue('#030202', '#F7F1ED')
  const svgFill = useColorModeValue('#030202', '#e3ccbf')


  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // useEffect hook to fetch and update user profile information
  useEffect(() => {
    // Variable to track whether the component is still mounted
    let ignore = false;

    // Function to get user profile information
    async function getProfile() {

      // Fetch user profile data from the 'profiles' table in Supabase
      const { data, error } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', user.id)
        .single();

      // Check if the component is still mounted
      if (!ignore) {
        // Handle errors or update profile state based on fetched data
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
        }
      }
    }

    // Call the getProfile function
    getProfile();

    // Cleanup function to handle component unmounting
    return () => {
      ignore = true;
    };
  }, [session]); // Run the effect whenever the session changes


  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  // Function to update the user profile
  async function updateProfile(e) {

    e.preventDefault();

    let usernameValue = firstFieldRef.current?.value;
    // Set loading state to true before sending the update request
    // setLoading(true);

    const { data: username, error } = await supabase
      .from('profiles')
      .update({ username: usernameValue })
      .eq('id', user.id)
      .select();

    // Handle errors or update the avatar_url state
    if (error) {
      alert(error.message);
    }
      
    setUsername(usernameValue);

    // Close the popover
    onClose();

    // Set loading state to false after the update request is complete
    // setLoading(false);
  }

  return (
    <Box>
      <Box borderBottom={"1px"} borderColor="gray.300" pt={3} pb={{ md:2 }}>
        <Flex minWidth="max-content" >

          <Image src={logoUrl} alt="logo" width={{ base:'70px', md:90 }} marginBottom="1rem" />

          <Spacer />

          <Box display={{ base: 'block', md: 'none' }}>
            <Flex alignItems={'start'} gap={3}>

              <Flex alignItems="center" gap={1}>
                <Tag
                  size="lg"
                  colorScheme="red"
                  fontSize={"11px"}
                  borderRadius="full"
                >
                  <Avatar
                    src={avatar}
                    size="xs"
                    name="User"
                    ml={-1}
                    mr={2}
                  />
                  <TagLabel fontWeight={"bold"}>{username ? username : 'user'}</TagLabel>
                </Tag>

                <Popover
                  isOpen={isOpen}
                  initialFocusRef={firstFieldRef}
                  onOpen={onOpen}
                  onClose={onClose}
                  placement="bottom"
                  closeOnBlur={false}
                >
                  <PopoverTrigger>
                    <IconButton size="sm" bg={''} _hover={{ bg:'' }} icon={<EditIcon />} />
                  </PopoverTrigger>
                  <PopoverContent p={5}>
                    <FocusLock returnFocus persistentFocus={false}>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <Form firstFieldRef={firstFieldRef} onCancel={onClose} session={session} setUsername={setUsername} updateProfile={updateProfile} username={username} id={'mobile-form'} />
                    </FocusLock>
                  </PopoverContent>
                </Popover>
              </Flex>
              
              <Menu>

                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  // variant='outline'
                  bg={''}
                  border={'none'}
                  pb={2}
                  _hover={{ bg: '' }}
                  _active={{ bg: '' }}
                  onClick={handleCheckboxChange}
                >
                  {/* Your custom SVG icon goes here */}
                  <label htmlFor="menuCheckbox" className="hamburger">
                    <input id="menuCheckbox"
                      type="checkbox"
                      checked={isChecked}
                    />
                    <svg viewBox="0 0 32 32">
                      <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                      <path className="line" d="M7 16 27 16"></path>
                    </svg>
                  </label>
                </MenuButton>

                <MenuList bg={'#f9f6f4'} shadow={'md'} color={'gray.700'}>
                  <MenuItem bg={'transparent'} _hover={{ bg: '#a86b48', color:'white' }} command='⌘T'>
                    <Link
                      fontFamily={'syncopate'}
                      letterSpacing="0.2px"
                      fontSize="sm"
                      href="https://github.com/Michael-Nwachukwu"
                      isExternal
                    >
                      GitHub
                    </Link>

                  </MenuItem>
                  <MenuItem bg={'transparent'} _hover={{ bg: '#a86b48', color:'white' }} command='⌘N'>
                    <Link
                        fontFamily={'syncopate'}
                        letterSpacing="0.2px"
                        fontSize="sm"
                        href="https://chakra-ui.com"
                        isExternal
                      >
                        Contact
                      </Link>
                  </MenuItem>
                  <MenuItem bg={'transparent'}>

                    <Button
                      fontSize={"xs"}
                      bg="#a86b48"
                      _hover={{ bg: "brand.500", color: "white" }}
                      size="md"
                      fontWeight="600"
                      letterSpacing="0.4px"
                      border="1px"
                      borderColor="#E3CCBF"
                      boxShadow="md"
                      color={'white'}
                      onClick={() => signOut()}
                      rounded="lg"
                      ml={'auto'}
                    >
                      Sign Out
                    </Button>
                  </MenuItem>
                </MenuList>

              </Menu>

            </Flex>
          </Box>
        
          <Box display={{ base: 'none', md: 'block' }}>
            <Flex alignItems="center" gap={{ md:5, lg:14 }} fontFamily="syncopate">
              <Link
                fontWeight={600}
                letterSpacing="0.2px"
                fontSize="sm"
                color={color}
                href="https://github.com/Michael-Nwachukwu"
                isExternal
              >
                GitHub
              </Link>

              <Link
                fontWeight={600}
                letterSpacing="0.2px"
                fontSize="sm"
                color={color}
                href="https://chakra-ui.com"
                isExternal
              >
                Contact
              </Link>

              <Flex alignItems="center" gap={1}>
                <Tag
                  size="lg"
                  colorScheme="red"
                  fontSize={"11px"}
                  borderRadius="full"
                >
                  <Avatar
                    src={avatar}
                    size="xs"
                    name="User"
                    ml={-1}
                    mr={2}
                  />
                  <TagLabel fontWeight={"bold"}>{username ? username : 'user'}</TagLabel>
                </Tag>

                <Popover
                  isOpen={isOpen}
                  initialFocusRef={firstFieldRef}
                  onOpen={onOpen}
                  onClose={onClose}
                  placement="bottom"
                  closeOnBlur={false}
                >
                  <PopoverTrigger>
                    <IconButton size="sm" bg={''} _hover={{ bg:'' }} icon={<EditIcon fill={svgFill} />} />
                  </PopoverTrigger>
                  <PopoverContent p={5}>
                    <FocusLock returnFocus persistentFocus={false}>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <Form firstFieldRef={firstFieldRef} onCancel={onClose} session={session} setUsername={setUsername} updateProfile={updateProfile} username={username} id={'md-form'} />
                    </FocusLock>
                  </PopoverContent>
                </Popover>
              </Flex>


              <Button
                fontSize={"xs"}
                bg=""
                _hover={{ bg: "brand.500", color: "white" }}
                size="md"
                fontWeight="600"
                letterSpacing="0.4px"
                border="1px"
                borderColor="#E3CCBF"
                boxShadow="md"
                onClick={() => signOut()}
                rounded="lg"
              >
                Sign Out
              </Button>

              <Button onClick={toggleColorMode}>
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="#a86b48" height="20" width="16" viewBox="0 0 384 512"><path d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0c-.1 0-.2 0-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z"/></svg>
              </Button>

            </Flex>
          </Box>
            
        </Flex>
      </Box>

      <Heading fontWeight="bold" textAlign="center" pt={{ base:3, md:6, lg:5}} 
      fontSize={{ base:'16px', md:'22px', lg:'30px' }}>
        Paste in your text below and we'll extract the keywords for you.
      </Heading>
    </Box>
  );
};

export default Header;
