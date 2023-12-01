import React from "react";
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
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  ButtonGroup,

} from "@chakra-ui/react";
import { EditIcon } from "./EditIcon";
import logo from "../assets/bldn xb.png";
import { supabase } from "../services/supabase";

// 1. Create a text input component
const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel fontSize={"11px"} htmlFor={props.id}>{props.label}</FormLabel>
      <Input fontSize={"11px"} ref={ref} id={props.id} {...props} />
    </FormControl>
  )
})

// 2. Create the form
const Form = ({ firstFieldRef, onCancel, session }) => {
  return (
    <Stack spacing={4} >
      <TextInput
        label='Username'
        id='username'
        ref={firstFieldRef}
        defaultValue= {session.username}
      />
      <ButtonGroup display='flex' justifyContent='flex-end'>
                  
        <Button variant='outline' onClick={onCancel} fontSize={"11px"}>
          Cancel
        </Button>
                  
        <Button isDisabled colorScheme='teal' fontSize={"11px"}>
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  )
}

const Header = ({ session }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = React.useRef(null)
  const { user } = session;


  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <Box>
      <Box borderBottom={"1px"} borderColor="gray.300" pb={3}>
        <Flex minWidth="max-content" alignItems="center">
          <Image src={logo} alt="logo" width={90} marginBottom="1rem" />
          <Spacer />
          <Box>
            <Flex alignItems="center" gap={14} fontFamily="syncopate">
              <Link
                fontWeight={600}
                letterSpacing="0.2px"
                fontSize="sm"
                color="#030202"
                href="https://chakra-ui.com"
                isExternal
              >
                GitHub
              </Link>

              <Link
                fontWeight={600}
                letterSpacing="0.2px"
                fontSize="sm"
                color="#030202"
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
                    src="https://bit.ly/sage-adebayo"
                    size="xs"
                    name="Segun Adebayo"
                    ml={-1}
                    mr={2}
                  />
                  <TagLabel fontWeight={"bold"}>{user.username ? user.username : 'User'}</TagLabel>
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
                      <Form firstFieldRef={firstFieldRef} onCancel={onClose} session={session} />
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
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Heading fontWeight="bold" textAlign="center" pt={8}>
        Paste in your text below and we'll extract the keywords for you.
      </Heading>
    </Box>
  );
};

export default Header;
