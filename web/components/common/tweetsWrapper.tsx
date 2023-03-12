import { Flex } from "@chakra-ui/react";
import React from "react";

const TweetsWrapper: React.FC = ({ children }) => {
    return (
        <Flex
            w={"600px"}
            alignItems={"flex-start"}
            h={"100%"}
            borderRight={"1px"}
            borderLeft={"1px"}
            borderBottom={"1px"}
            borderColor={"gray.800"}
            flex={"2"}
            direction={"column"}
            position={"relative"}>
                {children}
            </Flex>
    );
};

export default TweetsWrapper;
