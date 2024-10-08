import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { SessionService } from '../services/session';

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const loading = false;

  useEffect(() => {
    const isAuthenticated = localStorage.isAuthenticated;

    if (isAuthenticated) {
      navigate('/dashboard');
    }

    emailRef?.current?.focus();
  });

  const handleSignin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
        emailRef.current?.value === undefined || 
        passwordRef.current?.value === undefined ||
        emailRef.current?.value === '' ||
        passwordRef.current?.value === ''
      ) {
      return setErrors(['Email and password are required']);
    }
    const payload = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    const response = await SessionService.signin(payload);
    console.log(response);
    navigate('/dashboard');
  };

  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {errors.length > 0 ?
          <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center p-4 mb-12 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out opacity-100 bg-red-100 text-red-700">
            {errors.map((error, index) => {
              return <p key={`alert-${index}`}>
                {error}
              </p>;
            })}
          </div>
        : <></>}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  ref={emailRef}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  ref={passwordRef}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                disabled={loading}
                type="submit"
                className={`
                  flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                  ${loading && 'opacity-50 cursor-wait'}
                `}
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
  