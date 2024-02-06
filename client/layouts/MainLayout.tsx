import Navbar from '@/components/Navbar'
import Player from '@/components/Player';
import { Container } from '@mui/material';
import Head from 'next/head';
import React, { ReactNode } from 'react'


interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string; 
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords }) => {
  return (
    <>
      <Head>
        <title>{title || 'Spotify'}</title>
        <meta name={description} content={'This is music platform. You can listen and reload tracks' + description} />
        <meta name='robots' content='index, follow'/>
        <meta name='keywords' content={keywords || 'music, tracks'}/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <Container style={{ margin: '90px auto' }}>
        {children}
      </Container>
      <Player/>
    </>
  )
}

export default MainLayout