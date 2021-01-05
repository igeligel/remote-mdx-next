import React from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider, theme, CSSReset } from '@chakra-ui/react';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
