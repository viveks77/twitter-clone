import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from 'next/link';
import { useRouter } from "next/router";
import { InputField } from "../components/common/inputField";
import { IsAuthenticatedDocument, IsAuthenticatedQuery, useIsAuthenticatedQuery, useLoginMutation } from "../generated/graphql";
import { withApolloClient } from "../utils/createApolloClient";
import { toErrorMap } from "../utils/errorMap";

type Props = {};

const Login = (props: Props) => {

    const [loginMutation] = useLoginMutation();

    const {data} = useIsAuthenticatedQuery();
    const router = useRouter();

    if(data?.isAuthenticated){
     if(typeof window === 'undefined') return null;
     router.push('/');
    }

    return (
        <Flex
            minW={"100vw"}
            minH={"100vh"}
            bg={"#242d34"}
            alignItems={"center"}
            justifyContent={"center"}>
            <Box
                bg={"black"}
                w={"full"}
                maxW={"550px"}
                minH={"550px"}
                h={"full"}
                borderRadius={"16px"}
                p={6}>
                <Stack direction={"column"} align={"center"}>
                    <Flex
                        alignItems={"flex-start"}
                        flexDirection={"column"}
                        justify={"space-between"}
                        minW={"90%"}
                        maxW={"70%"}
                        p={3}>
                        <Box marginBottom={10}>
                            <Heading as="h5" size="lg">
                                Sign in to Twitter
                            </Heading>
                        </Box>
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            onSubmit={ async (values, { setErrors }) => {
                                const {data} = await loginMutation({variables: values, 
                                    update: (cache, {data}) => {
                                        cache.writeQuery<IsAuthenticatedQuery>({
                                            query: IsAuthenticatedDocument,
                                            data: {
                                                __typename: "Query",
                                                isAuthenticated: data?.login.user ? true : false
                                            }
                                        })
                                    }});
                                
                                if(data?.login.errors){
                                    setErrors(toErrorMap(data.login.errors));
                                }else{
                                    if(data?.login.user){
                                        localStorage.setItem("user", JSON.stringify(data?.login.user));
                                        router.push('/');
                                    }
                                }
                            }}>
                            {({ isSubmitting }) => (
                                <Form style={{ width: "100%" }}>
                                    <Box marginBottom={5}>
                                        <InputField
                                            type="email"
                                            placeholder="Email"
                                            label="Email"
                                            name="email"
                                            autoComplete="off"
                                            isRequired={true}
                                        />
                                    </Box>
                                    <Box marginBottom={5}>
                                        <InputField
                                            type="password"
                                            placeholder="Password"
                                            label="Password"
                                            name="password"
                                            isRequired={true}
                                        />
                                    </Box>
                                    <Button  minW={"full"} type="submit" isLoading={isSubmitting}>
                                        Login
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                        <Box marginTop={"10px"}>
                            <Text variant="small-txt">
                                Dont have an account? <Link href='/register'> Sign up</Link>
                            </Text>
                        </Box>
                    </Flex>
                </Stack>
            </Box>
        </Flex>
    );
};

export default withApolloClient({ssr: false})(Login);
