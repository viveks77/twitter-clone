import { Flex, Heading, Stack } from "@chakra-ui/react";
import Header from "../components/common/header";
import TweetsWrapper from "../components/common/tweetsWrapper";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import CreateTweet from "../components/tweet/createTweet";
import TweetsFlow from "../components/tweet/tweetsFlow";
import { Tweet, useGetFeedQuery, useGetLoggedInUserQuery } from "../generated/graphql";
import { withApolloClient } from "../utils/createApolloClient";
import { useIsAuth } from "../utils/isAuth";


const Home = () => {
    useIsAuth();
    const { data: tweets } = useGetFeedQuery({fetchPolicy: 'cache-and-network'});
    useGetLoggedInUserQuery();
    
    return (
        <Flex position={'relative'}>
            <Navbar />
            <TweetsWrapper>
                    <Header heading="Home"/>
                    <CreateTweet />
                    <TweetsFlow tweetsArr={tweets?.getFeed as Tweet[]}/>
            </TweetsWrapper>
            <Sidebar />
        </Flex>
    );
};

export default withApolloClient({ ssr: true })(Home);
