import { setCurrentUser } from '@/entities/user';
import { useAppDispatch } from '@/shared/hooks';
import { Button } from '@/shared/ui/button'
import { useToast } from '@/shared/ui/use-toast';
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { firebaseApp } from '@/app/firebase';

interface OAuthButtonProps {
  isLoading: boolean
}

export const OAuthButton = ({ isLoading }: OAuthButtonProps) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(firebaseApp);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(setCurrentUser(data));
      navigate('/');
    } catch (err) {
      console.log('could not login with google', err);
      toast({
        title: 'Something went wrong',
        description: (err as Error).message,
        variant: 'destructive',
      })
    }
  };


  return (
    <Button onClick={handleSubmit} disabled={isLoading} variant={'destructive'} type="button">
      {isLoading && <Loader2 className='animate-spin duration-500 mr-2' />}
      Google
    </Button>
  )
}
