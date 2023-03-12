import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import ProfileBanner from './profileBanner';
import ProfileInfo from "./profileInfo";

type User = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: {
        filename?: string | null;
    } | null | undefined
}

type Props = {
    user: User | undefined
};

const ProfileHeader = ({user}: Props) => {
    if(!user) return null;
    return (
        <Box>
            <Stack>
                <ProfileBanner />
                <ProfileInfo user={user} />
            </Stack>
        </Box>
    );
};

export default ProfileHeader;
