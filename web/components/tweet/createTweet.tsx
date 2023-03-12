import { useApolloClient } from "@apollo/client";
import { CloseIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Box,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ResizeTextarea from "react-textarea-autosize";
import { GetLoggedInUserDocument, GetFeedDocument, useCreateTweetMutation } from "../../generated/graphql";
import { ImageIcon } from "../common/Icons";


const CreateTweet = () => {
    const [image, setImage] = useState<File | string | null>();
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>();

    const [tweetContent, setTweetContent] = useState<string>('');

    const [createTweetMutation, {loading}] = useCreateTweetMutation();

    const client = useApolloClient();

    const getLoggedInUserData = client.readQuery({query: GetLoggedInUserDocument});

    const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        
        const uploadedImage = event.target.files[0];
        if(!uploadedImage) return;
        
        setImage(uploadedImage);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        reader.onerror = ( ) => {
            console.log('something went wrong');
        }
        reader.readAsDataURL(uploadedImage);
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const resetFields = () => {
        removeImage();
        setTweetContent('');
    }

    const createTweet = async () => {
        const {data} = await createTweetMutation({variables: {
           file: image,
            content: tweetContent!
        }, refetchQueries: [
            GetFeedDocument,
        ]});

        if(data){
            resetFields();
        }
    }

    return (
        <Box w={"100%"} borderBottom={"1px"} borderColor={"gray.800"}>
            <Flex alignContent={"center"} alignItems={"flex-start"} h={"100%"} p={5}>
                <Avatar
                    size={"md"}
                    src={process.env.IMAGE_URL + getLoggedInUserData?.getLoggedInUser?.avatar?.filename}
                    name={getLoggedInUserData?.getLoggedInUser.username}
                />
                <Box w={"100%"} marginLeft={4}>
                    <Textarea
                        paddingX={0}
                        overflow={"hidden"}
                        w={"100%"}
                        outline={"none"}
                        border={"none"}
                        minRows={1}
                        resize={"none"}
                        placeholder="Whats happening ?"
                        as={ResizeTextarea}
                        value={tweetContent}
                        onChange={(event) => {setTweetContent(event.target.value)}}
                        _focus={{ outline: "none" }}
                    />

                    {imagePreview && (
                        <Box marginBottom={"10px"} width={"100%"} position={"relative"}>
                            <Button onClick={removeImage} position={"absolute"} margin={"5px"} padding={"5px"} opacity={'0.5'} bg={'gray.900'} color={'white'} _hover={{opacity:'1'}}>
                                <CloseIcon/>
                            </Button>
                            <Image
                                borderRadius={"10px"}
                                objectFit="cover"
                                minW={"520px"}
                                minH={"330px"}
                                maxH={"600px"}
                                src={imagePreview as string}
                                alt=""
                            />
                        </Box>
                    )}

                    <Divider />
                    <Flex marginTop={"10px"} alignItems={"center"}>
                        <FormControl display={"flex"} alignItems={"center"}>
                            <FormLabel cursor={"pointer"} margin={0}>
                                <Box w={"25px"} h={"25px"}>
                                    <ImageIcon boxSize={6} fill={"white"} hover={"blue.500"} />
                                </Box>
                            </FormLabel>
                            <Input type="file" accept="image/*" hidden={true} onChange={handleImageInputChange} onClick={(event : any ) => {event.target.value = ''}} />
                        </FormControl>
                        <Button isLoading={loading} disabled={!(image || tweetContent)} variant='common-button' onClick={createTweet}>
                            Tweet
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default CreateTweet;
