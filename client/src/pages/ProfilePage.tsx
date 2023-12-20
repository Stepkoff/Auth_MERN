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
import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import z from 'zod';
import { firebaseApp } from '@/app/firebase';
import { useToast } from '@/shared/ui/use-toast';

export const ProfilePage = () => {
  const { currentUser, isLoading } = useAppSelector(state => state.user);
  const fileRef = useRef<HTMLInputElement>(null);
  const [downloadPercent, setDownloadPercent] = useState(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const { toast } = useToast();

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

  const handleFileUpload = async (file: File) => {
    const storage = getStorage(firebaseApp);
    const fileName = file.name.split('.')[0] + (new Date().getTime());
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setDownloadPercent(Math.round(progress))
      },
      (err) => {
        console.log('Upload Error:', err);
        toast({
          title: 'Image Upload',
          description: (err as Error).message,
          variant: 'destructive',
        })
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadUrl) => {
            setDownloadURL(downloadUrl);
          })
        toast({
          title: 'Uploading',
          description: 'Image uploaded successfully',
          variant: 'default',
        })
      }
    );
  };

  const handleUpdate = async (data: z.infer<typeof profileValidation>) => {
    console.log('submit', data)

    if (data.file) {
      await handleFileUpload(data.file);



    }


  }

  const handlePictureClick = useCallback(() => {
    fileRef.current?.click()
  }, []);

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

      {downloadPercent > 0 && downloadPercent < 100
        ? <div className='mt-2 text-sm text-green-400'>File is uploading {downloadPercent}%</div>
        : null
      }

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
