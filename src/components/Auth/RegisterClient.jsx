'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RegisterUser } from '@/APIs/Auth/registerUser';
import UnProtectedRoute from '@/AuthenticRouting/UnProtectedRoutes';
import CustomLink from '@/components/Actions/CustomLink';
import IconButton from '@/components/Actions/IconButton';
import FormInput from '@/components/Forms/FormInput';
import GoogleSignInUp from '@/components/Forms/GoogleSignInUp';
import Form from '@/components/Forms/Form';
import LineDevider from '@/components/UI/LineDevider';
import { userRegisterValidate } from '@/Utils/FormsValidator';
import { setCurrentUser } from '@/Redux/Authentication/AuthSlice';
import { useDispatch } from 'react-redux';
import { authWithGoogle } from '@/APIs/Auth/authWithGoogle';

const RegisterClient = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const ManualSignup = async (e) => {
    e.preventDefault();
    try {
      const isValid = userRegisterValidate(formData, setErrors);
      if (!isValid) return;

      setLoading(true);

      await RegisterUser(formData);
      localStorage.setItem('emailForVerify', formData.email);
      router.push('/authentication/verifyotp');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const signupWithGoogle = async (googleToken) => {
    try {
      const { token, user } = await authWithGoogle({ googleToken });
      localStorage.setItem('userToken', JSON.stringify(token));
      dispatch(setCurrentUser({ token, ...user }));
    } catch (error) {
      console.error('Google signup failed:', error);
      toast.error(error?.response?.data?.message || 'Google signup failed');
    }
  };

  return (
    <UnProtectedRoute>
      <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-lbgC px-3">
        <Form
          handleSubmit={ManualSignup}
          loading={loading}
          label={'Create Your Store'}
          buttonLabel={'Register'}
          extra={
            <>
              <LineDevider label={'OR'} />
              <GoogleSignInUp onGoogleSuccess={signupWithGoogle} label="Sign up with Google" />
              <CustomLink text="Already Have an Account" link="/authentication/login" linkText="Login" />
            </>
          }
          className="max-w-md"
        >
          <FormInput type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" error={errors.email} size="large" />

          <FormInput
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            error={errors.password}
            size="large"
            suffix={<IconButton action={() => setShowPassword(!showPassword)} icon={showPassword ? <FaEye /> : <FaEyeSlash />} className={'text-[#7f7b7b] h-full w-full'} />}
          />
        </Form>
      </div>
    </UnProtectedRoute>
  );
};

export default RegisterClient;
