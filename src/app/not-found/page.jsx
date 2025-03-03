import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
            <div className="max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-gray-900">Oops! Site Not Found</h1>
                <p className="text-gray-600 mt-4">
                    The website you're looking for doesn't exist. But you can create your own store in just a few clicks!
                </p>

                <div className="mt-6">
                    <img
                        src="https://illustrations.popsy.co/white/resistance-band.svg"
                        alt="Not Found Illustration"
                        className="w-48 mx-auto"
                    />
                </div>

                <Link href={'https://hannanfabrics.com/authentication/register'} className="mt-6 bg-secondaryC text-white px-5 py-3 rounded-md font-medium hover:opacity-85 transition-all">
                    Create Your Store
                </Link>
            </div>
        </div>
    );
}
