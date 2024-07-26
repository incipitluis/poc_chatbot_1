"use client";

import React, { useEffect, useState, useCallback } from "react";
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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMouseNearTop, setIsMouseNearTop] = useState(false);

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

  const handleScroll = useCallback(() => {
    if (window.scrollY > 0) {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    } else {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (e.clientY < 50) {
      setIsMouseNearTop(true);
      setIsVisible(true);
    } else {
      setIsMouseNearTop(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    const hideNavTimeout = setInterval(() => {
      if (!isMouseNearTop && window.scrollY > 0) {
        setIsVisible(false);
      }
    }, 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(hideNavTimeout);
    };
  }, [handleScroll, handleMouseMove, isMouseNearTop]);

  return (
    <nav
      className={`w-full bg-black shadow-xl py-4 sticky top-0 transition-transform duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="mx-auto flex justify-between items-center px-6 md:px-16">
        <Image
          src={"/logo.svg"}
          alt="logo of Ink Spot Tattoo"
          width={60}
          height={60}
          className="bg-white"
        />
        <ModeToggle />
        <MobileModeToggle />
        <div className="hidden md:flex flex-row text-xl text-white font-bold space-y-0 space-x-8 mt-0">
          <Link
            href="/"
            className="transition-all duration-300 transform hover:text-2xl"
          >
            Home
          </Link>
          <Link
            href="/gallery"
            className="transition-all duration-300 transform hover:text-2xl"
          >
            Gallery
          </Link>
          <Link
            href="/about"
            className="transition-all duration-300 transform hover:text-2xl"
          >
            Our philosophy
          </Link>
          <Link
            href="/contact"
            className="transition-all duration-300 transform hover:text-2xl"
          >
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
          className="rounded-full h-[36px] w-[36px] px-2 md:hidden dark:bg-slate-300 dark:text-black"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <XIcon /> : <MenuIcon />}
        </Button>
      </div>
      {isMenuOpen && (
        <div className="top-16 mt-[-2px] left-0 h-screen w-screen shadow-lg px-6 pb-16">
          <div className="flex flex-col max-w-sm mx-auto h-full">
            <ul className="h-full text-right text-xl text-white font-bold flex flex-col justify-evenly">
              <li>
                <Link href="/" className="underline" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="underline"
                  onClick={toggleMenu}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="underline" onClick={toggleMenu}>
                  Our philosophy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="underline"
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
