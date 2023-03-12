import { useApolloClient } from "@apollo/client";
import { Avatar, Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GetFeedDocument, GetSuggestedUsersDocument, useFollowUserMutation, User } from "../../generated/graphql";
import UserHeader from "../common/userHeader";

type Following = {
    isFollowing: boolean
}

const FollowCard = () => {

    const client = useApolloClient();
    const data = client.readQuery({query: GetSuggestedUsersDocument});
    const [users, setUsers] = useState<User & any>(data?.getSuggestedUsers);
    const [followUserMutation] = useFollowUserMutation();

    useEffect(() => {
        const tempUsers = data?.getSuggestedUsers.map((ele: User & Following) => {
            return {
                ...ele,
                isFollowing: false
            }
        });

        setUsers(tempUsers);
    }, [data]);

    if(!data) return null;

    const handleFollow = async (userId : number) => {
        const {data} = await followUserMutation({variables: {followerId: userId}, refetchQueries: [GetFeedDocument]});
        if(data?.followUser){
            let tempUsers = users.map((user: User & Following) => {
                if(user.id == userId){
                    user.isFollowing = true;
                }
                return user;
            });
            setUsers(tempUsers);
        }
    }

    return (
        (data.getSuggestedUsers && 
            <React.Fragment>
                <Box bg={"gray.900"} margin={4} padding={5} borderRadius={10}>
                    <Heading mb={3} as="h3" size="md">Who to Follow</Heading>
                    <Box>
                        {users?.length ? users.map((user: User & Following) => {
                            return (
                                <Flex cursor={'pointer'} alignItems={'center'} justifyContent={'space-between'} key={user.id}>
                                    <Flex alignItems={'center'} marginY={4}>
                                        <Avatar  src={process.env.IMAGE_URL! + user.avatar?.filename} name={user.username} />
                                        <Box>
                                            <Stack spacing={0.5} ml="3">
                                                <UserHeader {...user} />
                                                <Text color="gray.500" fontSize={'0.9rem'}>
                                                    {"@" + user.username}
                                                </Text>
                                            </Stack>
                                        </Box>
                                    </Flex>
                                    <Button disabled={user.isFollowing} onClick={() => handleFollow(user.id)}>{user.isFollowing ? 'Following' : 'Follow'}</Button>
                                </Flex>
                            )
                        }) : <Box pt={4}>
                                <Text color={'gray.500'}>No new users to suggest</Text>
                            </Box>}
                    </Box>
                </Box>
            </React.Fragment>)
    );
};

export default FollowCard;
