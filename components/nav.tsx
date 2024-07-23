"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle";
import Image from "next/image";
import { useToggle, useWindowSize } from "react-use";
import { Button } from "./ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { MobileModeToggle } from "./ui/mobile-mode-toggle";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Nav = () => {
  const [isMenuOpen, toggleMenu] = useToggle(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width > 768 && isMenuOpen) {
      toggleMenu(false);
      document.body.style.overflow = "";
    }
  }, [width, isMenuOpen, toggleMenu]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  return (
    <nav className="w-full bg-stone-700 bg-opacity-50 dark:bg-opacity-80 shadow-xl dark:bg-gray-800 text-white py-4">
      <div className="mx-auto flex justify-between items-center px-6 md:px-16">
        <Image
          src={"/logo.svg"}
          alt="logo of Ink Spot Tattoo"
          width={92}
          height={92}
          className="dark:bg-white bg-yellow-600"
        ></Image>
        <ModeToggle></ModeToggle>
        <MobileModeToggle></MobileModeToggle>
        <div className="hidden md:flex flex-row text-xl font-bold space-y-0 space-x-8 mt-0">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/gallery" className="hover:underline">
            Gallery
          </Link>
          <Link href="/about" className="hover:underline">
            Our philosophy
          </Link>
          <Link href="/contact" className="hover:underline">
            Reach out!
          </Link>
        </div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Button
          variant={"secondary"}
          className="rounded-full h-[36px] w-[36px] px-2 md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <XIcon /> : <MenuIcon />}
        </Button>
      </div>
      {isMenuOpen && (
        <div className="top-16 mt-[-2px] left-0 h-screen w-screen shadow-lg px-6 pb-16">
          <div className="flex flex-col max-w-sm mx-auto h-full">
            <ul className="h-full text-right text-xl font-bold flex flex-col justify-evenly">
              <li>
                <Link href="/" className="hover:underline" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:underline"
                  onClick={toggleMenu}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:underline"
                  onClick={toggleMenu}
                >
                  Our philosophy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:underline"
                  onClick={toggleMenu}
                >
                  Reach out!
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
