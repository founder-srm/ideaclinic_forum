"use client";
import { LayoutGrid } from "./ui/layout-grid";
import { useToast } from "@/components/ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import {  useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Edit2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";

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
        const [dragActive, setDragActive] = useState<boolean>(false);
        const inputRef = useRef<any>(null);
        const [files, setFiles] = useState<any>([]);
        const [url, setUrl] = useState<string>('');

        function handleChange(e: any) {
          e.preventDefault();
          console.log("File has been added");
          if (e.target.files && e.target.files[0]) {
            console.log(e.target.files);
            for (let i = 0; i < e.target.files["length"]; i++) {
              setFiles((prevState: any) => [...prevState, e.target.files[i]]);
            }
          }
        }

        const handleSubmitFile = async(e: any) => {
          if (files.length === 0) {
            toast({
              title: "Error",
              description: "No file has been selected",
              duration: 5000,
              variant: "destructive",
            })
          } else {
            const uploadImage = async (file: any) => {
              const { data, error } = await supabase.storage
                .from("avatars")
                .upload(`users/${file.name}`, file, {
                  cacheControl: '300', // The image will be cached for 5 minutes
                  upsert: false
                });
              if (error) {
                console.log("Error", error);
                toast({
                  title: "Error",
                  description: error.message,
                  duration: 5000,
                  variant: "destructive",
                });
              } else {
                console.log("Data", data);
                const { data: Publicurl } = supabase
                  .storage
                  .from("avatars")
                  .getPublicUrl(`users/${file.name}`);

                setUrl(Publicurl.publicUrl);
                toast({
                  title: "Success",
                  description: "Image has been uploaded",
                  duration: 1000,
                  variant: "success",
                });
              }
            }
            
            const updateUrl = async () => {
              if (url === '') {
                toast({
                  title: "Error",
                  description: "No URL has been found",
                  duration: 5000,
                  variant: "destructive",
                });
              }
              const { error } = await supabase
                .from('profiles')
                .update({ avatar_url: url })
                .eq('id', userId);
              if (error) {
                console.log('Error', error);
                toast({
                  title: "Error",
                  description: error.message,
                  duration: 5000,
                  variant: "destructive",
                });
              } else {
                toast({
                  title: "Success",
                  description: "Profile picture has been updated",
                  duration: 1000,
                  variant: "success",
                });
              }
            }
            uploadImage(files[0]).then(() => {
              updateUrl();
            }).catch((error) => {
              console.error('Error uploading image:', error);
            });
          }
        }

        function handleDrop(e: any) {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
              setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
            }
          }
        }

        function handleDragLeave(e: any) {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
        }

        function handleDragOver(e: any) {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(true);
        }

        function handleDragEnter(e: any) {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(true);
        }

        function removeFile(fileName: any, idx: any) {
          const newArr = [...files];
          newArr.splice(idx, 1);
          setFiles([]);
          setFiles(newArr);
        }

        function openFileExplorer() {
          inputRef.current.value = "";
          inputRef.current.click();
        }
        return (
          <div>
            
            <AlertDialog>
              <AlertDialogTrigger><Button className="absolute z-10 top-4 right-10" variant='ghost'><Edit2Icon/></Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Change Profile Picture</AlertDialogTitle>
                </AlertDialogHeader>
                  <AlertDialogDescription>
                    <form
                      className={`${
                        dragActive ? "bg-blue-400" : "bg-blue-100"
                      }  p-4 w-full rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center`}
                      onDragEnter={handleDragEnter}
                      onSubmit={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                    >
                      <input
                        placeholder="fileInput"
                        className="hidden"
                        ref={inputRef}
                        type="file"
                        multiple={false}
                        onChange={handleChange}
                        accept="image/*"
                      />

                      <p>
                        Drag & Drop files or{" "}
                        <span
                          className="font-bold text-blue-600 cursor-pointer"
                          onClick={openFileExplorer}
                        >
                          <u>Select files</u>
                        </span>{" "}
                        to upload
                      </p>

                      <div className="flex flex-col items-center p-3">
                        {files.map((file: any, idx: any) => (
                          <div key={idx} className="flex flex-row items-center space-x-5">
                            <span>{file.name}</span>
                            <Button
                              variant='destructive'                              
                              onClick={() => removeFile(file.name, idx)}
                            >
                              remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </form>
                  </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button onClick={handleSubmitFile} variant='outline'>Submit</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
          userData && userData.avatar_url ? userData.avatar_url : "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fHww",
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