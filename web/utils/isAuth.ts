import React , {useEffect} from 'react';
import { useRouter } from "next/router";
import { useIsAuthenticatedQuery } from "../generated/graphql";

export const useIsAuth = () => {
    const {data, loading} = useIsAuthenticatedQuery();
    const router = useRouter();
    
    useEffect(() => {
        if(!loading && !data?.isAuthenticated){
            router.push('/login');
        }
    }, [loading, data, router])
}