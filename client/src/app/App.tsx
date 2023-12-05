import { useLayoutEffect } from 'react';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { SignInPage } from '@/pages/SignInPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { setWindowInnerHeightIntoCssVariable } from '@/shared/lib/utils';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<AppLayout/>}>
    <Route index element={<HomePage/>} />
    <Route path='about' element={<AboutPage/>} />
    <Route path='sign-in' element={<SignInPage/>} />
    <Route path='sign-up' element={<SignUpPage/>} />
    <Route path='profile' element={<ProfilePage/>}/>
    <Route path='*' element={<NotFoundPage/>} />
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
    <RouterProvider router={router}/>
  )
}








