'use client';

import '../Styles/globals.css';
import 'quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from '@/Redux/Store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import { Assistant } from 'next/font/google';
import NoInternetBar from '@/components/404Pages/NoInternetBar';
import ReduxProviderWrap from '@/components/Layout/ProviderWrap';
import { IoMdClose } from 'react-icons/io';
import Head from 'next/head';

const assistant = Assistant({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Default SEO for entire site */}
        <title>Designsli</title>
        <meta name="description" content="Designsli lets you create your online store in minutes with a drag-and-drop editor and secure checkout." />
        <meta property="og:title" content="Designsli" />
        <meta property="og:description" content="Designsli lets you create your online store in minutes with a drag-and-drop editor and secure checkout." />
        <meta property="og:url" content="https://designsli.com" />
        <meta property="og:image" content="https://designsli.com/404.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Designsli" />
        <meta name="twitter:description" content="Designsli lets you create your online store in minutes with a drag-and-drop editor and secure checkout." />
        <meta name="twitter:image" content="https://designsli.com/Assets/Images/404.png" />
      </head>
      <body className={`${assistant.className} antialiased customScroll`} suppressHydrationWarning>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}>
          <Provider store={store}>
            <ReduxProviderWrap>{children}</ReduxProviderWrap>
            <ToastContainer
              position="top-right"
              autoClose={2200}
              className={'toastifyCustomClass'}
              closeButton={<IoMdClose className="text-[16px]" />}
              limit={5}
              theme="light"
              hideProgressBar={true}
              closeOnClick={true}
            />
            <Tooltip className="!text-[12px]" id="my-tooltip" />
            <NoInternetBar />
          </Provider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
