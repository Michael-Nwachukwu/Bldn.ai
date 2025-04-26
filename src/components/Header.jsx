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
import { EditIcon, Hamburger, Moonlight, Sunshine } from "./Icons";
import logo from "../assets/bldn-black.png";
import whiteLogo from "../assets/bldn-wheat.png";
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


const Header = ({ session, setSession, fill, heading }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = React.useRef(null)
  const { user } = session;
  const [username, setUsername] = useState();
  const { colorMode, toggleColorMode } = useColorMode()
  const [isChecked, setIsChecked] = useState(false);


  const logoUrl = useColorModeValue("../outlook-green.png", "../outlook-light.png");
  const color = useColorModeValue('#030202', '#F7F1ED')
  const svgFill = useColorModeValue('#030202', 'oklch(92.9% 0.013 255.508)')


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
    <Box minWidth="100%">
      <Box minWidth="100%" borderBottom={"1px"} borderColor="gray.300" pt={2} pb={{ md:2 }}>
        <Flex minWidth="100%">

          <Image src={logoUrl} alt="logo" pt={1} width={{ base:'110px', md:140 }} height={{ base:'35px', md:'45px' }} />

          <Spacer />

          {/* lg screen navbar */}
          <Box>
            <Flex alignItems="center" gap={{ base:2, md:5, lg:5 }} fontFamily="syncopate">

              {/* github */}
              <Link
                fontWeight={600}
                letterSpacing="0.2px"
                fontSize="sm"
                color={color}
                href="https://github.com/Michael-Nwachukwu/Bldn.ai"
                target="_blank"
                rel="noopener noreferrer"
                display={{ base: 'none', md: 'block' }}
              >
                GitHub
              </Link>
              
              {/* contact */}
              <Link
                fontWeight={600}
                letterSpacing="0.2px"
                fontSize="sm"
                color={color}
                href="mailto:dahformulah@gmail.com"
                display={{ base: 'none', md: 'block' }}
              >
                Contact
              </Link>

              {/* username component */}
              <Flex alignItems="center" gap={1} className="username">
                <Tag
                  size="lg"
                  colorScheme="green"
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

              {/* sign out button */}
              <Button
                fontSize={"xs"}
                bg=""
                _hover={{ bg: "red", color: "white" }}
                size="md"
                fontWeight="600"
                letterSpacing="0.4px"
                color={"red"}
                border="1px"
                borderColor="red"
                boxShadow="md"
                onClick={() => signOut()}
                rounded="lg"
                display={{ base: 'none', md: 'block' }}
              >
                Sign Out
              </Button>

              {/* toggle light and dark mode */}
              <Button p={1} h={9} onClick={toggleColorMode} _hover={{ bg: '#4FA53133' }} className="light-dark-mode" bg={''}>
                {colorMode == 'light' ? <Moonlight fill={svgFill} /> : <Sunshine fill={svgFill} /> }
              </Button>

              <Menu >

                <MenuButton
                  as={IconButton}
                  display={{ lg: 'none' }}
                  aria-label='Options'
                  bg={''}
                  border={'none'}
                  _hover={{ bg: '' }}
                  _active={{ bg: '' }}
                  onClick={handleCheckboxChange}
                >
                  {/* Your custom SVG icon goes here */}
                  {/* <label htmlFor="menuCheckbox" className="hamburger">
                    <input id="menuCheckbox"
                      type="checkbox"
                      defaultChecked={isChecked}
                    />
                    <Hamburger fill={fill} colorMode={colorMode} />
                  </label> */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke={svgFill} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                  </svg>

                </MenuButton>

                <MenuList bg={'#f9f6f4'} shadow={'md'} color={'gray.700'}>

                  <MenuItem bg={'transparent'} _hover={{ bg: '#a86b48', color:'white' }} command='⌘T'>
                    <a
                      fontFamily={'syncopate'}
                      letterSpacing="0.2px"
                      fontSize="sm"
                      href="https://github.com/Michael-Nwachukwu/Bldn.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </MenuItem>

                  <MenuItem bg={'transparent'} _hover={{ bg: '#a86b48', color:'white' }} command='⌘N'>
                    <a
                      fontFamily={'syncopate'}
                      letterSpacing="0.2px"
                      fontSize="sm"
                      href="mailto:dahformulah@gmail.com"
                    >
                      Contact
                    </a>
                  </MenuItem>

                  <MenuItem bg={'transparent'}>

                    {/* sign out button */}
                    <Button
                      fontSize={"xs"}
                      bg="red.500"
                      _hover={{ bg: "red", color: "white" }}
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

          {/* mobile navigation */}
         
            
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
