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


const Header = ({ session, setSession, fill, }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = React.useRef(null)
  const { user } = session;
  const [username, setUsername] = useState();
  const { colorMode, toggleColorMode } = useColorMode()
  const [isChecked, setIsChecked] = useState(false);


  const logoUrl = useColorModeValue(logo, whiteLogo)
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
                    <IconButton size="sm" bg={''} _hover={{ bg:'' }} icon={<EditIcon fill={svgFill} />} />
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
              
              
              <Button bg={''} pb={2} _hover={{ bg:'' }} onClick={toggleColorMode}>
                {colorMode == 'light' ? <Moonlight fill={svgFill} /> : <Sunshine fill={svgFill} /> }
              </Button>

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
                    {/* <svg viewBox="0 0 32 32">
                      <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                      <path className="line" d="M7 16 27 16"></path>
                    </svg> */}
                    <Hamburger fill={fill} colorMode={colorMode} />
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
                {colorMode == 'light' ? <Moonlight fill={svgFill} /> : <Sunshine fill={svgFill} /> }
              </Button>

            </Flex>
          </Box>
            
        </Flex>
      </Box>

      <Heading fontWeight="bold" textAlign="center" pt={{ base:3, md:6, lg:5}} 
      fontSize={{ base:'16px', md:'22px', lg:'30px' }}>
        Pate in an address and we'll extract the details
      </Heading>
    </Box>
  );
};

export default Header;
