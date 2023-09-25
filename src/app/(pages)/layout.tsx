import * as React from 'react';
import Fab from "@mui/material/Fab";
import NavigationIcon from '@mui/icons-material/Navigation';
import s from './layout.module.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <>
          {children}
          <Fab variant="extended"
               color='primary'
               size="medium"
               className={s.floatButton}
               style={{position: 'fixed'}}
               href={'/'}
          >
              <NavigationIcon sx={{ mr: 1 }} />
              To Home Page
          </Fab>
      </>
  );
}
