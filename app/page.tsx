import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      Home page
      <Link href="/auth">
        To auth
      </Link>
    </main>
  );
}
