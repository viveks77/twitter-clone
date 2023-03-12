import { useApolloClient } from "@apollo/client";
import {
    Avatar,
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { Comment, GetLoggedInUserDocument, useCreateCommentMutation, User } from "../../generated/graphql";
import { formatDate } from "../../utils/helper";
import ResizeTextarea from "react-textarea-autosize";
import { CloseIcon } from "@chakra-ui/icons";
import { ImageIcon } from "./Icons";
import { useState } from "react";

type Props = {
    id: number;
    content?: string;
    image?: any;
    createdAt: string;
    user?: User | null;
    modalOpen: boolean;
    modalClose: () => void;
    onCommentAdded: (tweetId: number, comment: Comment) => void;
};

const CommentModal = ({ modalOpen, modalClose, content, user, createdAt, image, id, onCommentAdded }: Props) => {
    const client = useApolloClient();
    const getLoggedInUserData = client.readQuery({ query: GetLoggedInUserDocument });
    const [createCommentMutation, {loading}] = useCreateCommentMutation();

    const [imageData, setImageData] = useState<File | string | null>();
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>();

    const [comment, setComment] = useState<string>('');

    const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        
        const uploadedImage = event.target.files[0];
        if(!uploadedImage) return;
        
        setImageData(uploadedImage);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        reader.onerror = ( ) => {
            console.log('something went wrong');
        }
        reader.readAsDataURL(uploadedImage);
    };

    const createComment = async () => {
        const {data} = await createCommentMutation({variables: {
            file: imageData,
            content: comment,
            tweetId: id
        }});
        
        if(data){
            onCommentAdded(data.createComment.tweetId!, data.createComment!);
        }
    }

    const removeImage = () => {
        setImageData(null);
        setImagePreview(null);
    };

    const resetFields = () => {
        removeImage();
        setComment('');
    }

    return (
        <Modal size={"xl"} closeOnOverlayClick={true} isOpen={modalOpen} onClose={modalClose}>
            <ModalOverlay />
            <ModalContent bg={"black"}>
                <ModalHeader>
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                    <Box p={3}>
                        <Flex>
                            <Stack alignItems={"center"}>
                                <Avatar
                                    src={process.env.IMAGE_URL! + user?.avatar?.filename}
                                    name={user?.username}
                                />
                                <Box w={"2px"} backgroundColor={"gray.600"} h={"100%"}></Box>
                            </Stack>
                            <Stack ml={4}>
                                <Flex alignItems={"center"}>
                                    <Text textTransform={"capitalize"} fontWeight={"bold"} mr="1">
                                        {user?.firstName + " " + user?.lastName}
                                    </Text>
                                    <Text fontWeight={300} ml={1} color="gray.500">
                                        {"@" + user?.username}
                                    </Text>
                                    <Text fontWeight={300} ml={1} color="gray.500">
                                        {". " + formatDate(createdAt)}
                                    </Text>
                                </Flex>
                                {content && <Text>{content}</Text>}
                                {image?.length && (
                                    <Image
                                        borderRadius={"10px"}
                                        objectFit="cover"
                                        minW={"320px"}
                                        minH={"230px"}
                                        maxH={"400px"}
                                        src={process.env.IMAGE_URL + image[0].filename}
                                        alt=""
                                    />
                                )}
                                <Text fontSize={"0.8rem"} color="gray.500">
                                    Replying to
                                    <Text as="span" pl={1} style={{ color: "white" }}>
                                        @{user?.username}
                                    </Text>
                                </Text>
                            </Stack>
                        </Flex>
                        <Flex mt={5}>
                            <Avatar
                                size={"md"}
                                src={
                                    process.env.IMAGE_URL +
                                    getLoggedInUserData?.getLoggedInUser?.avatar?.filename
                                }
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
                                    placeholder="Tweet your reply"
                                    as={ResizeTextarea}
                                    value={comment}
                                    onChange={(event) => {
                                        setComment(event.target.value);
                                    }}
                                    _focus={{ outline: "none" }}
                                />

                                {imagePreview && (
                                    <Box marginBottom={"10px"} width={"100%"} position={"relative"}>
                                        <Button
                                            onClick={removeImage}
                                            position={"absolute"}
                                            margin={"5px"}
                                            padding={"5px"}
                                            color={"white"}
                                            bg= "gray.900"
                                            opacity={"0.5"}
                                            _hover={{ opacity: "1" }}>
                                            <CloseIcon />
                                        </Button>
                                        <Image
                                            borderRadius={"10px"}
                                            objectFit="cover"
                                            src={imagePreview as string}
                                            minW={"320px"}
                                            minH={"230px"}
                                            maxH={"400px"}
                                            alt=""
                                        />
                                    </Box>
                                )}

                                <Divider />
                                <Flex marginTop={"10px"} alignItems={"center"}>
                                    <FormControl display={"flex"} alignItems={"center"}>
                                        <FormLabel cursor={"pointer"} margin={0}>
                                            <Box w={"25px"} h={"25px"}>
                                                <ImageIcon
                                                    boxSize={6}
                                                    fill={"white"}
                                                    hover={"blue.500"}
                                                />
                                            </Box>
                                        </FormLabel>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            hidden={true}
                                            onChange={handleImageInputChange}
                                            onClick={(event: any) => {
                                                event.target.value = "";
                                            }}
                                        />
                                    </FormControl>
                                    <Button
                                        disabled={!(image || comment)}
                                        variant="common-button"
                                        onClick={createComment}
                                        isLoading={loading}>
                                        Comment
                                    </Button>
                                </Flex>
                            </Box>
                        </Flex>
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CommentModal;
