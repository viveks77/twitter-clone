import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
    components: {
        Button: {
            baseStyle: {
                bg: 'white',
                color: 'black',
                borderRadius: '50px'
            },
            variants: {
              'common-button': {
                bg: 'blue.500',
                color: 'white',
                borderRadius: '50px',
                padding: '20px',
                _hover: {
                  bg: 'blue.600'
                }
              },
              'transparent': {
                bg: 'transparent',
                margin: '0 0px'
              }
            }
        },
        Text: { 
            variants: {
                "small-txt": {
                    color: 'gray.500'
                }
            }
        }
    },
    styles: {
      global: {
        // styles for the `body`
        body: {
          bg: 'black',
          color: 'white',
          fontFamily: "'Poppins', sans-seri"
        },
        // styles for the `a`
        a: {
          color: 'blue.500',
          _hover: {
            textDecoration: 'underline',
          },
        }
      },
    },
  })
  

export default theme;