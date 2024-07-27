// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import ToastManager from '../components/ToastManager';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastManager>
      <Component {...pageProps} />
    </ToastManager>
  );
}

export default MyApp;
