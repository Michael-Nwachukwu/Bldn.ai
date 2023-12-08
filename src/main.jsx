import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'
import "@fontsource/open-sans"
import '@fontsource/syncopate';
import '@fontsource-variable/space-grotesk';
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
