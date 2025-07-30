import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'
import '@fontsource/syncopate';
import theme from './theme'

import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New version available. Refresh?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App is ready to work offline.");
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
