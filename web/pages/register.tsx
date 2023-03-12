import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { InputField } from "../components/common/inputField";
import { IsAuthenticatedDocument, IsAuthenticatedQuery, useIsAuthenticatedQuery, useRegisterMutation } from "../generated/graphql";
import { withApolloClient } from "../utils/createApolloClient";
import { toErrorMap } from "../utils/errorMap";

type Props = {};

const Register = (props: Props) => {

    const [registerMutation] = useRegisterMutation();
    const {data: authData} = useIsAuthenticatedQuery();
    const router = useRouter();

    if(authData?.isAuthenticated){
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
                maxW={"650px"}
                minH={"600px"}
                h={"full"}
                borderRadius={"16px"}
                p={6}>
                <Stack direction={"column"} align={"center"}>
                    <Flex
                        alignItems={"flex-start"}
                        flexDirection={"column"}
                        justify={"space-between"}
                        minW={"100%"}
                        maxW={"70%"}
                        p={3}>
                        <Box marginBottom={10}>
                            <Heading as="h5" size="lg">
                                Create an Account
                            </Heading>
                        </Box>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                                username: "",
                                firstName: "",
                                lastName: "",
                            }}
                            onSubmit={async (values, { setErrors }) => {
                                const {data} = await registerMutation({variables: values, 
                                update:(cache, {data: resData}) => {
                                    cache.writeQuery<IsAuthenticatedQuery>({
                                        query: IsAuthenticatedDocument,
                                        data: {
                                            __typename: "Query",
                                            isAuthenticated: resData?.register.user ? true : false
                                        }
                                    })
                                } });
                                if(data?.register.errors){
                                    setErrors(toErrorMap(data?.register.errors))
                                }else{
                                    if(data?.register.user){
                                        localStorage.setItem("user", JSON.stringify(data?.register.user));
                                        router.push('/');
                                    }
                                }
                            }}>
                            {({ isSubmitting }) => (
                                <Form style={{ width: "100%" }}>
                                    <Box marginBottom={7}>
                                        <Stack align={"center"} direction={"row"} spacing={3}>
                                            <InputField
                                                type="email"
                                                placeholder="Email"
                                                label="Email"
                                                name="email"
                                                autoComplete="off"
                                                isRequired={true}
                                            />
                                            <InputField
                                                type="text"
                                                placeholder="Username"
                                                label="Username"
                                                name="username"
                                                autoComplete="off"
                                                isRequired={true}
                                            />
                                        </Stack>
                                    </Box>
                                    <Box marginBottom={7}>
                                        <Stack align={"center"} direction={"row"} spacing={3}>
                                            <InputField
                                                type="text"
                                                placeholder="First Name"
                                                label="First Name"
                                                name="firstName"
                                                autoComplete="off"
                                                isRequired={true}
                                            />
                                            <InputField
                                                type="text"
                                                placeholder="Last Name"
                                                label="Last Name"
                                                name="lastName"
                                                autoComplete="off"
                                                isRequired={true}
                                            />
                                        </Stack>
                                    </Box>
                                    <Box marginBottom={7}>
                                        <InputField
                                            type="password"
                                            placeholder="Password"
                                            label="Password"
                                            name="password"
                                            isRequired={true}
                                        />
                                    </Box>
                                    <Button minW={"full"} type="submit" isLoading={isSubmitting}>
                                        Create Account
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                        <Box marginTop={"10px"}>
                            <Text color={"gray.500"}>
                                Already have an account? <Link href="/login"> Sign In</Link>
                            </Text>
                        </Box>
                    </Flex>
                </Stack>
            </Box>
        </Flex>
    );
};

export default withApolloClient({ssr: false})(Register);
