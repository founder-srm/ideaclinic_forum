'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createClientComponentClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs'
// import { cookies } from "next/headers";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const accountSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  full_name: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  dept: z.string().min(2, {
    message: 'Department must be at least 2 characters.',
  }),
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  bio: z
    .string()
    .min(2, {
      message: 'Bio must be at least 2 characters.',
    })
    .max(1000, {
      message: 'Bio must be at most 1000 characters.',
    }),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
})

interface UserAcc {
  id: string;
  username: string;
  full_name: string;
  email: string;
  avatar_url: string;
  updated_at: string;
  dept: string;
  bio: string;
  title: string;
}

export default function Page() {
  // const cookieStore = cookies()
  const supabase = createClientComponentClient()
  const { toast } = useToast();
  const router = useRouter()
  const [userId, setUserId] = useState('')
  const [emailId, setEmailId] = useState('')
  const [username, setUsername] = useState('')
  const [ full_name, setFull_name] = useState('')
  const [ dept, setDept] = useState('')
  const [ title, setTitle] = useState('')
  const [ bio, setBio] = useState('')
  const [ avatar_url, setAvatar_url] = useState('')

  useMemo(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        console.log('User found')
        console.log(user)
        setUserId(user.id)
        setEmailId(user.email || '') // Provide a default value for setEmailId
      } else {
        console.log('No user found')
        return <div>No user found</div>
      }
    }
    const getUserData = async () => {
      const { data , error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)

      if (error) {
        console.log(error)
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your update.',
          action: (
            <ToastAction onClick={() => router.refresh()} altText="Try again">
              Try again
            </ToastAction>
          ),
        })
      }
      if (!data) {
        console.log(error)
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your update.',
          action: (
            <ToastAction onClick={() => router.refresh()} altText="Try again">
              Try again
            </ToastAction>
          ),
        })        
      }
      else {        
        console.log('data', data || 'No data')
        setUsername(data[0].username)
        setFull_name(data[0].full_name)
        setDept(data[0].dept)
        setTitle(data[0].title)
        setBio(data[0].bio)
        setAvatar_url(data[0].avatar_url)
        form.reset({
          username: data[0].username,
          full_name: data[0].full_name || '',
          dept: data[0].dept || '',
          title: data[0].title || '',
          bio: data[0].bio || '',
        });
      }
    }

    fetchUser()
    if (userId) {
      getUserData()
    }
  }, [userId])


  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
  })
  const onSubmit = async (values: z.infer<typeof accountSchema>) => {
    console.log(values)
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          username: values.username !== '' ? values.username : undefined,
          full_name: values.full_name !== '' ? values.full_name : undefined,
          dept: values.dept !== '' ? values.dept : undefined,
          title: values.title !== '' ? values.title : undefined,
          bio: values.bio !== '' ? values.bio : undefined,
          email: emailId,
        })
        .eq('id', userId)
        .select()

      if (error) {
        console.log(error)
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your update.',
          action: (
            <ToastAction onClick={() => router.refresh()} altText="Try again">
              Try again
            </ToastAction>
          ),
        })
      } else {
        console.log('Data updated successfully')
        toast({
          variant: 'success',
          title: 'Profile updated successfully',
          description: 'Your profile has been updated.',
        })

        router.push('/account')
      }

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="w-screen flex flex-col items-center justify-center h-full bg-black bg-dot-white/[0.2]">
      <div className="mt-14">
        <Link
          href="/account"
          className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-white bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm mt-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{' '}
          Back
        </Link>
        <div className="max-w-md w-full rounded-none md:rounded-2xl my-6 md:my-12 p-6 md:p-8 shadow-input text-white bg-black">
          <h2 className="font-bold text-xl text-neutral-200">
            Edit your account
          </h2>
          <p className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
            You can edit your account details here
          </p>

          <div className="flex flex-col space-y-2 md:space-y-0 md:space-x-2 my-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-10 flex flex-col"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-white">Username</Label>
                      <FormControl>
                        <Input placeholder="username" type="text" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-white">Your Full Name</Label>
                      <FormControl>
                        <Input placeholder="full name" type="text" {...field} />
                      </FormControl>
                      <FormDescription>This is your full name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dept"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-white">Department</Label>
                      <FormControl>
                        <Input placeholder="C.Tech" type="text" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the department you are a faculty / student of.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-white">Your Title</Label>
                      <FormControl>
                        <Input
                          placeholder="Associate Professor"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your current title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-white">Your Bio</Label>
                      <FormControl>
                        <Textarea
                          className="text-black"
                          placeholder="Hi! I am a..... "
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your bio, Say something interesting about
                        yourself.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  onClick={() => onSubmit(form.getValues())}
                >
                  Submit
                  <BottomGradient />
                </Button>
              </form>
            </Form>
          </div>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </div>
      </div>
    </main>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  )
}
