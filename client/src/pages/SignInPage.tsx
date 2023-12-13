import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { signInValidation } from '@/shared/lib/validations';
import { Button, buttonVariants } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { MaxWidthWrapper } from '@/shared/ui/maxWidthWrapper';
import { useToast } from '@/shared/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { setCurrentUser, setIsLoading as setUserLoading } from '@/entities/user';
import z from 'zod';

export const SignInPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(state => state.user.isLoading);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async ({ email, password }: z.infer<typeof signInValidation>) => {
    dispatch(setUserLoading(true))
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      console.log('data', data)

      if (Object.keys(data).includes('success') && !data.success) {
        toast({
          title: 'Authentication',
          description: data.message,
          variant: 'destructive'
        })
      } else {
        dispatch(setCurrentUser(data));
        form.reset();
        navigate('/')
      }

    } catch (err) {
      console.log(err)
      toast({
        title: 'Something went wrong',
        description: (err as Error).message,
        variant: 'destructive',
      })
    } finally {
      dispatch(setUserLoading(false))
    }
  }


  return (
    <MaxWidthWrapper className='mt-16 flex justify-center'>
      <Form {...form}>
        <div className="w-full sm:w-2/3 md:w-1/2">
          <form
            onSubmit={form.handleSubmit(handleSignIn)}
            className="flex flex-col gap-5 w-full">

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage className='text-rose-400' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage className='text-rose-400' />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} type="submit">
              {isLoading && <Loader2 className='animate-spin duration-500 mr-2' />}
              Sign in
            </Button>

            <Button disabled={isLoading} variant={'destructive'} type="button">
              {isLoading && <Loader2 className='animate-spin duration-500 mr-2' />}
              Google
            </Button>

            <p className="mt-2">
              Don&apos;t have an account?
              <Link
                to="/sign-up"
                className={buttonVariants({ variant: 'link' })}>
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </MaxWidthWrapper>
  )
}
