import { Box, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
    Comment,
    Tweet,
    useLikeTweetMutation,
    useRemoveTweetLikeMutation,
} from "../../generated/graphql";
import CommentModal from "../common/commentModal";
import SkeletonLoader from "../common/skeletonLoader";
import TweetCard from "./tweetCard";

type Props = {
    tweetsArr?: Tweet[] | null;
};

const TweetsFlow = ({ tweetsArr }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [tweets, setTweets] = useState<null | undefined | Tweet[]>(null);
    const [tweet, setTweet] = useState<null | Tweet>(null);
    const [likeTweetMutation] = useLikeTweetMutation();
    const [removeTweetLikeMutation] = useRemoveTweetLikeMutation();

    useEffect(() => {
        if (tweetsArr) {
            setTweets(tweetsArr);
        }
    }, [tweetsArr]);

    if (!tweetsArr) {
        return (
            <Box w={"100%"} display={"flex"} alignItems={"center"} flexDirection={"column"}>
                <SkeletonLoader />
            </Box>
        );
    }

    const likeTweet = async (id: number) => {
        const { data } = await likeTweetMutation({
            variables: {
                tweetId: id,
            },
        });
        if (!data) return;

        let filteredTweets = tweets?.map((ele: Tweet) => {
            if (ele.id == id) {
                return {
                    ...ele,
                    isLiked: true,
                    _count: {
                        ...ele._count,
                        likes: ele._count.likes! + 1,
                    },
                };
            } else {
                return ele;
            }
        });
        setTweets(filteredTweets);
    };

    const dislikeTweet = async (id: number) => {
        const { data } = await removeTweetLikeMutation({
            variables: {
                tweetId: id,
            },
        });

        if (!data) return;
        let filteredTweets = tweets?.map((ele: Tweet) => {
            if (ele.id == id) {
                return {
                    ...ele,
                    isLiked: false,
                    _count: {
                        ...ele._count,
                        likes: ele._count.likes! - 1,
                    },
                };
            } else {
                return ele;
            }
        });
        setTweets(filteredTweets);
    };

    const handleComment = (tweetObj: Tweet) => {
        setTweet(tweetObj);
        onOpen();
    };

    const handleAddComment = (tweetId: number, comment: Comment) => {
        closeModal();
        let filteredTweets = tweets;
        filteredTweets = filteredTweets?.map((tweet: Tweet) => {
            if (tweet.id == tweetId) {
                let comments = Object.assign([], tweet.comments);
                comments.push(comment);
                return {...tweet, comments: comments}
            }
            return tweet;
        })

        setTweets(filteredTweets);
    };

    const closeModal = () => {
        setTweet(null);
        onClose();
    };

    return (
        <Box w={"100%"} display={"flex"} alignItems={"center"} flexDirection={"column"}>
            {tweets?.length ? (
                tweets.map((tweet: Tweet) => {
                    return (
                        <Box
                            cursor={"pointer"}
                            w={"100%"}
                            borderBottom={"1px"}
                            borderColor={"gray.800"}
                            key={tweet.id}>
                            <Stack >
                                <TweetCard
                                    {...tweet}
                                    hasComments={tweet.comments?.length ? true : false}
                                    handleLikeTweet={() => likeTweet(tweet.id)}
                                    handleDislikeTweet={() => dislikeTweet(tweet.id)}
                                    handlePostComment={() => handleComment(tweet)}
                                />
                                
                                {tweet.comments?.length && (
                                    <Stack>
                                        {tweet.comments.map((comment) => {
                                            return (
                                                <Stack key={comment.id}>
                                                    <TweetCard
                                                        {...comment}
                                                        isComment={true}
                                                        handleLikeTweet={() => likeTweet(tweet.id)}
                                                        handleDislikeTweet={() => dislikeTweet(tweet.id)}
                                                        handlePostComment={() => handleComment(tweet)}
                                                    />
                                                </Stack>
                                            );
                                        })}
                                    </Stack>
                                )}
                            </Stack>
                        </Box>
                    );
                })
            ) : (
                <Text p={4} align={"center"}>
                    No Tweets to show
                </Text>
            )}
            {tweet && (
                <CommentModal
                    {...tweet}
                    modalOpen={isOpen}
                    modalClose={closeModal}
                    onCommentAdded={handleAddComment}
                />
            )}
        </Box>
    );
};

export default TweetsFlow;
