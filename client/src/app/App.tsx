import { useLayoutEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, useLocation } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { SignInPage } from '@/pages/SignInPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { setWindowInnerHeightIntoCssVariable } from '@/shared/lib/utils';
import { useAppSelector } from '@/shared/hooks';

type PrivateRouteProps = {
  children: JSX.Element,
}
export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const currentUser = useAppSelector(state => state.user.currentUser);
  const location = useLocation();
  if (currentUser) return children
  const url = new URLSearchParams(location.search);
  // const redirectPath = location.pathname.startsWith('/') ? location.pathname.substring(1) : location.pathname;
  // url.set('redirect', redirectPath);
  return <Navigate to={{pathname: '/sign-in', search: url.toString()}} />
  // return <Navigate
  //   to={{ pathname: '/sign-in', search: url.toString() }}
  //   replace
  // />
};

type PublicRouteProps = {
  children: JSX.Element
}
export const PublicRoute = ({ children }: PublicRouteProps) => {
  const currentUser = useAppSelector(state => state.user.currentUser);
  const location = useLocation();
  if (!currentUser) return children
  const url = new URLSearchParams(location.search);
  return <Navigate to={{pathname: '/', search: url.toString()}} />
  // return <Navigate
  //   to={{pathname: url.get('redirect') ? `/${url.get('redirect')}` : '/', search: url.toString()}}
  //   replace
  // />
};


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<AppLayout />}>
    <Route index element={<HomePage />} />
    <Route path='about' element={<AboutPage />} />
    <Route path='sign-in' element={<PublicRoute><SignInPage /></PublicRoute>} />
    <Route path='sign-up' element={<PublicRoute><SignUpPage /></PublicRoute>} />
    <Route path='profile' element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
    <Route path='*' element={<NotFoundPage />} />
  </Route>
))

export const App = () => {

  useLayoutEffect(() => {
    window.addEventListener('resize', setWindowInnerHeightIntoCssVariable);
    setWindowInnerHeightIntoCssVariable();
    return () => {
      window.removeEventListener('resize', setWindowInnerHeightIntoCssVariable);
    }
  }, []);

  return (
    <RouterProvider router={router} />
  )
}








