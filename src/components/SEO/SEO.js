// components/SEO/SEO.js
'use client'; // CSR support for private pages
import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import defaultIcon from '../../Assets/Images/404.png';

const defaultSEO = {
  siteName: 'Designsli',
  defaultDescription: 'Designsli lets you create your online store in minutes with a drag-and-drop editor and secure checkout.',
  defaultOGImage: defaultIcon,
};

export default function SEO({ title, description, ogImage, url }) {
  const finalTitle = title ? `${title} | ${defaultSEO.siteName}` : defaultSEO.siteName;
  const finalDescription = description || defaultSEO.defaultDescription;
  const finalImage = ogImage || defaultSEO.defaultOGImage;

  // For client-side pages (login/dashboard)
  useEffect(() => {
    if (title) document.title = finalTitle;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = finalDescription;

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = finalTitle;
    document.head.appendChild(ogTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    ogDesc.content = finalDescription;
    document.head.appendChild(ogDesc);

    const ogUrl = document.querySelector('meta[property="og:url"]') || document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.content = url || window.location.href;
    document.head.appendChild(ogUrl);

    const ogImageTag = document.querySelector('meta[property="og:image"]') || document.createElement('meta');
    ogImageTag.setAttribute('property', 'og:image');
    ogImageTag.content = finalImage;
    document.head.appendChild(ogImageTag);
  }, [title, description, url, ogImage]);

  // NextSeo for SSR/SSG pages
  return (
    <NextSeo
      title={finalTitle}
      description={finalDescription}
      canonical={url}
      openGraph={{
        url: url || 'https://designsli.com',
        title: finalTitle,
        description: finalDescription,
        images: [
          {
            url: finalImage,
            width: 1200,
            height: 630,
            alt: finalTitle,
          },
        ],
        site_name: defaultSEO.siteName,
      }}
      twitter={{
        handle: '@designsli',
        site: '@designsli',
        cardType: 'summary_large_image',
      }}
    />
  );
}
