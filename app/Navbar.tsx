import AuthButton from "@/components/AuthButton";
import Image from "next/image";

export default function Navbar() {

    return (
        <nav className="w-screen flex flex-row items-center justify-between px-6 md:px-12 border-b border-b-gray-500 h-16">
            <p className="text-white flex flex-row gap-4 items-center">
                <Image src="/DEI.png" alt="Idea Clinic SRMIST" width={60} height={60} />
                Idea Clinic SRMIST
            </p>
            <AuthButton />
        </nav>
    )
}