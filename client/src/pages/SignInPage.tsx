import { signInValidation } from '@/shared/lib/validations';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { MaxWidthWrapper } from '@/shared/ui/maxWidthWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import z from 'zod';


export const SignInPage = () => {

  const form = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = () => {
    console.log('sign in attempt')
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

            <Button type="submit">
              Sign in
            </Button>

            <Button variant={'destructive'} type="button">
              Google
            </Button>

            <p className="mt-2">
              Don&apos;t have an account?
              <Link
                to="/sign-up"
                className="ml-1">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </MaxWidthWrapper>
  )
}
