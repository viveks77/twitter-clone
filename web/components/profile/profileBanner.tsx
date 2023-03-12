import { Box, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";



const ProfileBanner = () => {
    const [url, setUrl] = useState("");
    const [urls, setUrls] = useState([
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq5E5-Fxq1sqgdb4AFeXB3EAHcvnSeJ0LM6Q&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9YByEGbPgCRF0rtkzJ8XlFykxRhPaDfjDiA&usqp=CAU",
        "https://cdn.pixabay.com/photo/2021/09/12/07/58/banner-6617553__340.jpg",
    ])
    
    useEffect(() => {
        setUrl(urls[Math.floor(Math.random() * urls.length)]);
    }, [urls]);

    return (
        <Box>
            <Image width={'100%'} height={'220px'} src={url} alt="" objectFit={'cover'}/>
        </Box>
    );
};

export default ProfileBanner;
