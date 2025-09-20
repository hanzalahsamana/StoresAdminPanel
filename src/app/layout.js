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

const assistant = Assistant({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }) {
  const {
    title = 'Designsli: The All-in-One Platform to Create Your Online Store',
    description = 'Start your ecommerce journey with Designsli. Easily build and manage your branded online store, showcase products, and grow your business.',
    url = 'https://designsli.com',
    ogImage = '/favicon.ico',
  } = {};
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
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
