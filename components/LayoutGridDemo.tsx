"use client";
import { LayoutGrid } from "./ui/layout-grid";
import { useToast } from "@/components/ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";

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

export function LayoutGridDemo({ userId } : { userId: string }) {

    const supabase = createClientComponentClient();
    const router = useRouter();
    const { toast } = useToast();

    const [userData, setUserData] = useState<UserAcc | null>(null);

    useMemo(() => {
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

        if(userId !== '') {
        getUserData();
        }

    }, [userId]);

    // This skeleton displays the top 2 blogs written by the user, I have added placeholder text here since we currently don't have access to that data
    const SkeletonOne = () => {
        return (
          <div>
            <p className="font-bold text-4xl text-white">_Top2Blogs_</p>
            <div className="flex flex-row justify-evenly flex-wrap mt-4 mb-4 gap-5">
              <div className="w-[150px] h-[150px] bg-slate-500 border-2 rounded-md flex justify-center items-center">
                <h2 className="text-md text-gray-800 font-semibold">Blog 1 Heading</h2>
              </div>
              <div className="w-[150px] h-[150px] bg-slate-500 border-2 rounded-md flex justify-center items-center">
                <h2 className="text-md text-gray-800 font-semibold">Blog 2 Heading</h2>
              </div>
            </div>
          </div>
        );
      };
      // This skeleton displays the username, title and department, the photo will be replaced by the image submitted by the user at later stage
      const SkeletonTwo = () => {
        return (
          <div>
            <p className="font-bold text-4xl text-white">{userData && userData.username}</p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            {userData && userData.title}
              <br />
              {userData && userData.dept}
            </p>
          </div>
        );
      };
      // This skeleton displays the user's statistics, I have added placeholder text as we currently dont have access that info yet
      const SkeletonThree = () => {
        return (
          <div>
            <p className="font-bold text-4xl text-white">_UserStatistics_</p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
              _TotalBlogsWritten_
              <br />
              _TotalLikesGained_
              <br />
              _TotalShares_
            </p>
          </div>
        );
      };
      // This skeleton displays the user's full name, their bio and email id, the image will be replaced by an HD image at later stage
      const SkeletonFour = () => {
        return (
          <div>
            <p className="font-bold text-4xl text-white">{userData && userData.full_name}</p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                {userData && userData.bio}
            </p>
            <p className="italic text-sm my-2 max-w-lg text-slate-500">
                {userData && userData.email}
            </p>
          </div>
        );
      };
      
      const cards = [
        {
          id: 1,
          content: <SkeletonOne />,
          className: "md:col-span-2",
          thumbnail:
            '/myposts.svg',
        },
        {
          id: 2,
          content: <SkeletonTwo />,
          className: "col-span-1",
          thumbnail:
            "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fHww",
        },
        {
          id: 3,
          content: <SkeletonThree />,
          className: "col-span-1",
          thumbnail:
            "/stats.svg",
        },
        {
          id: 4,
          content: <SkeletonFour />,
          className: "md:col-span-2",
          thumbnail:
            "/aboutme.svg",
        },
      ];

    return (
        // This are some basic tailwind classes added to the wrapper div
        <div className="h-screen py-20 w-full">
          <LayoutGrid cards={cards} />
        </div>
    );
}