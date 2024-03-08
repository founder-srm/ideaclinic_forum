import { PinContainer } from "@/components/ui/3d-pin";
import Image from "next/image";

export default function Page() {
    return(
        <main className="w-screen h-screen">
            <div className="w-full h-full bg-black bg-dot-white/[0.2]  relative flex items-center justify-center">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <section className="grid grid-cols-3 gap-12 my-12 overflow-y-auto scroll-mod justify-center">
                    <PinContainer
                        title="/Shantanu-Patil"
                        href="https://www.linkedin.com/in/shantanu-patil-2355122/"
                        // onClick={() => window.open("https://www.linkedin.com/in/shantanu-patil-2355122/")}
                    >
                        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                        <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                            Dr. Shantanu Patil
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
                            <span className="text-slate-500 ">
                            Associate Director, DEI. Convener of Idea Clinic.
                            </span>
                        </div>
                        {/* <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" /> */}
                        <Image
                            src='/shantanu.jpeg'
                            width={100}
                            height={100}
                            alt="Dr. Shantanu Patil"
                            className="w-full h-full mt-4 rounded-lg pb-4 object-cover"
                            unoptimized
                            priority
                        />
                        </div>
                    </PinContainer>
                    <PinContainer
                        title="/ui.aceternity.com"
                        href="https://twitter.com/mannupaaji"
                    >
                        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                        <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                            Suvan GS
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
                            <span className="text-slate-500 ">
                                Lead Developer
                            </span>
                        </div>
                        <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
                        </div>
                    </PinContainer>
                    <PinContainer
                        title="/ui.aceternity.com"
                        href="https://twitter.com/mannupaaji"
                    >
                        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                        <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                            Saransh Bangar
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
                            <span className="text-slate-500 ">
                                Frontend Developer
                            </span>
                        </div>
                        <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
                        </div>
                    </PinContainer>
                    <PinContainer
                        title="/ui.aceternity.com"
                        href="https://twitter.com/mannupaaji"
                    >
                        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                        <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                            Vijay Makkad
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
                            <span className="text-slate-500 ">
                                Frontend Developer
                            </span>
                        </div>
                        <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
                        </div>
                    </PinContainer>
                    <PinContainer
                        title="/ui.aceternity.com"
                        href="https://twitter.com/mannupaaji"
                        // className=" col-span-1"
                    >
                        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                        <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                            Ansh Singh
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
                            <span className="text-slate-500 ">
                                Backend Developer
                            </span>
                        </div>
                        <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
                        </div>
                    </PinContainer>
                </section>
            </div>
        </main>
    )
}