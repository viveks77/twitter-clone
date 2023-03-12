import { Box, Flex, Stack } from '@chakra-ui/react'
import { useGetSuggestedUsersQuery } from '../../generated/graphql';
import FollowCard from '../followcard/followCard'
import Search from '../searchbar/search'



const Sidebar = () => {
  useGetSuggestedUsersQuery();
  return (
    <Flex flex={{sm: 0, md: 1, lg: 2}} position={'relative'}>
        <Stack w={{sm: '50%', md: '40%', xl: '30%'}} position={'fixed'} display={{base: 'none', lg: 'flex'}}>
          <Box w={'80%'} padding={2} flexGrow={1}>
              <Search />
              <FollowCard />
          </Box>
        </Stack>
    </Flex>
  )
}

export default Sidebar