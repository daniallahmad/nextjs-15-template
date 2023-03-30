import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Head } from '@/components';
import MainFooter from '@/components/Footer';
import { Content, Header, Wrapper } from '@/layouts/MainLayout/styles';

interface IError {
  email?: string;
  password?: string;
  common?: string;
}

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState<IError>({
    email: '',
    password: '',
    common: '',
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email) return setError({ email: 'Email is required' });
    if (!password) return setError({ password: 'Password is required' });

    if (email && password) {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log(res);

      if (res.status === 200) return router.push('/dashboard');
    }

    return setError({ common: 'Email or password is incorrect' });
  };

  return (
    <Wrapper>
      <Head title="Login" description="Login page" />
      <Header>
        <Link href="/login">
          <span>Login</span>
        </Link>
      </Header>
      <Content>
        <div className="flex flex-col items-center justify-center h-full">
          <form className="flex flex-col w-96" onSubmit={handleLogin}>
            {error?.common && (
              <div className="text-red-500 text-sm mt-2">{error?.common}</div>
            )}
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="border border-gray-300 rounded-md p-2 mt-1"
            />
            {error?.email && (
              <div className="text-red-500 text-sm mt-2">{error?.email}</div>
            )}
            <label htmlFor="password" className="text-sm font-semibold mt-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border border-gray-300 rounded-md p-2 mt-1"
            />
            {error?.password && (
              <div className="text-red-500 text-sm mt-2">{error?.password}</div>
            )}
            <button
              type="submit"
              className="bg-gray-900 text-white rounded-md p-2 mt-4"
            >
              Login
            </button>
          </form>

          <div className="mt-4">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-500">
              Register
            </Link>
          </div>
        </div>
      </Content>
      <MainFooter />
    </Wrapper>
  );
};

export default Login;
