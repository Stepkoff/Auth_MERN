import { useAppSelector } from '@/shared/hooks'
import mergeRefs from '@/shared/lib/utils';
import { profileValidation } from '@/shared/lib/validations';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { MaxWidthWrapper } from '@/shared/ui/maxWidthWrapper'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/shared/ui/tooltip';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

export const ProfilePage = () => {
  const { currentUser, isLoading } = useAppSelector(state => state.user);
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof profileValidation>>({
    resolver: zodResolver(profileValidation),
    defaultValues: {
      file: undefined,
      username: currentUser?.username,
      email: currentUser?.email,
      password: '',
      confirmPassword: '',
    },
  });

  const handleFileUpload = (file: File) => {


  }

  const handleUpdate = async (data: z.infer<typeof profileValidation>) => {
    console.log('submit', data)

    if(data.file) {
      handleFileUpload(data.file);
    }


  }

  const handlePictureClick = () => {
    fileRef.current?.click()
  }

  return (
    <MaxWidthWrapper className='flex flex-col items-center'>
      <h3 className='text-3xl font-semibold my-5'>Profile</h3>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <img
              onClick={handlePictureClick}
              className='w-28 h-28 object-cover rounded-full cursor-pointer'
              src={form.getValues().file ? URL.createObjectURL(form.getValues().file as File) : currentUser?.profilePicture}
              alt="User image"
            />
          </TooltipTrigger>
          <TooltipContent side='right'>
            <p>Click to select new image</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Form {...form}>
        <div className="w-full sm:w-2/3 md:w-1/2 mb-10">
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex flex-col gap-3 w-full"
          >

            <FormField
              control={form.control}
              name="file"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { onChange, value, ref, ...rest } }) => (
                <FormItem>
                  <FormLabel>Profile picture</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      ref={mergeRefs(fileRef, ref)}
                      {...rest}
                      onChange={(event) => {
                        onChange(event.target.files?.[0]);
                      }}

                    />
                  </FormControl>
                  <FormMessage className='text-rose-400' />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
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
              Update
            </Button>
            <div className='flex justify-between'>
              <Button variant={'link'} className={'p-0 text-rose-500'} type='button'>Delete Account</Button>
              <Button variant={'link'} className={'p-0 text-rose-500'} type='button'>Sign out</Button>
            </div>
          </form>
        </div>
      </Form>

    </MaxWidthWrapper>
  )
}
