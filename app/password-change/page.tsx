'use client'
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const changePasswordSchema = z.object({
    password: z.string().min(8, {
        message: "Password must be at least 8 characters",
      }).regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      }).regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      }).regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
})

export default function Page() {

    const changePasswordForm = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            password: "",
        },
    
    })        
    
    // const changePassword = async (values: z.infer<typeof changePasswordSchema>) => {


    //     const password = values.password;
    //     const { error } = await supabase.auth.updateUser({ password: password })

    //     if (error) {
    //         return redirect("/password-change?message=Could not change password");
    //     }
    //     return redirect("/forum");
    // }


    return(
        <main className=" flex flex-col w-screen h-screen px-8 items-center justify-center gap-2 bg-black bg-grid-white/[0.2] ">
            <div className="absolute pointer-events-none inset-0 flex items-center bg-black  justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <Link
                href="/forum"
                className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-white bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
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
                </svg>{" "}
                Back
            </Link>
            <div className="animate-in items-center flex flex-col md:w-6/12 justify-center gap-2 text-white ">
                <Form {...changePasswordForm}>
                    <form action="/auth/pwd-change" method="post"  className="animate-in flex-1 flex flex-col w-full h-fit justify-center gap-2 text-white backdrop-blur-[0.7px] p-4 rounded-lg border border-gray-500">
                        <FormField
                        control={changePasswordForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl> 
                                <Input type="password" className="text-black" placeholder="......." {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your new password. Don't forget it!
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button variant='destructive' type="submit">Change Password</Button>
                    </form>
                </Form>
            </div>
        </main>
    )
}