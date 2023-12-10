import { MaxWidthWrapper } from '@/shared/ui/maxWidthWrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { signUpValidation } from '@/shared/lib/validations';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Button, buttonVariants } from '@/shared/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/shared/ui/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';


export const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignUp = async ({email, password, username}: z.infer<typeof signUpValidation>) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password, username})
      });
      const data = await response.json();
      console.log('data', data)

      toast({
        title: 'Authentication',
        description: data.message,
        variant: data.success ? 'default' : 'destructive'
      })
      form.reset();

    } catch (err) {
      console.log(err)
      toast({
        title: 'Something went wrong',
        description: (err as Error).message,
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false);

    }
  }

  return (
    <MaxWidthWrapper className='mt-16 flex justify-center'>
      <Form {...form}>
        <div className="w-full sm:w-2/3 md:w-1/2">
          <form
            onSubmit={form.handleSubmit(handleSignUp)}
            className="flex flex-col gap-5 w-full">

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Username</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage className='text-rose-400' />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage className='text-rose-400' />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} type="submit">
              {isLoading && <Loader2 className='animate-spin duration-500 mr-2' />}
              Sign up
            </Button>

            <Button disabled={isLoading} variant={'destructive'} type="button">
              {isLoading && <Loader2 className='animate-spin duration-500 mr-2' />}
              Google
            </Button>

            <p className="mt-2">
              Already have an account?
              <Link
                to="/sign-in"
                className={buttonVariants({ variant: 'link' })}>
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </MaxWidthWrapper>
  )
}
