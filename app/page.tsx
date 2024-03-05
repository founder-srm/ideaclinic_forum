import { HeroParallax } from "@/components/hero-parallax";
import Navbar from "./Navbar";

const ProductList = [
  {
    'title': "Product 1",
    'link': "#",
    'thumbnail': "https://images.unsplash.com/photo-1707430393809-784967fe6fee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    'title': "Product 2",
    'link': "#",
    'thumbnail': "https://images.unsplash.com/photo-1698500278205-bf650c97a1f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    'title': "Product 3",
    'link': "#",
    'thumbnail': "https://images.unsplash.com/photo-1695376425475-1b6b561f8e4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    'title': "Product 1",
    'link': "#",
    'thumbnail': "https://images.unsplash.com/photo-1707430393809-784967fe6fee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    'title': "Product 2",
    'link': "#",
    'thumbnail': "https://images.unsplash.com/photo-1698500278205-bf650c97a1f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    'title': "Product 3",
    'link': "#",
    'thumbnail': "https://images.unsplash.com/photo-1695376425475-1b6b561f8e4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    'title': "Product 4",
    'link': "#",
    'thumbnail': "https://images.unsplash.com/photo-1699462515808-41f81a8145b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    'title': "Product 5",
    'link': "#",
    'thumbnail': "https://images.unsplash.com/photo-1685094488656-9231107be07f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    'title': "Product 6",
    'link': "#",
    'thumbnail': "https://images.unsplash.com/photo-1677158607710-3731af5a8c31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    'title': "Product 4",
    'link': "#",
    'thumbnail': "https://images.unsplash.com/photo-1699462515808-41f81a8145b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    'title': "Product 5",
    'link': "#",
    'thumbnail': "https://images.unsplash.com/photo-1685094488656-9231107be07f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    'title': "Product 6",
    'link': "#",
    'thumbnail': "https://images.unsplash.com/photo-1677158607710-3731af5a8c31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    'title': "Product 7",
    'link': "#",
    'thumbnail': "https://images.unsplash.com/photo-1699462515808-41f81a8145b0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }
];

export default async function Index() {


  return (
    <main className="flex-1 w-screen h-auto flex flex-col gap-20 items-center bg-[#090909] text-white">
      <Navbar />
      <HeroParallax products={ProductList} />
      
      
      
    </main>
  );
}
