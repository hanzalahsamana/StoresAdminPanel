'use client';

import Button from '@/components/Actions/Button';
// import SEO from '@/components/SEO/SEO';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  return (
    <>
      {/* <SEO
        title="Designsli: The All-in-One Platform to Create Your Online Store"
        description="Start your ecommerce journey with Designsli. Easily build and manage your branded online store, showcase products, and grow your business."
        url="https://designsli.com/"
        ogImage="/favicon.io"
      /> */}
      <div className="flex justify-between p-5 bg-gray-100 border-b">
        <h1 className="text-[30px] font-semibold">Our Logo</h1>
        <div className="flex gap-2">
          <Button size="small" label="Login" variant="black" action={() => router.push('/authentication/login')} />
          <Button size="small" label="Admin Panel" action={() => router.push('/admin/stores')} />
        </div>
      </div>
      <div className="flex justify-center items-center p-5 mt-[150px]">
        <h1>This will be our home page website</h1>
      </div>
    </>
  );
};
export default Home;
