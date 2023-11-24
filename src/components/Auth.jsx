import { useRef, useState } from "react";
import { supabase } from "../services/supabase";
import { Box, Center, Flex, VStack, Image, Input, InputGroup, InputRightElement, Button, Divider } from "@chakra-ui/react";
import logo from "../assets/bldn xb.png";

const Auth = () => {
    const [helperText, setHelperText] = useState({ error: null, text: null });
    const emailRef = useRef();
    const passwordRef = useRef();
    const [show, setShow] = useState(false);    
    const handleClick = () => setShow(!show);

    // const handleLogin = async () => {
    //     const email = emailRef.current?.value;
    //     const password = passwordRef.current?.value;
      
    //     try {
    //         // attempt this
    //         const { user, error } = await supabase.auth.signIn({ email, password });
            
    //         // if we have this error
    //         if (error && error.code === 'USER_NOT_FOUND') {
    //             // If user is not found, sign up
    //             await supabase.auth.signUp({ email, password });
    //             setHelperText({
    //                 error: false,
    //                 text: "An email has been sent to you for verification!",
    //             });
    //         } else if (error) {
    //             // Handle other errors
    //             setHelperText({ error: true, text: error.message });
    //         } else {
    //             // Successfully signed in
    //             setHelperText({
    //                 error: false,
    //                 text: "You are now logged in!",
    //             });
    //         }
    //     } catch (error) {
    //       console.error('Error:', error.message);
    //     }
    // };
      

    const handleLogin = async (type) => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

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
        <Center mt={24}>
            <Box width="40%">
                <VStack direction='column'>
                    <Image src={logo} alt="logo" width={90} marginBottom="1rem" />
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

                    <span
                        onClick={forgotPassword}
                        style={{ cursor: "pointer", width: "100%", color:'gray', }}
                    >
                        Forgot Password?
                    </span>
                    {!!helperText.text && (
                        <div
                            className={`border px-1 py-2 my-2 text-center text-sm ${
                                helperText.errorre
                                    ? "bg-red-100 border-red-300 text-red-400"
                                    : "bg-green-100 border-green-300 text-green-500"
                            }`}
                        >
                            {helperText.text}
                        </div>
                    )}
                    <Button
                        type="submit"
                        onClick={() =>
                            handleLogin().catch(console.error)
                        }
                        width={'100%'}
                        bg={"#905f43"}
                        color={"white"}
                        _hover={{ bg:'' }}

                    >
                        Continue
                    </Button>
                       
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