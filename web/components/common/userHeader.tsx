import { Avatar, Box, Button, Flex, Popover, PopoverContent, PopoverTrigger, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Avatar as ImageAvatarType, GetFeedDocument, useFollowUserMutation } from "../../generated/graphql";

type Props = {
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    bio?: string | null;
    avatar?: ImageAvatarType | null;
    _count?: any;
    isFollowing?: boolean | null;
    isMe?: boolean | null;
};

const UserHeader = ({ firstName, lastName, username, bio, avatar, _count, isFollowing, isMe, id}: Props) => {
    console.log(firstName, isMe);
    let followButton;
    const [followUserMutation] = useFollowUserMutation();
    const handleFollow = async ()  => {
        const {data} = await followUserMutation({variables: {followerId: id!}, refetchQueries: [GetFeedDocument]});
        if(data?.followUser){
            isFollowing = true;
        }
    }

    if(isMe){
        followButton = null;
    }else if(isFollowing){
        followButton = (<Button disabled>
                       Following
                    </Button>)
    }else {
        followButton = (<Button onClick={handleFollow}>
            Follow
         </Button>)
    }

    

    return (
        <Flex>
            <Popover trigger="hover" openDelay={420}>
                <PopoverTrigger>
                    <Text _hover={{textDecoration: 'underline'}} textTransform={"capitalize"} fontWeight={"bold"} mr="1">
                        {firstName + " " + lastName}
                    </Text>
                </PopoverTrigger>
                <PopoverContent bg={"black"} borderColor={"gray.900"}>
                    <Box padding={4}>
                        <Stack spacing={4}>
                            <Flex alignItems={'center'} justifyContent={'space-between'}>
                                <Avatar size={'lg'} src={process.env.IMAGE_URL! + avatar?.filename } name={username}/>
                                {followButton}
                            </Flex>
                            <Box>
                                <Text textTransform={"capitalize"} fontWeight={"bold"} mr="1">
                                    {firstName + " " + lastName}
                                </Text>
                                <Text fontWeight={300} color="gray.500">
                                    {"@" + username}
                                </Text>
                                <Text mt={2} fontSize={'0.9rem'}>
                                    {bio}
                                </Text>
                                <Flex mt={2} fontSize={'0.9rem'}>
                                    <Text mr={3}>{_count?.followings} <Text ml={1} color={'gray.500'} as={'span'}>Followings</Text></Text>
                                    <Text>{_count?.followers}<Text ml={2} color={'gray.500'} as={'span'}>Followers</Text></Text>
                                </Flex>
                            </Box>
                        </Stack>
                    </Box>
                </PopoverContent>
            </Popover>
        </Flex>
    );
};

export default UserHeader;
function followUserMutation(arg0: { variables: { followerId: number | undefined; }; refetchQueries: any[]; }): { data: any; } | PromiseLike<{ data: any; }> {
    throw new Error("Function not implemented.");
}

