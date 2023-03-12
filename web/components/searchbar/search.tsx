import { Box, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const Search = () => {
    const [searchValue, setSearchValue] = useState<string>("");

    const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);
    };

    return (
        <Box p={3}>
            <Input
                borderRadius={"50"}
                borderColor={"gray.800"}
                bg={"gray.800"}
                placeholder="Search Twitter"
                value={searchValue}
                onChange={searchInputHandler}
            />
        </Box>
    );
};

export default Search;
