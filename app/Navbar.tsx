'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import AuthButton from '@/components/AuthButton'

interface NavbarScrollProps {
  isScrolling: boolean
}

export default function Navbar( {
  children,
}: {
  children: React.ReactNode
}) {
  const [isScrolling, setIsScrolling] = useState(false)

  const handleScroll = () => {
    if (window.scrollY >= window.innerHeight) {
      setIsScrolling(true)
    } else {
      setIsScrolling(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {isScrolling ? (
          <NavbarScroll isScrolling={isScrolling} />
        ) : (
          <NavbarFixed children={children} />
        )}
      </AnimatePresence>
    </>
  )
}

function NavbarFixed({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <nav className="fixed z-10 flex justify-between w-full px-8 py-2 top-4">
      <Link href="/" className="flex items-center gap-2 text-white">
        <svg
          className="rotate-180"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM7.49988 1.82689C4.36688 1.8269 1.82707 4.36672 1.82707 7.49972C1.82707 10.6327 4.36688 13.1725 7.49988 13.1726V1.82689Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
        <p className="text-xl text-white">IDEA Clinic</p>
      </Link>
      <ul className="flex gap-8 items-center text-white/50 ">
        <li className="px-2 text-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-white">
          <Link href={'/team'}>Team</Link>
        </li>
        <li className="px-2 text-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:text-white">
          <Link href={'/forum'}>Forum</Link>
        </li>
      </ul>
      <div className="px-4 py-2 ml-2 text-white bg-black rounded-full text-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
        {children}
      </div>
    </nav>
  )
}

function NavbarScroll({ isScrolling }: NavbarScrollProps) {
  return (
    <motion.nav
      key={1}
      initial="initial"
      animate={isScrolling ? 'animate' : 'initial'}
      exit="exit"
      variants={NavAnimations}
      className="fixed z-10 flex justify-between px-4 py-2 rounded-full ts-bg left-1/2 top-10"
    >
      <ul className="flex items-center">
        <li className="px-2 text-white text-md">
          <Link href={'/team'}>Team</Link>
        </li>
        <li className="px-2 text-white text-md">
          <Link href={'/forum'}>Forum</Link>
        </li>
        <li className="px-4 py-2 ml-2 text-white bg-black rounded-full text-md ">
          <Link href={'/login'}>Login/Sign Up</Link>
        </li>
      </ul>
    </motion.nav>
  )
}

const NavAnimations = {
  initial: {
    y: -50,
    x: '-50%',
    opacity: 0,
  },
  animate: {
    y: 0,
    x: '-50%',
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 100,
    },
  },
  exit: {
    y: -50,
    opacity: 0,
  },
}
