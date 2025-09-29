import RegisterClient from '@/components/Auth/RegisterClient';

export async function generateMetadata() {
  return {
    title: 'Register - Designsli',
    description: 'Create your Designsli account to start building and managing your online store, customize designs, and launch your business effortlessly.',
    alternates: {
      canonical: 'https://designsli.com/authentication/register',
    },
    openGraph: {
      title: 'Register - Designsli',
      description: 'Join Designsli today and create your account to manage stores, customize products, and grow your business online.',
      url: 'https://designsli.com/authentication/register',
      images: [
        {
          url: 'https://designsli.com/favicon.ico',
          width: 1200,
          height: 630,
          alt: 'Register to Designsli',
        },
      ],
    },
  };
}

export default function RegisterPage() {
  return <RegisterClient />;
}
