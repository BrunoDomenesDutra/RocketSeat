import type { AppProps } from 'next/app'
import { Roboto } from '@next/font/google';
import { getCssText } from '../styles'
import { globalStyles } from '../styles/global';
import logoImg from '../../src/assets/img/logo-igniter.svg'
import Image from 'next/image';
import { Container, Header } from '../styles/pages/app';



globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
    <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      
      
      <Container>

        <Header>
          <Image src={logoImg} alt={''}></Image>
        </Header>


        <Component {...pageProps} />
      </Container>
    </>
  );

}