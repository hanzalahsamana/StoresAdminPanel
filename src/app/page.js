import ClientLandingPage from '@/components/UI/LandingPage';

export async function generateMetadata() {
  const {
    title = 'Designsli: The All-in-One Platform to Create Your Online Store',
    description = 'Start your ecommerce journey with Designsli. Easily build and manage your branded online store, showcase products, and grow your business.',
    url = 'https://designsli.com',
    ogImage = 'https://designsli.com/favicon.ico',
  } = {};

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}
const Home = () => {
  return <ClientLandingPage />;
};
export default Home;
