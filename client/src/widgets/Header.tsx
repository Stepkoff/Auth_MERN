
import { cn } from '@/shared/lib/utils'
import { Logo } from '@/shared/ui/Logo'
import { MaxWidthWrapper } from '@/shared/ui/MaxWidthWrapper'
import { NavLink, Link } from 'react-router-dom'

const isActiveLink = ({ isActive }: { isActive: boolean }): string => {
  return cn('font-bold', isActive ? 'underline underline-offset-4' : '')
}

export const Header = () => {
  return (
    <header className='bg-slate-200 flex h-16 items-center'>
      <MaxWidthWrapper className='flex justify-between items-center'>
        <Link to='/'>
          <Logo className='text-foreground' />
        </Link>
        
        <nav className='flex gap-4'>
          <NavLink end className={isActiveLink} to={'/'}>Home</NavLink>
          <NavLink className={isActiveLink} to={'profile'}>Profile</NavLink>
          <NavLink className={isActiveLink} to={'about'}>about</NavLink>
        </nav>
      </MaxWidthWrapper>
    </header>
  )
} 
