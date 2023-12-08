import { Toaster } from '@/shared/ui/toaster';
import { Header } from '@/widgets/Header';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <main className='h-fullScreen'>
      <Header/>
      <Outlet/>
      <Toaster/>
    </main>
  )
}
