import { Html, Head, Main, NextScript } from 'next/document'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '/styles/theme.js';




export default function Document() {
  return (
    <Html lang="en">
      <Head>
      </Head>
      <body>
        <ThemeProvider theme={theme}>
          <Main />
        </ThemeProvider>
        <NextScript />
      </body>
    </Html>
  )
}
