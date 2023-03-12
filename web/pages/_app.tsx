import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import '../styles/styles.css';
import NextNProgress from "nextjs-progressbar";


function MyApp({ Component, pageProps }: AppProps) {
  
  
    return (
        <ChakraProvider theme={theme}>
            <NextNProgress />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
