import { StoreProviderWrap } from '@/components/Layout/ProviderWrap';
import { placeholderImageUrl } from '@/Structure/DefaultStructures';
import axios from 'axios';
import BASE_URL from 'config';
import { Assistant } from 'next/font/google';

const assistant = Assistant({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export async function generateMetadata({ params }) {
  try {
    const { data } = await axios.get(`${BASE_URL}/${params.site_id}/getStore`);
    const store = data?.data;
    console.log('store==>', store);
    if (!store) {
      return {
        title: 'Store Not Found - Designsli',
        description: 'The store you are trying to access does not exist.',
      };
    }
    const finalUrl = store?.customDomain && store?.isDomainVerified ? `https://${store?.customDomain}` : `https://${store?.subDomain}.designsli.com`;

    return {
      title: decodeURIComponent(store?.storeName || 'Designsli'),
      description: store?.description || `Welcome to ${store?.storeName}`,
      alternates: {
        canonical: finalUrl,
      },
      openGraph: {
        title: decodeURIComponent(store?.storeName || 'Designsli'),
        description: store?.description || `Welcome to ${store?.storeName}`,
        url: finalUrl,
        images: [
          {
            url: store?.logo || placeholderImageUrl,
            width: 1200,
            height: 630,
            alt: store?.storeName,
          },
        ],
      },
    };
  } catch (error) {
    console.error('Metadata fetch failed:', error?.response?.data || error.message);
    return {
      title: 'My Store',
      description: 'Welcome to My Store',
    };
  }
}

export default function SiteLayout({ params, children }) {
  return (
    <StoreProviderWrap params={params} fontClass={assistant.className}>
      {children}
    </StoreProviderWrap>
  );
}
