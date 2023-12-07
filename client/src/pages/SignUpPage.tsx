import { MaxWidthWrapper } from '@/shared/ui/maxWidthWrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { signUpValidation } from '@/shared/lib/validations';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Link } from 'react-router-dom';


export const SignUpPage = () => {

  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleSignUp = () => {
    console.log('sign up attempt')
  }


  return (
    <MaxWidthWrapper className='mt-16 flex justify-center'>
      <Form {...form}>
        <div className="w-full sm:w-1/2">
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

            <Button type="submit">
              Sign up
            </Button>

            <Button variant={'destructive'} type="submit">
              Google
            </Button>

            <p className="mt-2">
              Already have an account?
              <Link
                to="/sign-in"
                className="ml-1">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </MaxWidthWrapper>
  )
}
