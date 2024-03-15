'use client'
import { LayoutGridDemo } from "@/components/LayoutGridDemo";
import { useToast } from "@/components/ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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
  
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { toast } = useToast();

  const [userId, setuserId] = useState('');
  const [userData, setUserData] = useState<UserAcc | null>(null);

  useMemo(() => {
    const fetchUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (user) {
            console.log("User found");
            console.log(user);
            setuserId(user.id);
        } else {
            console.log("No user found");
            router.push("/login");
        }
    };
    const getUserData = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
      
      if (error) {
        console.log('error', error)
        toast({
          title: 'Error',
          description: error.message,
          duration: 5000,
          variant:'destructive'
        })
      }
      else {
        console.log('data', data || 'No data')
        setUserData(data[0]);
        toast({
          title: `Welcome`,
          variant:'success'
        })
      }
    }


    fetchUser();

    if(userId !== '') {
      getUserData();
    }

}, [userId]);
  

  return (
    <div>
      <section className="bg-[#090909]">
        <LayoutGridDemo />
      </section>
    </div>
  )
}