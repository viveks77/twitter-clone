import { Box } from "@chakra-ui/react";
import React from "react";

type Props = {
    hover: Object;
    click?: () => void
};

const IconWrapper: React.FC<Props> = ({hover, children, click}) => {
    return (
        <Box
            display={"flex"}
            justifyContent={"flex-start"}
            _hover={hover}
            role="group"
            transition={"all"}
            transitionDuration={"0.3s"}
            onClick={click}
            >
            {children}
        </Box>
    );
};

export default IconWrapper;
