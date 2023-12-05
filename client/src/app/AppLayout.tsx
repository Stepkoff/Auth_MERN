import { Header } from '@/widgets/Header';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <main className='h-fullScreen border-4 border-green-400'>
      <Header/>
      <Outlet/>
    </main>
  )
}
