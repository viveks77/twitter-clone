import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ExploreIcon, HomeIcon, Logo, SettingsIcon, ProfileIcon, FilledHomeIcon, FilledProfileIcon, FilledExploreIcon } from "../common/Icons";
import NavLinks from "./navlinks/navLinks";

const navLinkStyle = { color: "inherit", textDecoration: "none" };

const Navbar = () => {

    const router = useRouter();
    const isCurrentPath = (pathname: string) => (router.pathname == pathname)

    return (
        <Flex position={'relative'} justifyContent={"flex-end"} flex={{base: '1', xl: '2'}}>
            <Stack position={'fixed'} spacing={5} w={{ base: "100px", xl: '200px' }} p={5} alignItems={"start"}>
                <Flex
                    p={3}
                    alignItems={"center"}
                    justifyContent={"start"}
                    minW={"160px"}
                    cursor="default">
                    <Box w={"30px"} h={"30px"}>
                        <Logo fill="white" />
                    </Box>
                </Flex>
                <Link href="/" passHref>
                    <a style={navLinkStyle}>
                        <NavLinks text="Home">
                            {isCurrentPath('/') ? 
                                <FilledHomeIcon fill="white" />
                                :
                                <HomeIcon fill="white" />
                            }
                        </NavLinks>
                    </a>
                </Link>
                <Link href="/explore" passHref>
                   <a style={navLinkStyle}>
                        <NavLinks text="Explore">
                            {isCurrentPath('/explore') ?
                                <FilledExploreIcon fill="white" />
                                :
                                <ExploreIcon fill="white" />
                            }
                        </NavLinks>
                   </a>
                </Link>
                <Link href="/profile" passHref>
                    <a style={navLinkStyle}>
                        <NavLinks text="Profile">
                            {isCurrentPath('/profile') ? 
                                <FilledProfileIcon fill="white" />
                                :
                                <ProfileIcon fill="white" />
                            }
                        </NavLinks>
                    </a>
                </Link>
                <NavLinks text="Settings">
                    <SettingsIcon fill="white" />
                </NavLinks>
            </Stack>
        </Flex>
    );
};

export default Navbar;
