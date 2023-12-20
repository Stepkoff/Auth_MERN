
import { cn } from '@/shared/lib/utils'
import { MaxWidthWrapper } from '@/shared/ui/maxWidthWrapper'
import { Logo } from '@/shared/ui/logo'
import { NavLink, Link } from 'react-router-dom'
import { useAppSelector } from '@/shared/hooks'

const isActiveLink = ({ isActive }: { isActive: boolean }): string => {
  return cn('font-semibold text-secondary flex items-center gap-2', isActive ? 'underline underline-offset-[6px]' : '')
}

export const Header = () => {
  const currentUser = useAppSelector(state => state.user.currentUser);

  return (
    <header className='bg-primary flex h-16 items-center'>
      <MaxWidthWrapper className='flex justify-between items-center'>
        <Link to='/'>
          <Logo className='text-secondary' />
        </Link>

        <nav className='flex gap-4 items-center'>
          {
            currentUser ?
              <>
                <NavLink end className={isActiveLink} to={'/'}>Home</NavLink>
                <NavLink className={isActiveLink} to={'about'}>About us</NavLink>
                <NavLink className={isActiveLink} to={'profile'}>
                  <span>Profile</span>
                  <img
                    className='block rounded-full w-9 h-9 object-cover'
                    src={currentUser.profilePicture}
                    alt="user image"
                  />
                </NavLink>
              </>
              :
              <>
                <NavLink end className={isActiveLink} to={'/'}>Home</NavLink>
                <NavLink className={isActiveLink} to={'about'}>About</NavLink>
                <NavLink className={isActiveLink} to={'sign-in'}>Sign In</NavLink>
                <NavLink className={isActiveLink} to={'sign-up'}>Sign up</NavLink>
              </>
          }
        </nav>
      </MaxWidthWrapper>
    </header>
  )
} 
