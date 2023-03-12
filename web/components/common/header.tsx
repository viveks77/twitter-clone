import { Text, Box } from '@chakra-ui/react'
import React from 'react'

type Props = {
    heading: string | undefined;
}

const Header = ({heading}: Props) => {
  return (
    <Box zIndex={2} position={'sticky'} top={'0'} backdropFilter={'blur(3px)'} w={'100%'} borderBottom={'1px'} borderColor={'gray.800'}>
        <Text  p={3} zIndex={1} as="h4" fontSize={'1.8rem'}>{heading}</Text>
    </Box>
  )
}

export default Header;