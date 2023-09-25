import * as React from 'react';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import {Container, Grid} from "@mui/material";
import s from './Layout.module.scss';
import {Metadata} from "next";
import './globals.scss';

export const metadata: Metadata = {
    title: 'Movie List',
    description: 'Movie List',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
            <Container className={s.container}>
                {children}
            </Container>
        </ThemeRegistry>
      </body>
    </html>
  );
}
