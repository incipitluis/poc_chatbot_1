import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col md:flex-row-reverse bg-stone-700 bg-opacity-35 dark:bg-opacity-35 dark:bg-gray-800 text-white py-4 mt-2">
      <div className="flex flex-col mx-auto text-center px-4 mb-4 md:w-1/4">
        <p>Avda. del Tatuaje, nº1</p>
        <p>28091, Madrid</p>
        <div className="w-auto flex flex-row items-center justify-between mx-auto my-2 space-x-4">
          <Link href={""} className="w-6 h-6 rounded-sm overflow-hidden">
            <Image
              src={"/instagram.svg"}
              alt="instagram logo"
              height={24}
              width={24}
              className="bg-yellow-400 dark:bg-white"
            />
          </Link>
          <Link href={""} className="w-6 h-6 rounded-sm roun overflow-hidden">
            <Image
              src={"/linkedin.svg"}
              alt="instagram logo"
              height={30}
              width={30}
              className="bg-yellow-400 dark:bg-white rounded-lg"
            />
          </Link>
          <Link href={""} className="w-6 h-6 rounded-sm overflow-hidden">
            <Image
              src={"/tiktok.svg"}
              alt="instagram logo"
              height={24}
              width={24}
              className="bg-yellow-400 dark:bg-white"
            />
          </Link>
        </div>
        <p className="text-sm">&copy; 2024 Ink Spot. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
