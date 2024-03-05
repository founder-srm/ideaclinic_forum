import Link from "next/link";
import { SubmitButton } from "../login/submit-button";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Page({
    searchParams,
  }: {
    searchParams: { message: string };
  }) {

    const changePassword = async (formData: FormData) => {
        

        const password = formData.get("password") as string;
        const { error } = await supabase.auth.updateUser({ password: password })

        if (error) {
            return redirect("/password-change?message=Could not change password");
        }
        return redirect("/forum");
    }


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
                <form className="animate-in flex-1 flex flex-col w-full h-fit justify-center gap-2 text-white backdrop-blur-[0.7px] p-4 rounded-lg border border-gray-500">
                    <label className="text-md" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                    />
                    <SubmitButton
                        formAction={changePassword}
                        className="bg-green-700 hover:bg-green-900 rounded-md px-4 py-2 text-foreground mb-2 transition-all duration-150 ease-in-out"
                        pendingText="Changing..."
                    >
                        Change password
                    </SubmitButton>
                    
                    {searchParams?.message && (
                        <p className="mt-4 p-4 bg-foreground/10 text-white text-center">
                        {searchParams.message}
                        </p>
                    )}
                </form>
            </div>
            </main>
    )
}