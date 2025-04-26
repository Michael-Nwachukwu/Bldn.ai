import { useRef, useState } from "react";
import { supabase } from "../services/supabase";
import { Box, Center, Flex, VStack, Image, Input, InputGroup, InputRightElement, Button, Divider, Link, Spacer, AlertIcon, Alert, AlertDescription, Text, useColorModeValue, useColorMode } from "@chakra-ui/react";
import { Moonlight, Sunshine } from "./Icons";

const Auth = () => {
    const [helperText, setHelperText] = useState({ error: null, text: null });
    const emailRef = useRef();
    const passwordRef = useRef();
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('Sign In');
    const handleClick = () => setShow(!show);
    const [signInOption, setSignInOptions] = useState('password');

    const { colorMode, toggleColorMode } = useColorMode();

    const logoUrl = useColorModeValue("../outlook-green.png", "../outlook-light.png");
    const svgFill = useColorModeValue('#030202', '#e3ccbf')
    const signInButtonBg = useColorModeValue('#4FA531', 'green.700')



    const changeSignInOption = () => {
        signInOption == 'password' ? setSignInOptions('otp') : setSignInOptions('password');
    }

    const switchMode = () => {
        if (mode == "Sign In") { setMode('Sign Up') } else { setMode('Sign In') }
    }

    const handleLogin = async (type) => {
        console.log('check');
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            const { user, error } =

                type === "LOGIN"
                    ? await supabase.auth.signInWithPassword({ email, password })
                    : type === "OTP"
                        ? await supabase.auth.signInWithOtp({ email })
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
        <Center mt={{ base: 16, lg: 24 }}>
            <Box width={{ base: '100%', lg: "40%" }}>
                {signInOption == 'password' &&
                    <VStack direction='column'>
                        <Image src={logoUrl} alt="logo" width={150} marginBottom="1rem" />
                        <Text
                            fontSize={'20px'}
                            color={colorMode === "light" ? "gray.700" : "gray.300"}
                        >{mode} to your Outlook account.</Text>

                        <Input
                            focusBorderColor={colorMode === "light" ? "#4FA531" : "green.700"}
                            borderColor={colorMode === "light" ? "#4FA531" : "gray.400"}
                            bg={"transparent"}
                            py={6}
                            variant='outline'
                            placeholder='Enter Email'
                            type={"email"}
                            name={"email"}
                            ref={emailRef}
                            _hover={{ border: '' }}
                            required
                        />

                        <InputGroup size='md'>
                            <Input
                                focusBorderColor={colorMode === "light" ? "#4FA531" : "green.700"}
                                borderColor={colorMode === "light" ? "#4FA531" : "gray.400"}
                                bg={"transparent"}
                                py={6}
                                pr='4.5rem'
                                variant='outline'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                name={"password"}
                                ref={passwordRef}
                                _hover={{ border: '' }}
                                required
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' mt={3} bg={colorMode === "light" ? "#4FA531" : "green.700"} color={"white"} onClick={handleClick}
                                    _hover={{ bg: '' }}
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
                                {mode == 'Sign In' ? 'Sign Up' : 'Sign In'}?
                            </Link>

                        </Flex>
                        {!!helperText.text && (
                            <Alert
                                status={`${helperText.error ? "error" : "success"}`}
                            >
                                <AlertIcon />
                                <AlertDescription>{helperText.text}</AlertDescription>
                            </Alert>
                        )}
                        {mode == 'Sign In' &&
                            <Button
                                type="submit"
                                onClick={() =>
                                    handleLogin("LOGIN")
                                }
                                width={'100%'}
                                bg={signInButtonBg}
                                color={"white"}
                                border={'1px'}
                                borderColor={colorMode === "light" ? "#4FA531" : "green.900"}
                                _hover={{ bg: '' }}
                            >
                                SIGN IN
                            </Button>
                        }

                        {mode == 'Sign Up' &&
                            <Button
                                type="submit"
                                onClick={() =>
                                    handleLogin("REGISTER").catch(console.error)
                                }
                                width={'100%'}
                                bg={signInButtonBg}
                                color={"white"}
                                _hover={{ bg: '' }}
                            >
                                SIGN UP
                            </Button>
                        }

                        <small style={{ marginTop: '10px', color: 'gray' }}>Or continue with</small>
                        <Divider borderColor="black" borderWidth="0.6px" mb={4} />

                        <Button
                            w={'100%'}
                            h={'40px'}
                            onClick={() => changeSignInOption()}
                            type="button"
                            bg={'transparent'}
                            border={'1px'}
                            borderColor={colorMode === "light" ? 'gray.300' : "green.700" } 
                            size={'sm'}
                            _hover={{ bg: 'transparent', border: '1px', borderColor: "#4FA531" }}
                        >
                            <Flex align="center" gap={2} justify={"center"}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Google
                            </Flex>
                        </Button>
                        <Button
                            w={'100%'}
                            h={'40px'}
                            onClick={() => changeSignInOption()}
                            type="button"
                            bg={'transparent'}
                            border={'1px'}
                            borderColor={colorMode === "light" ? 'gray.300' : "green.700" } 
                            size={'sm'}
                            _hover={{ bg: 'transparent', border: '1px', borderColor: "#4FA531" }}
                        >
                            Magic Link
                        </Button>
                    </VStack>
                }

                {signInOption == 'otp' &&
                    <VStack direction='column'>
                        <Image src={logoUrl} alt="logo" width={90} marginBottom="1rem" />
                        <Text
                            fontWeight={'bold'}
                            fontSize={'20px'}
                            color={'gray'}
                        >Sign in to your BldN account.</Text>

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
                            _hover={{ border: '' }}
                            required
                        />

                        {!!helperText.text && (
                            <Alert
                                status={`${helperText.error ? "error" : "success"}`}
                            >
                                <AlertIcon />
                                <AlertDescription>{helperText.text}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            onClick={() =>
                                handleLogin("OTP")
                            }
                            width={'100%'}
                            bg={"#905f43"}
                            color={"white"}
                            _hover={{ bg: '' }}
                        >
                            SIGN IN
                        </Button>

                        <small style={{ marginTop: '10px', color: 'gray' }}>Or continue with</small>
                        <Divider borderColor="black" borderWidth="0.6px" mb={4} />

                        <Button
                            w={'100%'}
                            onClick={() => handleOAuthLogin("google")}
                            type="button"
                            bg={'#e3ccbf'}
                            color={'brand.600'}
                            _hover={{ bg: 'transparent', border: '1px', borderColor: "#905f43" }}
                        >
                            Google
                        </Button>
                        <Button
                            w={'100%'}
                            onClick={() => changeSignInOption()}
                            type="button"
                            bg={'#e3ccbf'}
                            color={'brand.600'}
                            _hover={{ bg: 'transparent', border: '1px', borderColor: "#905f43" }}
                        >
                            Password
                        </Button>
                        <Button
                            w={'100%'}
                            h={'40px'}
                            onClick={() => changeSignInOption()}
                            type="button"
                            bg={'#e3ccbf'}
                            border={'1px'}
                            borderColor={'gray.200'}
                            color={'#4FA531'}
                            _hover={{ bg: 'transparent', border: '1px', borderColor: "#905f43" }}
                        >
                            <Flex align="center" gap={2} justify={"center"}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Google
                            </Flex>
                        </Button>
                    </VStack>
                }
                <Center mt={10}>
                    <Button onClick={toggleColorMode} bg={'#4FA53133'} _hover={{ bg: '#4FA53133' }}>
                        {colorMode == 'light' ? <Moonlight fill={svgFill} /> : <Sunshine fill={svgFill} />}
                    </Button>
                </Center>
            </Box>
        </Center>
    );
};

export default Auth;