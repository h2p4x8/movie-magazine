import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import Link from "@/components/Link";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        LinkComponent: Link,
      },
    },
  },
});

export default theme;
