"use client";
import { addUser } from "@/APIs/postApis";
import UnProtectedRoute from "@/AuthenticRouting/UnProtectedRoutes";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    brandName: "",
    email: "",
    name: "",
    password: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await addUser(formData);
      setLoading(false);
      router.push("/authentication/login");
    } catch (e) {
      setLoading(false);
      alert(e);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="brandName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brandName"
                  id="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  required
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#21B5F7] focus:border-[#21B5F7] w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#21B5F7] focus:border-[#21B5F7] w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#21B5F7] focus:border-[#21B5F7] w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#21B5F7] focus:border-[#21B5F7] w-full"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#21B5F7] text-white py-2 px-4 rounded-md hover:bg-[#2d99cb] transition duration-300"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default UnProtectedRoute(Register);
