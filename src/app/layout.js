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

const assistant = Assistant({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Web Nest</title>
      </head>
      <body className={`${assistant.className} antialiased customScroll`} suppressHydrationWarning>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}>
          <Provider store={store}>
            <ReduxProviderWrap>{children}</ReduxProviderWrap>
            <ToastContainer />
            <Tooltip className="!text-[12px]" id="my-tooltip" />
            <NoInternetBar />
          </Provider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
