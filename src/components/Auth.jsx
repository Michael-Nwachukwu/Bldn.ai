import { useRef, useState } from "react";
import { supabase } from "../services/supabase";
import { Box, Center, Flex, VStack, Image, Input, InputGroup, InputRightElement, Button, Divider, Link, Spacer, AlertIcon, Alert, AlertDescription, Text } from "@chakra-ui/react";
import logo from "../assets/bldn xb.png";

const Auth = () => {
    const [helperText, setHelperText] = useState({ error: null, text: null });
    const emailRef = useRef();
    const passwordRef = useRef();
    const [show, setShow] = useState(false);    
    const [mode, setMode] = useState('Sign In');
    const handleClick = () => setShow(!show);

    const switchMode = () => {
        if(mode == "Sign In"){setMode('Sign Up')}else{setMode('Sign In')}
    }

    const handleLogin = async (type) => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
    
        try {
            const { user, error } =
                type === "LOGIN"
                    ? await supabase.auth.signIn({ email, password })
                    : await supabase.auth.signUp({ email, password });
    
            if (error) {
                setHelperText({ error: true, text: error.message });
            } else if (!user && !error) {
                setHelperText({
                    error: false,
                    text: "An email has been sent to you for verification!",
                });
            }
        } catch (error) {
            console.error('Login/Sign-up Error:', error.message);
            // Handle unexpected errors
            setHelperText({ error: true, text: "An unexpected error occurred. Check that you have an active internet connection and are signing into an existing account" });
        }
    };
    


    // const handleLogin = async (type) => {
    //     const email = emailRef.current?.value;
    //     const password = passwordRef.current?.value;

    //     const { user, error } =
    //         type === "LOGIN"
    //             ? await supabase.auth.signIn({ email, password })
    //             : await supabase.auth.signUp({ email, password });
    //     if (error) {
    //         setHelperText({ error: true, text: error.message });
    //     } else if (!user && !error) {
    //         setHelperText({
    //             error: false,
    //             text: "An email has been sent to you for verification!",
    //         });
    //     }
    // };

    const handleOAuthLogin = async (provider) => {
        // You need to enable the third party auth you want in Authentication > Settings
        // Read more on: https://supabase.com/docs/guides/auth#third-party-logins
        let { error } = await supabase.auth.signIn({ provider });
        if (error) console.log("Error: ", error.message);
    };

    const forgotPassword = async (e) => {
        // Read more on https://supabase.com/docs/reference/javascript/reset-password-email#notes
        e.preventDefault();
        const email = prompt("Please enter your email:");

        if (email === null || email === "") {
            setHelperText({ error: true, text: "You must enter your email." });
        } else {
            let { error } = await supabase.auth.api.resetPasswordForEmail(
                email
            );
            if (error) {
                console.error("Error: ", error.message);
            } else {
                setHelperText({
                    error: false,
                    text: "Password recovery email has been sent.",
                });
            }
        }
    };

    return (
        <Center mt={24}>
            <Box width="40%">
                <VStack direction='column'>
                    <Image src={logo} alt="logo" width={90} marginBottom="1rem" />
                    <Text
                        fontWeight={'bold'}
                        fontSize={'20px'}
                        color={'gray'}
                    >{mode} to your BldN account</Text>
                    <Input
                        focusBorderColor='brand.700'
                        border={"1px"}
                        bg={"transparent"}
                        py={6}
                        variant='outline' 
                        placeholder='Enter Email'
                        type={"email"}
                        name={"email"}
                        ref={emailRef}
                        _hover={{ border:'' }}
                        required
                    />
                    
                    <InputGroup size='md'>
                        <Input
                            focusBorderColor='brand.700'
                            border={"1px"}
                            bg={"transparent"}
                            py={6}
                            pr='4.5rem'
                            variant='outline' 
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            name={"password"}
                            ref={passwordRef}
                            _hover={{ border:'' }}
                            required
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' mt={3} bg={"#e3ccbf"} color={"brand.600"} onClick={handleClick}
                                _hover={{ bg:'' }}
                            >
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                    <Flex w={'100%'}>
                        <Link
                            onClick={forgotPassword}
                            color={'gray'}
                        >
                            Forgot Password?
                        </Link>

                        <Spacer />

                        <Link
                            onClick={switchMode}
                            color={'gray'}
                            fontWeight={'bold'}
                        >
                            {mode}?
                        </Link>

                    </Flex>
                    {!!helperText.text && (
                        <Alert 
                            status={`${helperText.error ? "error" : "success"}`}
                        >
                            <AlertIcon />
                            {/* <AlertTitle>UNSUCCESSFUL</AlertTitle> */}
                            <AlertDescription>{helperText.text}</AlertDescription>
                        </Alert>
                    )}
                    {mode=='Sign In' && 
                        <Button
                            type="submit"
                            onClick={() =>
                                handleLogin("LOGIN")
                            }
                            width={'100%'}
                            bg={"#905f43"}
                            color={"white"}
                            _hover={{ bg:'' }}
                        >
                            SIGN IN
                        </Button>
                    }

                    {mode=='Sign Up' && 
                        <Button
                            type="submit"
                            onClick={() =>
                                handleLogin("REGISTER").catch(console.error)
                            }
                            width={'100%'}
                            bg={"#905f43"}
                            color={"white"}
                            _hover={{ bg:'' }}
                        >
                            SIGN UP
                        </Button>
                    }

                    <small style={{ marginTop: '10px', color:'gray' }}>Or continue with</small>
                    <Divider borderColor="black" borderWidth="0.6px" mb={4} />

                    <Button
                        w={'100%'}
                        onClick={() => handleOAuthLogin("google")}
                        type="button"
                        bg={'#e3ccbf'}
                        color={'brand.600'}
                        _hover={{ bg:'transparent', border:'1px', borderColor:"#905f43" }}
                    >
                        Google
                    </Button>
                        <Button
                            w={'100%'}
                            onClick={() => handleOAuthLogin("github")}
                            type="button"
                            bg={'#e3ccbf'}
                            color={'brand.600'}
                            _hover={{ bg:'transparent', border:'1px', borderColor:"#905f43" }}
                        >
                            Magic Link
                        </Button>
                </VStack>
            </Box>
        </Center>
    );
};

export default Auth;