import AuthButton from "@/components/AuthButton";

export default function Navbar() {

    return (
        <nav className="w-full flex flex-row items-center justify-center border-b border-b-gray-500 h-16">
            <AuthButton />
        </nav>
    )
}