import LoginClient from '@/components/Auth/login/LoginClient';

export async function generateMetadata() {
  return {
    title: 'Login - Designsli',
    description: 'Securely log in to Designsli to access your design dashboard, manage stores, and create stunning designs effortlessly.',
    alternates: {
      canonical: 'https://designsli.com/authentication/login',
    },
    openGraph: {
      title: 'Login - Designsli',
      description: 'Securely log in to Designsli to access your design dashboard, manage stores, and create stunning designs effortlessly.',
      url: 'https://designsli.com/authentication/login',
      images: [
        {
          url: 'https://designsli.com/favicon.ico',
          width: 1200,
          height: 630,
          alt: 'Login to Designsli',
        },
      ],
    },
  };
}

export default function LoginPage() {
  return <LoginClient />;
}
