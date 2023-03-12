import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, Stack, Heading, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import Header from "../components/common/header";
import TweetsWrapper from "../components/common/tweetsWrapper";
import Navbar from "../components/navbar/navbar";
import ProfileHeader from "../components/profile/profileHeader";
import Sidebar from "../components/sidebar/sidebar";
import TweetsFlow from "../components/tweet/tweetsFlow";
import { Tweet, useGetLoggedInUserQuery, useGetTweetsQuery } from "../generated/graphql";
import { withApolloClient } from "../utils/createApolloClient";
import { useIsAuth } from "../utils/isAuth";

type Props = {};

const Profile = (props: Props) => {
    useIsAuth();
    const {data} = useGetLoggedInUserQuery({fetchPolicy: 'cache-and-network'});
    const {data: tweets} = useGetTweetsQuery();
    const router = useRouter();

    const goBack = () => {
        router.back();
    }
   
    return (
        <Flex>
            <Navbar />
            <TweetsWrapper>
                <Header heading={data?.getLoggedInUser.username} />
                <ProfileHeader user={data?.getLoggedInUser} />
                {/* <TweetsFlow tweetsArr={tweets as Tweet[]}/> */}
            </TweetsWrapper>
            <Sidebar />
        </Flex>
    );
};

export default withApolloClient({ssr: true})(Profile);
