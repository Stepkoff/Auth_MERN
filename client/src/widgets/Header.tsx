
import { cn } from '@/shared/lib/utils'
import { MaxWidthWrapper } from '@/shared/ui/maxWidthWrapper'
import { Logo } from '@/shared/ui/logo'
import { NavLink, Link } from 'react-router-dom'

const isActiveLink = ({ isActive }: { isActive: boolean }): string => {
  return cn('font-semibold text-secondary', isActive ? 'underline underline-offset-[6px]' : '')
}

export const Header = () => {
  return (
    <header className='bg-primary flex h-16 items-center'>
      <MaxWidthWrapper className='flex justify-between items-center'>
        <Link to='/'>
          <Logo className='text-secondary' />
        </Link>

        <nav className='flex gap-4'>
          <NavLink end className={isActiveLink} to={'/'}>Home</NavLink>
          <NavLink className={isActiveLink} to={'about'}>about</NavLink>
          <NavLink className={isActiveLink} to={'sign-in'}>Sign In</NavLink>
          <NavLink className={isActiveLink} to={'sign-up'}>Sign up</NavLink>
          <NavLink className={isActiveLink} to={'profile'}>Profile</NavLink>
        </nav>
      </MaxWidthWrapper>
    </header>
  )
} 
