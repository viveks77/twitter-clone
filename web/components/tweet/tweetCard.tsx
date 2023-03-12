import { Avatar, Box, Flex, Stack, Text, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
    Tweet,
    useLikeTweetMutation,
    User,
    useRemoveTweetLikeMutation,
} from "../../generated/graphql";
import { formatDate } from "../../utils/helper";
import { CommentIcon, LikeIcon, LikeIconFilled, RetweetIcon } from "../common/Icons";
import IconWrapper from "../common/iconWrapper";
import UserHeader from "../common/userHeader";

type Props = {
    id: number;
    handlePostComment: any;
    content: string;
    user?: any | User;
    image?: any;
    _count: any;
    isLiked?: boolean | null;
    createdAt: string;
    hasComments?: boolean;
    isComment?: boolean;
    handleLikeTweet: () => void;
    handleDislikeTweet: () => void;
};

const TweetCard = ({
    id,
    content,
    user,
    image,
    _count,
    isLiked,
    createdAt,
    handlePostComment,
    handleLikeTweet,
    handleDislikeTweet,
    hasComments,
    isComment
}: Props) => {
    const handleLike = () => {
        if (!isLiked) {
            handleLikeTweet();
        } else if (_count.likes > 0) {
            handleDislikeTweet();
        }
    };

    return (
        <Flex mt={isComment ? '-5' : ''} p={4}>
            <Box alignItems={'center'} display={'flex'} flexDirection={'column'}>
                <Avatar
                    name={user?.username}
                    size={"md"}
                    src={process.env.IMAGE_URL! + user?.avatar?.filename}
                />
                {hasComments &&  <Box mt={3} w={"2px"} backgroundColor={"gray.600"} h={"100%"}></Box>}
            </Box>
            <Box w={"100%"} marginLeft={4}>
                <Stack>
                    <Flex alignItems={"center"}>
                        <UserHeader {...user} />
                        <Text fontWeight={300} ml={1} color="gray.500">
                            {"@" + user?.username}
                        </Text>
                        <Text fontWeight={300} ml={1} color="gray.500">
                            {". " + formatDate(createdAt)}
                        </Text>
                    </Flex>
                    <Text>{content} </Text>
                    {image?.length && (
                        <Image
                            borderRadius={"10px"}
                            objectFit="cover"
                            minW={"500px"}
                            minH={"310px"}
                            maxH={"600px"}
                            src={process.env.IMAGE_URL + image[0].filename}
                            alt=""
                        />
                    )}
                    <Flex
                        columnGap={"8px"}
                        pt={2}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        maxW={"400px"}>
                        <IconWrapper hover={{ color: "blue.500" }} click={handlePostComment}>
                            <CommentIcon boxSize={5} fill={"gray.500"} groupHover={"blue.500"} />
                            <Text
                                minW={"1.5rem"}
                                ml={3}
                                color={"gray.500"}
                                _groupHover={{ color: "blue.500" }}
                                fontSize={"0.9rem"}>
                                {_count?.comments}
                            </Text>
                        </IconWrapper>
                        <IconWrapper hover={{ color: "green.500" }}>
                            <RetweetIcon boxSize={5} fill={"gray.500"} groupHover={"green.500"} />
                            <Text
                                minW={"1.5rem"}
                                ml={3}
                                color={"gray.500"}
                                _groupHover={{ color: "green.500" }}
                                fontSize={"0.9rem"}>
                                0
                            </Text>
                        </IconWrapper>
                        <IconWrapper click={handleLike} hover={{ color: "pink.500" }}>
                            {isLiked ? (
                                <LikeIconFilled fill={"pink.500"} boxSize={5} />
                            ) : (
                                <LikeIcon boxSize={5} fill={"gray.500"} groupHover={"pink.500"} />
                            )}
                            <Text
                                minW={"1.5rem"}
                                ml={3}
                                color={isLiked ? "pink.500" : "gray.500"}
                                _groupHover={{ color: "pink.500" }}
                                fontSize={"0.9rem"}>
                                {_count.likes}
                            </Text>
                        </IconWrapper>
                    </Flex>
                </Stack>
            </Box>
        </Flex>
    );
};

export default TweetCard;
