import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";

export default function Page() {

    return(
        <main className="h-screen w-full bg-black bg-grid-small-white/[0.2]  relative flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            <CardContainer className="inter-var">
                <CardBody className=" relative group/card  hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2]  w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                    <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-white"
                    >
                        <h1>Check your email</h1>
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-sm max-w-sm mt-2 text-neutral-300"
                    >
                        We've sent you a message with a link to activate your account. <br/> You are free to close this window.
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-4">
                    <video
                        src="/3d-mail.mp4"
                        controls={false}
                        height="1500"
                        width="1000"
                        autoPlay={true}
                        loop={true}
                        muted={true}
                        className=" min-h-80 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    />
                    </CardItem>
                </CardBody>
            </CardContainer>        
        </main>
    )
}