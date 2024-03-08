import AuthButton from "@/components/AuthButton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    
    const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }
    
    return (
        <main className="min-w-screen w-full">
            <nav className="w-full flex justify-end px-6 bg-[#020617] text-white border-b border-b-foreground h-16">
                <AuthButton />
            </nav>
            {children}
        </main>
    )
  }