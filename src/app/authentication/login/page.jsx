import LoginClient from '@/components/Auth/login/LoginClient';

export async function generateMetadata() {
  return {
    title: 'Login - Designsli',
    description: 'Securely log in to Designsli to access your design dashboard, manage stores, and create stunning designs effortlessly.',
    openGraph: {
      title: 'Login - Designsli',
      description: 'Securely log in to Designsli to access your design dashboard, manage stores, and create stunning designs effortlessly.',
      url: 'https://designsli.com/authentication/login',
      images: ['https://designsli.com/favicon.ico'],
    },
  };
}

export default function LoginPage() {
  return <LoginClient />;
}
