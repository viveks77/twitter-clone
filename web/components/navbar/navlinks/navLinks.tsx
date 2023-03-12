import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
    text: string;
}

const NavLinks: React.FC<Props> = ({ text, children }) => {
    return (
        <Flex
            padding={1}
            cursor="pointer"
            _hover={{ bg: "gray.900", borderRadius: "50" }}
            alignItems={"center"}
            justifyContent={"start"}
            transition={'all'} transitionDuration={'0.3s'}>
            <Flex alignItems={"center"} p={2} fontSize={"1.3rem"} fontWeight={"bold"}>
                <Box w={"30px"} h={"30px"} >
                    {children}
                </Box>
                <Text marginLeft={3} display={{base: 'none', xl: 'block'}}>{text}</Text>
            </Flex>
        </Flex>
    );
};

export default NavLinks;
