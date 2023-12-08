import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    colors: {
        brand: {
          50: "#ffe5c6",
          100: "#f8c6a9",
          200: "#dca587",
          300: "#be8563",
          400: "#a86b48",
          500: "#91532d",
          600: "#854927",
          700: "#753d1f",
          800: "#672f19",
          900: "#572110"
        },
    },
    fonts: {
        heading: `'syncopate', sans-serif`,
        body: `'space-grotesk', sans-serif`,
    },
    initialColorMode: 'system',
    useSystemColorMode: true,
  })

export default theme