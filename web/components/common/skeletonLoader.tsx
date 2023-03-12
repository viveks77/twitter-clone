import { Box, Flex, SkeletonCircle, Skeleton } from "@chakra-ui/react";
import React from "react";

const SkeletonLoader = () => {
    return (
        <Box w={"100%"} m={4}>
            <Flex p={3}>
                <SkeletonCircle size={"14"} />
                <Box w={"80%"} p={2}>
                    <Skeleton height={"15px"} w={"120px"} />
                    <Skeleton mt={2} height={"15px"} w={"80%"} />
                    <Skeleton mt={2} w={"100%%"} height={"250px"} />
                </Box>
            </Flex>
            <Flex p={3}>
                <SkeletonCircle size={"14"} />
                <Box w={"80%"} p={2}>
                    <Skeleton height={"15px"} w={"120px"} />
                    <Skeleton mt={2} height={"15px"} w={"80%"} />
                </Box>
            </Flex>
        </Box>
    );
};

export default SkeletonLoader;
