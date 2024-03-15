'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMemo, useState } from "react";

export default function AvatarComponent({userId}: {userId: string}) {
    const supabase = createClientComponentClient();
    const [ avatar_url, setAvatar_url ] = useState("https://github.com/shadcn.png");

    const fetchAvatar = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('avatar_url')
            .eq('id', userId)
        
        if (error) {
            console.log('error', error)
        }
        else {
            console.log('data', data || 'No data')
            setAvatar_url(data[0].avatar_url)
        }
    }

    useMemo(() => {
        fetchAvatar();
    }, [userId])

    return (
        <Avatar>
            <AvatarImage src={avatar_url} className="object-cover object-center zoom-in" />
            <AvatarFallback>IC</AvatarFallback>
        </Avatar>
    )
}