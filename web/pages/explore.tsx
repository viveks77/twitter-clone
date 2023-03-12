import { Flex } from "@chakra-ui/react";
import Header from "../components/common/header";
import TweetsWrapper from "../components/common/tweetsWrapper";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import TweetsFlow from "../components/tweet/tweetsFlow";
import {
    Tweet,
    useGetExploreQuery, useGetLoggedInUserQuery,
    useGetSuggestedUsersQuery
} from "../generated/graphql";
import { withApolloClient } from "../utils/createApolloClient";
import { useIsAuth } from "../utils/isAuth";

const Explore = () => {
    useIsAuth();
    const { data: tweets } = useGetExploreQuery({ fetchPolicy: "cache-and-network" });
    useGetLoggedInUserQuery();
    useGetSuggestedUsersQuery();

    return (
        <Flex>
            <Navbar />
            <TweetsWrapper>
                <Header heading="Explore" />
                <TweetsFlow tweetsArr={tweets?.getExplore as Tweet[]} />
            </TweetsWrapper>
            <Sidebar />
        </Flex>
    );
};

export default withApolloClient({ ssr: true })(Explore);
